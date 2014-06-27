var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

require('./routes')(app);

app.listen(3333);