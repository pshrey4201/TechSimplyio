var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

// Sets up connection to 'parkFinder' database
ParkProvider = function(host, port) {
  this.db= new Db('parkFinder', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

// Gets the 'parks' collection from database
ParkProvider.prototype.getCollection= function(query, callback) {
  this.db.collection('parks', function(error, park_collection){
    if( error ) callback(error);
    else callback(null, park_collection);
  });
};

// Main grabbing function
ParkProvider.prototype.findAll = function(query, callback) { 
    this.getCollection(query, function(error, park_collection) { 
      if( error ) callback(error)
      else {
        // Parse the JSON formated string into a true JSON object
	parsedQuery=JSON.parse(query);
        // Pass JSON object to mongo database with find() call
        park_collection.find(parsedQuery).sort({area:-1}).limit(13).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    }); //end getCollection
}; //end findAll

// Allows ParkProvider function to be called outside this file (in app.js)
exports.ParkProvider = ParkProvider;
