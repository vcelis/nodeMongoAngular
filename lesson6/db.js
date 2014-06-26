var MongoClient = require('mongodb').MongoClient;
var connection = null;


// Singleton pattern
exports.getDBConnection = function(callback) {
  if (connection) {
    callback(connection);
  } else {
    MongoClient.connect('mongodb://localhost/', function(err, db) {
      callback(db.db('myapp'));
    });
  }
};