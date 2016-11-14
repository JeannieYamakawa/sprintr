exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'players' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex( 'players' ).insert( {
                    first_name: "Tim",
                    last_name: "Chew",
                    username: "tryanc",
                    password: "1234",
                    email: 'timothyrchew@gmail.com'
                } ),
            ] );
        } );
};
