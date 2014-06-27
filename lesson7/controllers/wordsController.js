var MongoClient = require('mongodb').MongoClient;

var words = null;
MongoClient.connect('mongodb://localhost/', function(err, db) {
  words = db.db('words').collection('word_stats');
});

exports.getWords = function(req, res) {
  if (words) {
    words.find({ }, {limit: 5}, function(err, cursor) {
      cursor.toArray(function(err, wordsArr) {
        res.json(wordsArr);
      });
    });
  } else {
    res.json(500, {});
  }
};