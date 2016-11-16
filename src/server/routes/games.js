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
// game name (games table--name column)
// games websites (game_website table--domain column)
//each person is an object in the array below

//playerData:
// [ {
//  username: tim,
//  id: 1,
//  stats: [{ domain: www.whatever.com,
//        total_time: 203802983
//        },
//          { domain: www.whatever.com,
//        total_time: 203802983
//        }]
//
// } ]


router.get('/:game_id', function(req, res) {
    let gameId = req.params.game_id;
    let userId = req.params.user_id;
    let players = [];
    //get all players that belong to the game
    knex('game_player').where('game_id', gameId).innerJoin('players', 'game_player.player_id', 'players.id').then(function(players) {

        //loop through each player, build a user object and assign their username and ID
        players.forEach(function(person) {
            var newPersonObj = {};
            var playerID = person.id;
            newPersonObj.username = person.username;
            newPersonObj.id = playerID;
            newPersonObj.stats = [];

            // get the players times for all websites that are tracked by the game
            knex('game_website').where('game_id', gameId).innerJoin('player_game_website', 'game_website.id', 'player_game_website.game_website_id').then(function(urls) {
                urls.forEach(function(url) {
                    let newUrlObj = {};
                    newUrlObj.domain = url.domain;
                    newUrlObj.total_time = url.total_time;
                    newPersonObj.stats.push(newUrlObj);

                })
            })
        });
        res.send(players)
    })
});


//need router.delete('/:game_id', function(req,res){ })



module.exports = router;
