var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect('mongodb://localhost/test', function(err, db) {
  var myDB = db.db('words');

  myDB.collection('words', function(err, collection) {
    showNewDocs(collection, addGoogleAndTweet);

    setTimeout(function(){ myDB.close(); }, 3000);
  });
});

function showNewDocs(collection, callback) {
  var query = {'category': 'New'};
  collection.find(query, function(err, items) {
    items.toArray(function(err, itemsArr) {
      console.log('New Documents: ');
      for (var i in itemsArr) {
        console.log(itemsArr[i]);
      }
      if (callback) {
        callback(collection);
      }
    });
  });
}

function addGoogleAndTweet(collection) {
  var tweet = {
    word: 'tweet', first: 't', last: 't',
    size: 4, letters: ['t','w','e'],
    stats: {vowels: 2, consonants: 3},
    category: 'New'
  };
  var google = {
    word: 'google', first: 'g', last: 'e',
    size: 6, letters: ['g','o','l','e'],
    stats: {vowels: 3, consonants: 3},
    category: 'New'
  };
  var options = {w:1, wtimeout:5000, journal:true};
  collection.insert([google, tweet], options, function(err, results) {
    console.log('\nInsert Results: ' + results);
    showNewDocs(collection, removeNewDocs);
  });
}

function removeNewDocs(collection) {
  var query = {'category': 'New'};
  var options = {w:1, wtimeout:5000, journal:true};
  collection.remove(query, options, function(err, results) {
    showNewDocs(collection);
  });
}