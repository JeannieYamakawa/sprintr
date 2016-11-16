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

  var chromeReport = JSON.parse(req.body.log);
  var userID = req.body.user;
  console.log("=-=-=-=-=-=-==-=-===-chromeReport:", chromeReport);
  if (chromeReport.length > 0){
    //fetch all the games that this player belongs to
    knex('game_player').where('player_id', userID).then(function(games){
      games.forEach(function(game){
        var gameID = game.game_id;
        //fetch all the designated websites for each game
        knex('game_website').where('game_id', gameID).then(function(websites){
          websites.forEach(function(website){
            var websiteID = website.id;
            var websiteURL = website.domain;
            //fetch the unqiue game time log for each url
            knex('player_game_website').where({'game_website_id': websiteID, 'player_id': userID }).then(function(logs){
              logs.forEach(function(logItem){
                var logItemID = logItem.id;
                var logItemTime = logItem.total_time;
                //now that we have the DB log for the website, loop through our Chrome report to look for a matching domain. if we find one, update the DB to reflect the updated time.
                chromeReport.forEach(function(entry){
                  if (entry.url === website.domain){
                    console.log("found a match between chrome " + entry.url + ' and website domain ' + website.domain);
                    var newTime = logItemTime + parseInt(entry.time);
                    knex('player_game_website').where('id', logItemID).update('total_time', newTime).then(function(){
                      console.log("updated time for ", entry.url);
                    })
                  }
                })
              })
            })
          })
        })
      })
    });
    res.send("inserted log into records");
  }
});


module.exports = router;
