#! /usr/bin/env node

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var jSon = require('./app/models/jsonModel')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var jsons = []

function randomString() {
  var result = '';
  chars = ['1','2','3','4','5','a','b','c','d','e'];
  for (var i = 4; i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function jsonCreate(id, data, cb) {
  var json = new jSon({ jsonid: id, data: data});

  json.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New json: ' + json);
    jsons.push(json)
    cb(null, json);
  }   );
}

function createjsons(cb) {
    async.parallel([
        function(callback) {
          jsonCreate(randomString(), [{"food":"rice", "name":"bola"},{"food":"beans", "name":"tade"}] , callback);
        },
        function(callback) {
          jsonCreate(randomString(), [{"food":"beans", "name":"tada"},{"food":"frop", "name":"tfee"}] , callback);
        },
        function(callback) {
          jsonCreate(randomString(), [{"food":"rice", "name":"bola"},{"food":"beans", "name":"tade"}] , callback);
        },
        function(callback) {
          jsonCreate(randomString(), [{"food":"rice", "name":"bola"},{"food":"beans", "name":"tade"}] , callback);
        },
        function(callback) {
          jsonCreate(randomString(), [{"food":"rice", "name":"bola"},{"food":"beans", "name":"tade"}] , callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createjsons
],

// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('jsons: '+jsons);

    }
    //All done, disconnect from database
    mongoose.connection.close();
});



