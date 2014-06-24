var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Get Index');
});

app.get('/authors', function(req, res) {
  res.send('Get Authors');
});

app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res) {
  var response = 'Get Book: <br>Chapter: ' + req.params[0] + 
                 '<br>Page: ' + req.params[1];
  res.send(response);
});

app.param('userid', function(req, res, next, value) {
  console.log('\nRequest received with userid: ' + value);
});

app.get('/user/:userid', function(req,res) {
  var response = 'Get user: ' + req.params('userid');
  res.send(response);
});

app.listen(3333);