exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'games' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex( 'games' ).insert( {
                    id: 1,
                    admin_user_id: 'user1',
                    active: true,
                    start_time: knex.raw( 'current_timestamp' ),
                    end_time: knex.raw( 'current_timestamp' ),
                    game_type: 'points'
                } ),
                knex( 'games' ).insert( {
                    id: 2,
                    admin_user_id: 'user2',
                    active: true,
                    start_time: knex.raw( 'current_timestamp' ),
                    end_time: knex.raw( 'current_timestamp' ),
                    game_type: 'points'
                } ),
                knex( 'games' ).insert( {
                    id: 3,
                    admin_user_id: 'user3',
                    active: true,
                    start_time: knex.raw( 'current_timestamp' ),
                    end_time: knex.raw( 'current_timestamp' ),
                    game_type: 'points'
                } )
            ] );
        } );
};
