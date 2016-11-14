'use strict';

const express = require('express');
const app = express();

const path = require('path');

require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.NODE_ENV || 8000;


//MIDLEWARE=-=-=-=-=-=-=-=-=-=

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


//ROUTE CONFIG=-=-=-=-=-=-=-=-=-=-=

var auth = require('./routes/auth');

app.use(auth);


//RUN SERVER=-=-=-=-=-=-=-=-=-=-=-=-

app.listen(port, function () {
  console.log('Server listening on port:' + port);
});
