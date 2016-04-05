'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var requestify = require('requestify');
var moment = require('moment');

var PORT = process.env.PORT || 3000;
var BASE_URL = 'https://api.fieldbook.com/v1/[your book ID]';
var API_OPTIONS = {
  headers: { accept: 'application/json' },
  auth: {
    username: process.env.FB_API_USERNAME,
    password: process.env.FB_API_PASSWORD,
  },
};

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contacts', function(req, res) {
  var URL = BASE_URL + '/contacts';

  var record = {
    email_address: req.body.emailAddress,
    signup_date: moment().format('M/D/YYYY'),
  };

  requestify
    .post(URL, record, API_OPTIONS)
    .then(function(fbres) {
      res.json(fbres);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log('Fieldbook proxy listening on port %s.', PORT);
});
