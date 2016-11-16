exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'player_game_website' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex( 'player_game_website' ).insert( {
                    id: 1,
                    game_website_id: '1',
                    player_id: '1',
                    total_time: 0
                } ),
                knex( 'player_game_website' ).insert( {
                    id: 2,
                    game_website_id: '2',
                    player_id: '1',
                    total_time: 6000000
                } ),
                knex( 'player_game_website' ).insert( {
                    id: 3,
                    game_website_id: '3',
                    player_id: '1',
                    total_time: 6000000
                } ),
                knex( 'player_game_website' ).insert( {
                    id: 4,
                    game_website_id: '1',
                    player_id: '2',
                    total_time: 12000000
                } ),
                knex( 'player_game_website' ).insert( {
                    id: 5,
                    game_website_id: '2',
                    player_id: '2',
                    total_time: 12000000
                } ),
                knex( 'player_game_website' ).insert( {
                    id: 6,
                    game_website_id: '3',
                    player_id: '2',
                    total_time: 12000000
                } )
            ] );
        } );
};
