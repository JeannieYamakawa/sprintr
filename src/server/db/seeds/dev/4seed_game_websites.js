exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'game_website' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex.raw('ALTER SEQUENCE game_website_id_seq RESTART WITH 1'),
                knex( 'game_website' ).insert( {
                    game_id: '1',
                    domain: 'facebook.com'
                } ),
                knex( 'game_website' ).insert( {
                    game_id: '1',
                    domain: 'twitter.com'
                } ),
                knex( 'game_website' ).insert( {
                    game_id: '1',
                    domain: 'espn.com'
                } ),
                knex( 'game_website' ).insert( {
                    game_id: '2',
                    domain: 'galvanize.com'
                } )
            ] );
        } );
};
