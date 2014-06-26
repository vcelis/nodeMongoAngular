var express = require('express');

module.exports = function(app) {
  app
    .use('/static', express.static('./static'))
    
    .get('/', function(req, res) {
      // Temp user data
      req.session.userID = 'test';
      req.session.username = 'tester';
      req.session.msg = 'Testing Sessions';

      // Session verify
      if (req.session.userID) {
        res.render('index', {msg: req.session.msg, 
                             username: req.session.msg });
      } else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
      }
    })

    .get('/user', function(req, res) {
      if (req.session.userID) {
        res.render('user', {msg: req.session.msg});
      } else {
        req.session.msg = 'Acces denied!';
        res.redirect('/login');
      }
    })

    .get('/signup', function(req, res) {
      res.render('signup', {msg: req.session.msg});
    })

    .get('/login', function(req, res) {
      res.render('login', {msg: req.session.msg});
    })

    .get('/logout', function(req, res) {
      req.session.destroy(function() {
        res.redirect('/login');
      });
    });
};