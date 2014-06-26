var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use('/', express.static('./static'));
app.use(bodyParser());

var words = [ 'test' ];

app.get('/words', function(req, res) {
  res.json(words);
});

app.post('/add', function(req, res) {
  var index = words.indexOf(req.body.word);
  if (index !== -1) {
    res.json(400, 'Word already exists.');
  } else {
    words.push(req.body.word);
    res.json(200, 'Word added.');
  }
});

app.post('/remove', function(req, res) {
  var index = words.indexOf(req.body.word);
  if (index !== -1) {
    words.splice(index, 1);
    res.json(200, 'Word removed.');
  }
})

app.listen(3333);