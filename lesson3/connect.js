var MongoClient = require('mongodb').MongoClient;

var mongo = new MongoClient();
// Connection string format:
//    mongodb://username:password@host/database
mongo.connect('mongodb://localhost/test', function(err, db) {
  var myDB = db.db('words');

  myDB.collection('words', function(err, collection) {
    countItems(collection);
    setTimeout(function(){ myDB.close(); }, 3000);
  });
});

function countItems(collection) {
  collection.count(function(err, count) {
    console.log('Number of Items: ' + count);
  });
}
