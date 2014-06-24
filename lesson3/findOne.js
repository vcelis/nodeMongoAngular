// Require the mongodb library and instantiate
var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

// Connect and use the callback to perform work
mongo.connect('mongodb://localhost/', function(err, db) {
  var myDB = db.db('words');

  myDB.collection('words', function(err, collection) {
    findOne(collection);

    setTimeout(function() { myDB.close(); }, 3000);
  });
});

function findOne(collection) {
  var query = {};
  collection.findOne(query, function(err, item) {
    console.log(item);
  });
}