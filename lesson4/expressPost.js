var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  var response = '<form method="POST">' +
                  'First: <input type="text" name="first"><br>' +
                  'Last: <input type="text" name="last"><br>' +
                  '<input type="submit" value="Submit"></form>';
  res.send(response);
});

app.post('/', function(req, res) {
  var response = '<form method="POST">' +
                  'First: <input type="text" name="first"><br>' +
                  'Last: <input type="text" name="last"><br>' +
                  '<input type="submit" value="Submit"></form>' +
                  '<h1>Hello ' + req.body.first + '</h1>' +
                  '<h2>Here is your post</h2>' +
                  JSON.stringify(req.body);
  res.send(response);
});

app.listen(3333);