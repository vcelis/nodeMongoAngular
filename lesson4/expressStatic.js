var express = require('express');
var app = express();

app.use('/', express.static('./static'), {maxAge: 60*60*24*1000});

app.use('/images', express.static('../images'));
app.get('/', function(req, res) {
  res.redirect('/static.html');
});

app.listen(3333);