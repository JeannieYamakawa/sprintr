const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);

//=-=-=-==-=-=-=- ROUTE PREFIX -- '/users/:user_id/games/:game_id/' =-=-=-=-==---

//     /users/:user_id/games/new (post, user creates game)...happens when user clicks "submit" on the last create game view page
// router.post('/new', function(req, res){
//     //create a new game, designate creator as the admin
//     console.log(req.body, 'req.body');
//     var reqBody = req.body;
//     var gameWebsites = req.body.websites;
//     console.log(gameWebsites, 'gameWebsites array from request');
//         //--make entry into games table
//     knex('games').insert({
//         name: req.body.name,
//         admin_user_id: _________,
//         active_game: true,
//         start_time: req.body.start_time,
//         end_time: req.body.end_time,
//         game_type: req.body.game_type,
//         first_place: null,
//         second_place: null,
//         third_place: null }, '*').then(function(game){
//             console.log(game, 'full game info inserted into game table');
//                 //--create entries into game_websites for each designated URL
//             gameWebsites.forEach(function(site){
//                 knex('game_website').insert({
//                     game_id: game.id,
//                     domain: site
//                 }, '*').then(function(){
//                     knex('game_player').insert({
//                         game_id: game.id,
//                         player_id: __req.body.admin_user_id____,
//                         final_ranking: null
//                 }, '*').then(function(data){
//                     console.log(data, '');
//                     res.json({games: data})
//                 })
//             })
//         })
// });

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
