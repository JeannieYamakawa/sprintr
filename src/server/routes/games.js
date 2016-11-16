const express = require('express');
const router = express.Router({
    mergeParams: true
});
const environment = process.env.NODE_ENV || "development";
const knexConfig = require('../../../knexfile')[environment];
const knex = require('knex')(knexConfig);

//=-=-=-==-=-=-=- ROUTE PREFIX -- '/users/:user_id/games/' =-=-=-=-==---

//     /users/:user_id/games/new (post, user creates game)...happens when user clicks "submit" on the last create game view page

router.post('/new', function(req, res) {
    //create a new game, designate creator as the admin
    console.log(req.body, 'req.body');
    var reqBody = req.body;
    var gameWebsites = req.body.websites;
    console.log(gameWebsites, 'gameWebsites array from request');
    //--make entry into games table
    knex('games').insert({
            name: req.body.name,
            admin_user_id: req.params.user_id,
            active_game: true,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            game_type: req.body.game_type,
            first_place: null,
            second_place: null,
            third_place: null
        }, '*')
        //make entry into game_player table
        .then(function(thisGame) {
            console.log(thisGame, 'thisGame data after insert into games table');
            knex('game_player').insert({
                    game_id: thisGame.id,
                    player_id: req.body.user_id,
                    final_ranking: null
                }, '*')
                //make entry for each website into game_website table
                .then(function(gamePlayer) {
                    console.log(gamePlayer, 'gamePlayer info after insert into game_player table');
                    //--create entries into game_websites for each designated URL
                    gameWebsites.forEach(function(site) {
                        knex('game_website').insert({
                            game_id: gamePlayer.id,
                            domain: site
                        }, '*').then(function(data) {
                            console.log(data, 'data from the last knex call');
                            res.json({
                                games: data
                            })
                        })
                    })
                });
        })
})



//add user to an existing game
router.post('/join', function(req, res) {
    knex('games').where('id', req.body.id)
        //--register player in game_player table
        //--fetch id for game_websites (for tracking this players score for this game)
        //--create entry in player_game_website for each ID above
});

//admin can edit and existing game
router.patch('/:game_id', function(req, res) {

});


//fetch information about all games a player is involved with
router.get('/', function(req, res) {
    let userId = req.params.user_id;
    let player = {};
    knex('players').where('id', userId).first().then(function(data) {
        // console.log(data, 'data from first knex call');
        player.username = data.username;
        player.first_name = data.first_name;
        player.id = data.id;
        // console.log(player, 'player');

    });

    knex('game_player').where('game_player.player_id', userId).innerJoin('games', 'game_player.game_id', 'games.id').then(function(data) {
        // console.log(data, 'data from second call');
        res.json({
            user: player,
            games: data
        })
    })
});


// fetch details about a single game
router.get('/:game_id', function(req, res) {
    let gameId = req.params.game_id;
    let userId = req.params.user_id;
    let data = [];
    var promiseArray = [];
    //get all players that belong to the game
    knex('game_player').where('game_id', gameId).innerJoin('players', 'game_player.player_id', 'players.id').then(function(players) {

        //loop through each player, build a user object and assign their username and ID
        players.forEach(function(person) {

          promiseArray.push(new Promise(function(resolve, reject){

            var newPersonObj = {};
            var playerID = person.id;
            newPersonObj.username = person.username;
            newPersonObj.id = playerID;
            newPersonObj.stats = [];

            //get all the websites and times for our player tracked by this game
            knex('player_game_website').where('player_id', playerID).innerJoin('game_website', 'player_game_website.game_website_id', 'game_website.id').then(function(urls){
              urls.forEach(function(url){
                newPersonObj.stats.push(url);
              });
              resolve(newPersonObj)
            });
          }));
        });
        Promise.all(promiseArray).then(function(data){
          console.log(data);
          res.send(data)
        })
    })
});

//need router.delete('/:game_id', function(req,res){ })

module.exports = router;
