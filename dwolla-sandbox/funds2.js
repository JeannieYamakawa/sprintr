var express = require('express');
var app = express();
var dwolla = require('dwolla-v2');

var client = new dwolla.Client({
    id: 'GFZgliT3KeVdD63qpeyqujF9WSyjy49zMk55Ipk4D13TItFG16',
    secret: "9dkp1WIhBu25nh7rI911BspQ39Dl54xucQlhLNmObUlQUSQ7S0",
    environment: 'sandbox',
});


var auth = new client.Auth({
    redirect_uri: 'http://localhost:8000/callback',
    scope: 'Send|Funding|Transactions',
    verified_account: true, // optional
    dwolla_landing: 'register', // optional
});


app.get('/', function(req, res) {
    return res.send('To begin the OAuth process, send the user off to <a href="' + auth.url + '">' + auth.url + '</a>');
});


app.get('/callback', function(req, res) {


    auth.callback(req.query) // pass the code and optional state to the callback
        .then(function(accountToken) {

            var Token = new client.Token({
                access_token: accountToken.access_token,
                refresh_token: accountToken.refresh_token,
                expires_in: accountToken.expires_in,
                scope: accountToken.scope,
                account_id: accountToken.account_id
            });

            console.log(Token);
            var accountUrl = 'https://api-uat.dwolla.com/accounts/' + accountToken.account_id;

            res.send(Token);

            Token.get(`${accountUrl}/funding-sources`).then(function(res) {
                    res.body._embedded['funding-sources'][0].name; // => 'Joe Buyer - Checking 1234'
                });

        })




});





app.listen(8000);
