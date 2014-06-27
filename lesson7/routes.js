var express = require('express');

module.exports = function(app) {
  app.use('/', express.static('./static'));

  var words = require('./controllers/wordsController');
  app.get('/words', words.getWords);
};