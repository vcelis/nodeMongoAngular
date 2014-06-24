var express = require('express');
var app = express();

app.use('/', express.static('./static'));
app.use('/images', express.static('../../images'));

app.listen(3333);