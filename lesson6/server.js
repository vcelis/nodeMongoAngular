var express = require('express');

// Modules for body parse and sesion store
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});

// Connect to MongoDB
var dbConn = require('./db');
dbConn.getDBConnection(function(db) {
  var app = express();

  // Template engine
  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');

  // Add session store
  app.use(bodyParser());
  app.use(cookieParser('SECRET'));
  app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60000 * 15},
    store: new mongoStore({
      db: db,
      collection: 'sessions'
    })
  }));

  require('./routes')(app);

  app.listen(3333);
});
