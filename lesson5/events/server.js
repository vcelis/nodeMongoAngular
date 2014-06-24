var express = require('express');
var app = express();

// Inject the static middleware
app.use('/', express.static('./static'));
app.listen(3333);