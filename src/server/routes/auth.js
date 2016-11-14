const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);
const jwt = require('jsonwebtoken');


router.get('/test', function (req, res) {
  console.log("boom");
  knex('users').then((users) => {
    res.send(users);
  });
});

router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password){
    res.send('username or password cannot be empty');
  } else {
    knex('users').where({username: username}).first().then(function(user){
      if (user){
        console.log("user", user);
        if (user.password === password){
          var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          res.json({token: token});
        }
      } else {
        res.send('wrong username or password');
      }
    })
  }

});

router.post('/signup', function(req, res){

});

router.get('/verify', function(req, res){
  if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      // IF it was expired - verify would actually throw an exception
      // we'd have to catch in a try/catch
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // payload is {id: 56}
      knex('users').where({id: payload.id}).first().then(function (user) {
        console.log("user", user);
        if (user) {
          res.json({id: user.id, name: user.username})
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



router.get('/', function (req, res) {
  console.log("boom");
  res.redirect('/index.html');
});

module.exports = router;
