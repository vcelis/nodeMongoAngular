var express = require('express');
var app = express();

app.get('/', function(req, res) {
  var response = '<h2>Your Request</h2>';
  response += 'URL:\t' + req.originalUrl + '<br>';
  response += 'Protocol:\t' + req.protocol + '<br>';
  response += 'IP:\t' + req.ip + '<br>';
  response += 'Path:\t' + req.path + '<br>';
  response += 'Host:\t' + req.host + '<br>';
  response += 'Method:\t' + req.method + '<br>';
  response += 'Query:\t' + JSON.stringify(req.query) + '<br>';
  response += 'Secure:\t' + req.secure + '<br>';
  response += 'UTF8\t' + req.acceptsCharset('utf8') + '<br>';
  response += 'Connection:\t' + req.get('connection') + '<br>';
  response += 'Headers:\t' + JSON.stringify(req.headers) + '<br>';

  res.send(200, response);
});

app.listen(3333);