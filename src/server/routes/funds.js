var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const knexConfig = require( '../../../knexfile' )[ environment ];
const knex = require( 'knex' )( knexConfig );
const bcrypt = require('bcrypt');
var dwolla = require('dwolla-v2');

var client = new dwolla.Client({
    id: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET,
    environment: 'sandbox',
});

var auth = new client.Auth({
    redirect_uri: 'http://localhost:8000/callback',
    scope: 'Send|Funding|Transactions',
    verified_account: true, // optional
    dwolla_landing: 'register', // optional
});

router.get('/dwolla', function(req, res) {
    res.send(auth.url);
});

router.get('/callback', function(req, res) {

    var userToken;

    var appRootUrl; // destination for a payment
    var userRootUrl; //first half of the source link for a payment
    var userFundId; //second half of the source link for a payment

    auth.callback(req.query).then(function(accountToken) {

        userToken = accountToken;

        //fetch an application token to get my own credentials
        client.auth.client().then(function(appToken) {

            appToken.get('/').then(function(response) {
                appRootUrl = response.body._links.account.href;

                accountToken.get('/').then(function(response) {
                    userRootUrl = response.body._links.account.href;

                    accountToken.get(`${userRootUrl}/funding-sources`).then(function(response) {
                        userFundId = response.body._embedded['funding-sources'][0].id;

                        var requestBody = {
                            _links: {
                                source: {
                                    href: 'https://api.dwolla.com/funding-sources/' + userFundId
                                },
                                destination: {
                                    href: appRootUrl
                                }
                            },
                            amount: {
                                currency: 'USD',
                                value: '10.00'
                            }
                        };

                        accountToken.post('transfers', requestBody).then(function(data) {
                                console.log(data);
                                var transferUrl = data.headers.get('location');

                                accountToken.get(transferUrl).then(function(response) {
                                    console.log("payent status:", response.body.status);
                                    knex('game_player').where
                                    res.redirect('http://localhost:8000/#/payment');
                                  });
                            });

                    })
                });
            })
        });
    })
});


router.get('/payment/:userID/:gameID', function(req, res){

  var userID = req.params.userID;
  var gameID = req.params.gameID;

  knex('game_player').where({game_id: gameID, player_id: userID}).update('valid_payment', true).then(function(){
    res.send('registered payment in DB');
  });

})

module.exports = router;
