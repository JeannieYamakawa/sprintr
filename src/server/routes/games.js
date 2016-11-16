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
    var gameWebsites = req.body.data.websites;
    console.log(gameWebsites, 'gameWebsites from req');

    //--make entry into games table
    knex( 'games' ).insert( {
        id: 34,
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

        }, '*' )
        //make entry into game_player table
        .then( function( thisGame ) {
            console.log( thisGame, 'thisGame data after insert into games table' );
            knex( 'game_player' ).insert( {
                    game_id: 9,
                    player_id: req.body.user_id,
                    final_ranking: null
                }, '*' )
                //make entry for each website into game_website table
                .then( function( gamePlayer ) {
                    console.log( gamePlayer, 'gamePlayer info after insert into game_player table' );
                    //--create entries into game_websites for each designated URL
                    gameWebsites.forEach( function( site ) {
                        knex( 'game_website' ).insert( {
                            id: 4,
                            game_id: gamePlayer.game_id,
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





router.post( '/join', function( req, res ) {
    //add user to an existing game
    knex( 'games' ).where( 'id', req.body.id )
        //--register player in game_player table
        //--fetch id for game_websites (for tracking this players score for this game)
        //--create entry in player_game_website for each ID above
} );

//admin can edit and existing game
router.patch( '/:game_id', function( req, res ) {

} );


router.get( '/', function( req, res ) {
    let userId = req.params.user_id;
    let player={};
    knex('players').where('id', userId).first().then(function(data){
        // console.log(data, 'data from first knex call');
        player.username = data.username;
        player.first_name = data.first_name;
        player.id = data.id;
        // console.log(player, 'player');

    });

    knex('game_player').where('game_player.player_id', userId).innerJoin('games', 'game_player.game_id', 'games.id').then(function(data){
            // console.log(data, 'data from second call');
            res.json({ user: player, games: data })
    })
} );


// fetch details about a single game
// game name (games table--name column)
// games websites (game_website table--domain column)
//each person is an object in the array below




//

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




router.get('/:game_id', function( req, res ) {
    let gameId = req.params.game_id;
    let userId = req.params.user_id;
    let players = [];
    let newPersonObj;
    let usersOwnTimes;
    // ***all the players' usernames from that specific game (innerjoin the game_player table where its player_id column matches the players table --id column)
    knex('game_player').where('game_player.game_id', gameId).innerJoin('players', 'game_player.player_id', 'players.id').then(function(data){
        data.forEach(function(person){
            newPersonObj = {};
            newPersonObj.username = person.username;
            newPersonObj.id = person.id;
            newPersonObj.stats = [];
            // get all the players' times on all websites for that game
            //  (innerjoin game_website and player_game_website where the ((game_website's id column)) matches the ((player_game_website's game_website_id column))  )
            knex('game_website').where('game_website.game_id', gameId).innerJoin('player_game_website', 'game_website.id', 'player_game_website.game_website_id').then(function(data){
                    data.forEach(function(url){
                        let newUrlObj = {};
                        newUrlObj.domain = url.domain;
                        newUrlObj.total_time = url.total_time;
                        newPersonObj.stats.push(newUrlObj);

                    })
                    // console.log(newPersonObj, 'newPersonObj with stats');
        })



    });
    players.push(newPersonObj);
    console.log(players, 'players at end');
    })
} );





//need router.delete('/:game_id', function(req,res){ })






module.exports = router;
