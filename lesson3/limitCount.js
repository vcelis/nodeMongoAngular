var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect('mongodb://localhost/', function(err, db) {
  var myDB = db.db('words');
  myDB.collection('words', function(err, collection) {
    countWordsStartingWithA(collection);

    setTimeout(function(){myDB.close();}, 3000);
  });
});

function countWordsStartingWithA(collection) {
  var query = {'first': 'a'};
  var cursor = collection.find(query);
  cursor.count(function(err, count) {
    console.log('\nTotal starting with A: ' + count);
  });
}