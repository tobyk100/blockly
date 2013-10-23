var url = require('url');
var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'html.ejs');
app.engine('html.ejs', ejs.__express);

var baseUrl = function(req) {
  return req.protocol + '://' + req.get('Host') + '/';
};

app.get('/', function(req, res) {
  res.render('index');
});

var renderApp = function(app, req, res) {
  ['locale', 'level', 'skin'].forEach(function(key) {
    if (!req.query[key]) {
      res.end('Expected ' + key + ' query parameter');
      return;
    }
  });
  res.render('app', {
    app: app,
    locale: req.query.locale,
    options: {
      containerId: 'blocklyApp',
      levelId: req.query.level,
      skinId: req.query.skin,
      baseUrl: baseUrl(req)
    }
  });
};

app.get('/maze', function(req, res) {
  renderApp('maze', req, res);
});

app.get('/turtle', function(req, res) {
  renderApp('turtle', req, res);
});

module.exports = app;
