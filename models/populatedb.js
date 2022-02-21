#! /usr/bin/env node

console.log(
  'This script populates some members, messages and the admin account into the database.'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Member = require('./memberModel');
var Message = require('./messageModel');
let bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
const { deleteOne } = require('./memberModel');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var members = [];
var messages = [];

const memberCreate = (
  first_name,
  last_name,
  username,
  password,
  is_admin,
  in_secret_club,
  cb
) => {
  const hashed = encrypt(password);
  console.log(hashed);
  let memberdetail = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: hashed,
    is_admin: is_admin,
    in_secret_club: in_secret_club,
  };

  let member = new Member(memberdetail);

  member.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New member: ' + member);
    members.push(member);
    cb(null, member);
  });
};

function messageCreate(member, text, added_time, cb) {
  let message = new Message({ member, text, added_time });

  message.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Message: ' + message);
    messages.push(message);
    cb(null, message);
  });
}

const encrypt = (preHashedPassword) => {
  // using synchronous version for simplicity
  return bcrypt.hashSync(preHashedPassword, 10, (err, hashedPassword) => {});
};

function createMemberMessage(cb) {
  async.series(
    [
      function (callback) {
        memberCreate(
          'Patrick',
          'Smith',
          'psmith',
          'password',
          false,
          true,
          callback
        );
      },
      function (callback) {
        memberCreate(
          'Ben',
          'Jones',
          'bjones',
          'password',
          false,
          true,
          callback
        );
      },
      function (callback) {
        memberCreate(
          'Isaac',
          'McDonalds',
          'imcdonalds',
          'password',
          false,
          true,
          callback
        );
      },
      function (callback) {
        memberCreate(
          'Bob',
          'Builder',
          'bbuilder',
          'password',
          false,
          true,
          callback
        );
      },
      function (callback) {
        memberCreate('Anthony', 'Wan', 'admin', 'admin', true, true, callback);
      },

      function (callback) {
        messageCreate(
          members[0],
          'Wow cool message!',
          Date('December 17, 2021 16:24:00'),
          callback
        );
      },
      function (callback) {
        messageCreate(
          members[1],
          'Join the secret club!',
          Date('December 1, 2021 12:55:00'),
          callback
        );
      },
      function (callback) {
        messageCreate(
          members[2],
          'Make sure to check out my github!',
          Date('November 20, 2021 03:08:00'),
          callback
        );
      },
      function (callback) {
        messageCreate(
          members[2],
          'Woohooo!',
          Date('January 13, 2022 12:23:00'),
          callback
        );
      },
      function (callback) {
        messageCreate(
          members[0],
          'Nice to meet you all.',
          Date('October 2, 2021 12:55:00'),
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createMemberMessage],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Messages: ' + messages);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

module.exports = encrypt;
