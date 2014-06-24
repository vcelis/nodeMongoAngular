var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('views', './views');
app.engine('html', ejs.renderFile);

app.locals = {
  uname: 'Vincent',
  vehicle: 'Jeep',
  terrain: 'Mountains',
  climate: 'Desert',
  location: 'Unknown'
};

app.get('/ejs', function(req, res) {
  // Render template
  app.render('user_ejs.html', function(err, renderedData) {
    res.send(renderedData);
  });
});

app.get('/other', function(req, res) {
  var otherLocals = {
    uname: 'DaName',
    vehicle: 'Huricane'
  };

  app.render('user_ejs.html', otherLocals, function(err, renderedData) {
    res.send(renderedData);
  });
});

app.listen(3333);