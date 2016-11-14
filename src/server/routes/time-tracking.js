const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);


//post URL and time data to users account
//check 'games_table' to see what games this user belongs to
//for each game, see what URLs need to be tracked
//if there is a matching ULR in the log, increment their total time based off the new data
router.post('/log', function(req, res){
  res.send("boom");
});

//fetch URL and time data for user
router.post('/get', function(req, res){

});


module.exports = router;
