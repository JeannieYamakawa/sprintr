exports.up = function( knex, Promise ) {
    return knex.schema.createTableIfNotExists( 'games', function( table ) {
        table.increments();
        table.string( 'admin_user_id' );
        table.boolean( 'active' );
        table.string( 'start_time' );
        table.string( 'end_time' );
        table.string( 'game_type' );
        table.string( 'first_place' );
        table.string( 'second_place' );
        table.string( 'third_place' );
    } );
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( 'games' );
};
