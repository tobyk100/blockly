var url = require('url');
var express = require('express');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

var baseUrl = function(req) {
  return req.protocol + '://' + req.get('Host') + '/';
};

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/maze', function(req, res) {
  ['level', 'skin'].forEach(function(key) {
    if (!req.query[key]) {
      res.end('Expected ' + key + ' query parameter');
      return;
    }
  });
  res.render('app', {
    app: 'maze',
    levelId: req.query.level,
    skinId: req.query.skin,
    baseUrl: baseUrl(req)
  });
});

app.get('/turtle', function(req, res) {
  if (!req.query.level) {
    res.end('Expected level query parameter');
  } else {
    res.render('app', {
      app: 'turtle',
      levelId: req.query.level,
      baseUrl: baseUrl(req)
    });
  }
});

module.exports = app;
