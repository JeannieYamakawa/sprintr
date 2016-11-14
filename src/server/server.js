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

const auth = require('./routes/auth');
const timeTracking = require('./routes/time-tracking');
const games = require('./routes/games');

app.use(auth);
app.use('/users/:user_id/time/', timeTracking);
app.use('/users/:user_id/games/:game_id/', games);


//RUN SERVER=-=-=-=-=-=-=-=-=-=-=-=-

app.listen(port, function () {
  console.log('Server listening on port:' + port);
});
