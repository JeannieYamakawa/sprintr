var express = require('express');
var app = express();
const environment = process.env.NODE_ENV || "development";
const request = require('request');
var Dwolla = require('dwolla-node')('GFZgliT3KeVdD63qpeyqujF9WSyjy49zMk55Ipk4D13TItFG16', "9dkp1WIhBu25nh7rI911BspQ39Dl54xucQlhLNmObUlQUSQ7S0"); // initialize API client



// router.get('/dwolla_redirect', function(req, res) {
//
//     var code = req.query.code;
//     console.log(code);
//
//     var data = {
//         "client_id": "GFZgliT3KeVdD63qpeyqujF9WSyjy49zMk55Ipk4D13TItFG16",
//         "client_secret": "9dkp1WIhBu25nh7rI911BspQ39Dl54xucQlhLNmObUlQUSQ7S0",
//         "code": code,
//         "grant_type": "authorization_code",
//         "redirect_uri": "https://localhost:8000/dwolla_redirect"
//     }
//
//
//     request.post('https://uat.dwolla.com/oauth/v2/token', data, function(err, response, body){
//       // console.log(err);
//       // console.log(res);
//       console.log(body);
//       res.send('sucess')
//     })
//
//
// });


// Some constants...
var redirect_uri = 'http://localhost:3000/oauth_return';

// use sandbox API environment
Dwolla.sandbox = true;


/**
 * STEP 1:
 *   Create an authentication URL
 *   that the user will be redirected to
 *
 *   Visit http://localhost:3000/ to see it in action.
 **/
app.get('/', function(req, res) {
    var authUrl = Dwolla.authUrl(redirect_uri);

    return res.send('To begin the OAuth process, send the user off to <a href="' + authUrl + '">' + authUrl + '</a>');
});


/**
 * STEP 2:
 *   Exchange the temporary code given
 *   to us in the querystring, for
 *   an access token and refresh token.
 **/
app.get('/oauth_return', function(req, res) {
    var code = req.query.code;

    Dwolla.finishAuth(code, redirect_uri, function(error, auth) {
        var output = "Your OAuth access_token is: <b>" + auth.access_token + "</b>, which will expire in " + auth.expires_in + " seconds.<br>Your refresh_token is: <b>" + auth.refresh_token + "</b>, and that'll expire in " + auth.refresh_expires_in + " seconds.";
        output += '<br><a href="/refresh?refreshToken=' + encodeURIComponent(auth.refresh_token) + '">Click here to get a new access and refresh token pair!</a>';
        // return res.send(output);



        var accountUrl = 'https://api-uat.dwolla.com/accounts/' + auth.account_id;

        accountToken
        .get(`${accountUrl}/funding-sources`)
        .then(function(res) {
          res.body._embedded['funding-sources'][0].name; // => 'Joe Buyer - Checking 1234'
        });


    });



});

/**
 * STEP 3:
 *  Use a refresh token to get a new
 *  access token and refresh token pair.
 **/

app.get('/refresh', function(req, res) {
    Dwolla.refreshAuth(req.query.refreshToken, function(error, auth) {
        if (error) return res.send(error);

        var output = "Your OAuth access_token is: <b>" + auth.access_token + "</b>, which will expire in " + auth.expires_in + " seconds.<br>Your refresh_token is: <b>" + auth.refresh_token + "</b>, and that'll expire in " + auth.refresh_expires_in + " seconds.";
        output += '<br><a href="/refresh?refreshToken=' + encodeURIComponent(auth.refresh_token) + '">Click here to get a new access and refresh token pair!</a>';
        return res.send(output);
    });
});


app.get('/catalog', function(req, res) {
    Dwolla.catalog(req.query.token, function(error, links) {
        if (error) return res.send(error);

        var output = "The endpoints that you can use are:"
        links.forEach(function(link) {
            output += "<br /> " + link;
        })
        return res.send(output);
    });
});



app.listen(3000);
