const express = require( 'express' );
const router = express.Router( {
    mergeParams: true
} );
const environment = process.env.NODE_ENV || "development";
const knexConfig = require( '../../../knexfile' )[ environment ];
const knex = require( 'knex' )( knexConfig );
const bcrypt = require('bcrypt');



router.get( '/', function( req, res ) {
    res.redirect( '/index.html' );
} );


module.exports = router;
