const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);


//post URL and time data to users account
router.post('/log', function(req, res){
  res.send("boom");
});

//fetch URL and time data for user
router.post('/get', function(req, res){

});


module.exports = router;
