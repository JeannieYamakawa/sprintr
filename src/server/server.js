'use strict';

var express = require('express');
var app = express();

var path = require('path');

var environment = process.env.NODE_ENV || "development";
var knexConfig = require('../../knexfile')[environment];
var knex = require('knex')(knexConfig);

var jwt = require('jsonwebtoken');

require('dotenv').config();

var bodyParser = require('body-parser');

var port = process.env.NODE_ENV || 8000;

//MIDLEWARE=-=-=-=-=-=-=-=-=-=

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


//ROUTES-=-=-=-=-=-=-=-=-=-==-

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.get('/test', function (req, res) {
  knex('users').then((user) => {
    console.log(users);
    res.send("thats a bingo!!!");
  });
});


//RUN SERVER=-=-=-=-=-=-=-=-=-=-=-=-

app.listen(port, function () {
  console.log('Example app listening on port:' + port);
});
