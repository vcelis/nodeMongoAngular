var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect('mongodb://localhost/test', function(err, db) {
  var myDB = db.db('words');

  myDB.collection('words', function(err, collection) {
    showWord(collection, updateDoc);
    
    setTimeout(function(){ myDB.close(); }, 3000);
  });
});

function showWord(collection, callback) {
  var query = {'word': {'$in': ['left', 'lefty']}};

  collection.find(query, function(err, items) {
    items.toArray(function(err, itemsArr) {
      console.log(itemsArr);

      if (callback) {
        callback(collection);
      }
    });
  });
}

function updateDoc(collection) {
  var query = {'word': 'left'};

  var update = {
      '$set': {'word': 'lefty'},
      '$inc': {'size': 1, 'stats.consonants': 1},
      '$push': {'letters': 'y'}
  };
  var options = {w:1, wtimeout: 5000, journal:true, upsert:false, multi:false};

  collection.update(query, update, options, function(err, results){
    console.log('\nUpdating doc results: ' + results);
    console.log('\nAfter updating doc:');
    showWord(collection, resetDoc);
  });
}

function resetDoc(collection) {
  var query = {'word': 'lefty'};
  var update = {
      '$set': {'word': 'left'},
      '$inc': {'size': -1, 'stats.consonants': -1},
      '$pop': {'letters': 1}
  };
  var options = {w:1, wtimeout: 5000, journal:true, upsert:false, multi:false};

  collection.update(query, update, options, function(err, results){
    console.log('\nReset Doc Results: ' + results);
    console.log('\nAfter resetting doc:');
    showWord(collection);
  });
}