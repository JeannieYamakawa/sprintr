const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);
const jwt = require('jsonwebtoken');


//issue the user a token if they have valid login credentials
router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password){
    res.send('username or password cannot be empty');
  } else {
    knex('players').where({username: username}).first().then(function(player){
      if (player){
        console.log("player", player);
        if (player.password === password){
          var token = jwt.sign({ id: player.id }, process.env.JWT_SECRET);
          res.json({token: token});
        }
      } else {
        res.send('wrong username or password');
      }
    })
  }

});

//create a new user account and issue a token
router.post('/signup', function(req, res){

});

//check the validity of user token, send user ID if it is valid
router.get('/verify', function(req, res){
  if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      // IF it was expired - verify would actually throw an exception
      // we'd have to catch in a try/catch
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // payload is {id: 56}
      knex('players').where({id: payload.id}).first().then(function (player) {
        console.log("player", player);
        if (player) {
          res.json({id: player.id, name: player.username})
        } else {
          res.status(403).json({
            error: "Invalid ID"
          })
        }
      })
    } else {
      res.status(403).json({
        error: "No token"
      })
    }
});

//redirect to home angular
router.get('/', function (req, res) {
  res.redirect('/index.html');
});

module.exports = router;
