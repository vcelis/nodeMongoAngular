var MongoClient = require('mongodb').MongoClient;

var words = null;
MongoClient.connect('mongodb://localhost/', function(err, db) {
  words = db.db('words').collection('words');
});

exports.getWords = function(req, res) {
  if (words) {
    var query = {word: new RegExp(req.query.contains, 'i')};
    var options = {limit: req.query.limit, skip: req.query.skip, 
                   sort: getSortObj(req)};
    words.find(query, options, function(err, cursor) {
      cursor.toArray(function(err, wordsArr) {
        res.json(wordsArr);
      });
    });
  } else {
    res.json(503, {});
  }
};

// Map the request sort fields to document fields
function getSortObj(req) {
  var field = 'word';
  if(req.query.sort === 'Vowels') {
    field = 'stats.vowels';
  } else if (req.query.sort === 'Consonants') {
    field = 'stats.consonants';
  } else if (req.query.sort === 'Length') {
    field = 'size';
  } else {
    field = req.query.sort.toLowerCase();
  }
  return [[field, req.query.direction]];
};