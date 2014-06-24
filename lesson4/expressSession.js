var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});

var mongo = new MongoClient();
mongo.connect('mongodb://localhost/', function(err, db) {
  var myDB = db.db('sessionDB');

  var app = express();
  app.use(cookieParser());
  app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 15*60*1000},
    store: new mongoStore({
      db: myDB,
      collection: 'sessions'
    })
  }));

  app.get('/library', function(req, res) {
    var response = '<h1>Welcome to the library</h1>';
    if(req.session.restricted) {
      response += '<h3>You have been in the restricted section ' +
                  req.session.restrictedCount + ' times.</h3>';
    }
    res.send(response);
  });

  app.get('/restricted', function(req, res) {
    req.session.restricted = true;
    if(!req.session.restrictedCount) {
      req.session.restrictedCount = 1;
    } else {
      req.session.restrictedCount += 1;
    }
    res.redirect('/library');
  });

  app.get('/clear', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/library');
    });
  });

  app.listen(3333);
});