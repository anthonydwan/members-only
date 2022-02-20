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

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var members = [];
var messages = [];

const memberCreate = (
  first_name,
  family_name,
  username,
  password,
  is_admin,
  in_secret_club,
  cb
) => {
  let memberdetail = {
    first_name: first_name,
    family_name: family_name,
    username: username,
    password: password,
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
    genres.push(message);
    cb(null, message);
  });
}

function createGenreAuthors(cb) {
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
        memberCreate('Ben', 'Jones', psmith, 'password', false, true, callback);
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
  [createGenreAuthors, createBooks, createBookInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('BOOKInstances: ' + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
