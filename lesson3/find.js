// Require and instantiate mongodb library
var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

// Connect and use the callback to perform work
mongo.connect('mongodb://localhost/', function(err, db) {
  var myDB = db.db('words');

  myDB.collection('words', function(err, collection) {
    // Once the collection is retreived, call the helper functions
    over13(collection);
    startWithXYZ(collection);
    startWithREndVowels(collection);

    // Give helper functions time to finish and close db
    setTimeout(function() { myDB.close(); }, 3000);
  });
});


// Helper function to display the result set the helper functions provide
function displayCursor(cursor, msg) {
  cursor.toArray(function(err, itemArr) {
    var wordStr = '';
    for (var i in itemArr) {
      wordStr += itemArr[i].word + ',';
    }
    console.log('\n' + msg + '\n' + wordStr);
  });
}

function over13(collection) {
  var query = { 'size': { '$gt': 13 } };
  var cursor = collection.find(query);
  displayCursor(cursor, 'Words with more than 13 characters:');
}

function startWithXYZ(collection) {
  var query = { 'first': { '$in': [ 'x', 'y', 'z' ] }};
  var cursor = collection.find(query);
  displayCursor(cursor, 'Words starting with X, Y or Z:');
}

function startWithREndVowels(collection) {
  var query = { '$and': [
                          { 'first': 'r' },
                          { 'last': {'$in': ['a', 'e', 'i', 'o', 'u']} }
                        ]};
  var cursor = collection.find(query);
  displayCursor(cursor, 'Words starting with R and ending with a vowel:');
}