const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);

//=-=-=-==-=-=-=- ROUTE PREFIX -- '/users/:user_id/games/:game_id/' =-=-=-=-==---

//create a new game, designate creator as the admin
//--make entry into games table
//--create entries into game_websites for each designated URL
router.post('/new', function(req, res){

});

//add user to an existing game
//--register player in game_player table
//--fetch id for game_websites (for tracking this players score for this game)
//--create entry in player_game_website for each ID above
router.post('/join', function(req, res){

});

//admin can edit and existing game
router.patch('/:game_id', function(req, res){

});

//fetch details about all games that user belongs to
router.get('/', function(req, res){

});
//fetch details about a single game
router.get('/:game_id', function(req, res){

});


module.exports = router;
