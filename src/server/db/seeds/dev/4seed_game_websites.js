exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'game_website' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex( 'game_website' ).insert( {
                    id: 1,
                    game_id: '1',
                    domain: 'www.facebook.com'
                } ),
                knex( 'game_website' ).insert( {
                    id: 2,
                    game_id: '1',
                    domain: 'www.twitter.com'
                } ),
                knex( 'game_website' ).insert( {
                    id: 3,
                    game_id: '1',
                    domain: 'www.espn.com'
                } ),
                knex( 'game_website' ).insert( {
                    id: 4,
                    game_id: '2',
                    domain: 'www.galvanize.com'
                } )
            ] );
        } );
};
