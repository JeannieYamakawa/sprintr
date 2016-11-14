const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);


//=-=-=-==-=-=-=- ROUTE PREFIX -- '/users/:user_id/time/' =-=-=-=-==---


//post URL and time data to users account
//--check 'games_table' and fetch all the games this user belongs to
//--for each game, fetch game_website entry
//--for each game_website, fetch player_game_website
//--for each player_game_website, see the log contains a matching URL, and increment the time according to the posted data
router.post('/log', function(req, res){
  res.send("boom");
});

//fetch URL and time data for user
//--create games array that will contian user score for each game they belong to
//--check 'games_table' and fetch all the games this user belongs to
//--for each game, push {game_id} into games array and fetch game_website entry
//--for each game_website, fetch player_game_website
//--attach URL and player score to game object
router.post('/get', function(req, res){

});


module.exports = router;
