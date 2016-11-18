exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'player_game_website' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex.raw('ALTER SEQUENCE player_game_website_id_seq RESTART WITH 1'),
                knex( 'player_game_website' ).insert( {
                    game_website_id: '1',
                    player_id: '1',
                    total_time: 2000
                } ),
                knex( 'player_game_website' ).insert( {
                    game_website_id: '2',
                    player_id: '1',
                    total_time: 3000
                } ),
                knex( 'player_game_website' ).insert( {
                    game_website_id: '3',
                    player_id: '1',
                    total_time: 1200
                } ),
                knex( 'player_game_website' ).insert( {
                    game_website_id: '1',
                    player_id: '2',
                    total_time: 12000000
                } ),
                knex( 'player_game_website' ).insert( {
                    game_website_id: '2',
                    player_id: '2',
                    total_time: 12000000
                } ),
                knex( 'player_game_website' ).insert( {
                    game_website_id: '3',
                    player_id: '2',
                    total_time: 12000000
                } )
            ] );
        } );
};
