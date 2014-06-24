var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect('mongodb://localhost/', function(err, db) {
  var myDB = db.db('words');

  myDB.collection('words', function(err, collection) {
    displayFullDocument(collection);
    excludeFields(collection);
    includeFields(collection);

    setTimeout(function() { myDB.close() }, 3000);
  });
});

function displayFullDocument(collection) {
  var query = {word: 'test'};
  collection.findOne(query, function(err, word) {
    console.log('Full document: ');
    console.log(word);
  });
}

function excludeFields(collection) {
  var query = {word: 'test'};
  var fieldsToExclude = { letters: false, stats: false };
  var options = {fields: fieldsToExclude};
  collection.findOne(query, options, function(err, word) {
    console.log('\nExcluding letters and stats: ');
    console.log(word);
  });
}

function includeFields(collection) {
  var query = {word: 'test'};
  var fieldsToInclude = {word: true, size: true};
  var options = {fields: fieldsToInclude}
  collection.findOne(query, options, function(err, word) {
    console.log('\nIncluding word and size: ');
    console.log(word);
  });
}