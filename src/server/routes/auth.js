const express = require( 'express' );
const router = express.Router( {
    mergeParams: true
} );
const environment = process.env.NODE_ENV || "development";
const knexConfig = require( '../../../knexfile' )[ environment ];
const knex = require( 'knex' )( knexConfig );
const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );


// router.get('/test', function (req, res) {
//   console.log("boom");
//   knex('players').then((users) => {
//     res.send(users);
//   });
// });

//issue the user a token if they have valid login credentials
router.post( '/login', function( req, res ) {
    var username = req.body.username;
    var password = req.body.password;
    if ( !username || !password ) {
        res.send( 'username or password cannot be empty' );
    } else {
        knex( 'players' ).where( {
            username: username
        } ).first().then( function( player ) {
            if ( player ) {
                console.log( "player", player );
                bcrypt.compare(password, player.password ,function(err,response){
                    if(response){
                        console.log(response, 'response from bcrypt compare');
                        var token = jwt.sign( {
                            id: player.id
                        }, ( process.env.JWT_SECRET ) );
                        res.json( {
                            token: token
                        } );
                    }
                 else {
                res.send( 'wrong username or password' );
            }
        } )
    }

} )
}
});

//create a new user account and issue a token
router.post( '/signup', function( req, res ) {
    console.log( req.body, 'req.body from /signup post route' );
    let errors = [];
    if ( !req.body.email ) {
        errors.push( "Email can't be blank" )
    };
    if ( !req.body.username ) {
        errors.push( "Name can't be blank" )
    };
    if ( !req.body.password ) {
        errors.push( "Password can't be blank" )
    };
    if ( errors.length ) {
        console.log( errors );
        res.status( 422 ).json( {
            errors: errors
        } )
    } else {
        knex( 'players' ).where( 'email', req.body.email )
            .count()
            .first()
            .then( function( result ) {
                if ( result.count === "0" ) {
                    const saltRounds = 4;
                    const passwordHash = bcrypt.hashSync( req.body.password, saltRounds );
                    knex( 'players' )
                        .insert( {
                            email: req.body.email,
                            username: req.body.username,
                            password: passwordHash,
                            first_name: req.body.firstname,
                            last_name: req.body.lastname,
                        } )
                        .returning( '*' )
                        .then( function( users ) {
                            const user = users[ 0 ];
                            const token = jwt.sign( {
                                id: user.id
                            }, ( process.env.JWT_SECRET ) );
                            console.log( token, 'token from post /signup route' );
                            res.json( {
                                id: user.id,
                                email: user.email,
                                username: user.username,
                                firstname: user.first_name,
                                lastname: user.last_name,
                                token: token
                            } )
                        } )
                } else {
                    res.status( 422 ).json( {
                        errors: [ "Email has already been taken" ]
                    } )
                }
            } )
    }
} );





//check the validity of user token, send user ID if it is valid
router.get( '/verify', function( req, res ) {
    if ( req.headers.authorization ) {
        const token = req.headers.authorization.split( ' ' )[ 1 ];
        console.log( token, 'token from /verify route' );
        // IF it was expired - verify would actually throw an exception
        // we'd have to catch in a try/catch
        const payload = jwt.verify( token, ( process.env.JWT_SECRET ) );
        console.log( payload, 'payload from /verify route' );
        knex( 'players' ).where( {
            id: payload.id
        } ).first().then( function( user ) {
            if ( user ) {
                console.log( user, 'user from /verify route' );
                res.json( {
                    id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name
                } )
            } else {
                res.status( 403 ).json( {
                    error: "Invalid ID"
                } )
            }
        } )
    } else {
        res.status( 403 ).json( {
            error: "No token"
        } )
    }
} );

//redirect to home angular
router.get( '/', function( req, res ) {
    res.redirect( '/index.html' );
} );

module.exports = router;
