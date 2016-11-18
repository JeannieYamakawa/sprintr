const express = require( 'express' );
const router = express.Router( {
    mergeParams: true
} );
const environment = process.env.NODE_ENV || "development";
const knexConfig = require( '../../../knexfile' )[ environment ];
const knex = require( 'knex' )( knexConfig );
const bcrypt = require('bcrypt');

//=-=-=-==-=-=-=- ROUTE PREFIX -- '/users/:user_id/games/' =-=-=-=-==---

//     /users/:user_id/games/new (post, user creates game)...happens when user clicks "submit" on the last create game view page

router.post( '/new', function( req, res ) {
    //create a new game, designate creator as the admin
    var hashPass = bcrypt.hashSync(req.body.data.password, 4);
    console.log(req.body.currentUser, 'currentUser from req in new games post route');
    console.log(req.body.data, 'req.body.data from new games post route');
    var gameWebsites = req.body.data.websites;


    //--make entry into games table
    knex( 'games' ).insert( {
            name: req.body.data.name,
            game_password: hashPass,
            admin_user_id: req.params.user_id,
            active: true,
            start_time: req.body.data.start,
            end_time: req.body.data.end,
            game_type: req.body.data.gametype,
            first_place: null,
            second_place: null,
            third_place: null

        },'*')
        //make entry into game_player table
        .then( function( gameData ) {
            console.log(gameData, 'gameData after insert into games table' );
            knex( 'game_player' ).insert( {
                    player_id: req.body.currentUser.id,
                    final_ranking: null,
                    game_id: gameData[0].id
                }, '*')
                //make entry for each website into game_website table
                .then( function( gamePlayer ) {
                    console.log( gamePlayer, 'gamePlayer info after insert into game_player table' );
                    //--create entries into game_websites for each designated URL
                    gameWebsites.forEach( function( site ) {
                        knex( 'game_website' ).insert( {
                            game_id: gamePlayer[0].game_id,
                            domain: site
                        }, '*' ).then( function( data ) {
                            console.log( data, 'data from the last knex call' );
                            res.json( {
                                games: data
                            } )
                        } )
                    } )
                } );
        } )
} )



//add user to an existing game
router.post('/:game_id/join', function(req, res) {
    console.log('join');
    let gameId = req.params.game_id;
    let userId = req.params.user_id;
    var promiseArray = [];
    //register player with the game

    knex('game_player').insert({
        game_id: gameId,
        player_id: userId
    }).then(function() {

        //fetch all URLs for that game
        knex('game_website').where('game_id', gameId).then(function(urls) {
            console.log(urls);
            urls.forEach(function(url) {
                promiseArray.push(new Promise(function(resolve, reject) {

                    var urlId = url.id;
                    knex('player_game_website').insert({
                        game_website_id: urlId,
                        player_id: userId,
                        total_time: 0
                    }).then(function() {
                        resolve();
                    });
                }));
            });

            Promise.all(promiseArray).then(function() {
                res.send("success!");
            });
        });
    });
});


//fetch information about all games a player is involved with
router.get('/', function(req, res) {
    let userId = req.params.user_id;
    knex('game_player').where('player_id', userId).innerJoin('games', 'game_player.game_id', 'games.id').then(function(games) {
        console.log(games,'games from dashboard route');
        res.json(games);
    })
});


// fetch details about a single game
router.get('/:game_id', function(req, res) {
    let gameId = req.params.game_id;
    let userId = req.params.user_id;
    let data = [];
    var promiseArray = [];
    //get all players that belong to the game
    
    knex('games').where('id', gameId).first().then(function(game){

      var gameName = game.name;
      var startTime = game.start_time;
      var gameType = game.game_type;

      knex('game_player').where('game_id', gameId).innerJoin('players', 'game_player.player_id', 'players.id').then(function(players) {

        //loop through each player, build a user object and assign their username and ID
        players.forEach(function(person) {

          promiseArray.push(new Promise(function(resolve, reject) {

            var newPersonObj = {};
            var playerID = person.id;
            newPersonObj.username = person.username;
            newPersonObj.player_id = playerID;
            newPersonObj.stats = [];

            //get all the websites and times for our player tracked by this game
            knex('player_game_website').where('player_id', playerID).innerJoin('game_website', 'player_game_website.game_website_id', 'game_website.id').then(function(urls) {
              urls.forEach(function(url) {
                newPersonObj.stats.push(url);
              });
              resolve(newPersonObj)
            });
          }));
        });

        Promise.all(promiseArray).then(function(data) {
          // console.log(data);
          var gameObj = {};
          gameObj.game_id = gameId;
          gameObj.name = gameName;
          gameObj.start_time = startTime;
          gameObj.game_stats = data;
          gameObj.game_type = gameType;
          res.send(gameObj);
        })
      })

    })

} );



//admin can edit and existing game
router.patch('/:game_id', function(req, res) {

});


router.delete('/:game_id', function(req, res) {

});

module.exports = router;
