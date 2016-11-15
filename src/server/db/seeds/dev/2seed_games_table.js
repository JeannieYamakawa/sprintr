const moment = require( 'moment' );
var startdate = moment();
var new_date = moment( startdate, "DD-MM-YYYY" ).add( 5, 'days' );

exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'games' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex( 'games' ).insert( {
                    id: 1,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'points',
                    name: 'game1'
                } ),
                knex( 'games' ).insert( {
                    id: 2,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'points',
                    name: 'game2'
                } ),
                knex( 'games' ).insert( {
                    id: 3,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'points',
                    name: 'game3'
                } )
            ] );
        } );
};
