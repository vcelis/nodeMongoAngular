var MongoClient = require('mongodb').MongoClient;

var words = null;
MongoClient.connect('mongodb://localhost/', function(err, db) {
  words = db.db('words').collection('words');
});

exports.getWords = function(req, res) {
  if (words) {
    var options = {limit: req.query.limit, skip: req.query.skip};
    words.find({ }, options, function(err, cursor) {
      cursor.toArray(function(err, wordsArr) {
        res.json(wordsArr);
      });
    });
  } else {
    res.json(503, {});
  }
};