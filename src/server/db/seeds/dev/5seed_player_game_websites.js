exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('player_game_website').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex.raw('ALTER SEQUENCE player_game_website_id_seq RESTART WITH 1'),
                knex('player_game_website').insert({
                    player_id: '1',
                    game_website_id: '1',
                    total_time: 2000
                }),
                knex('player_game_website').insert({
                    player_id: '1',
                    game_website_id: '2',
                    total_time: 3000
                }),
                knex('player_game_website').insert({
                    player_id: '1',
                    game_website_id: '3',
                    total_time: 1200
                }),
                knex('player_game_website').insert({
                    player_id: '2',
                    game_website_id: '1',
                    total_time: 4000
                }),
                knex('player_game_website').insert({
                    player_id: '2',
                    game_website_id: '2',
                    total_time: 2300
                }),
                knex('player_game_website').insert({
                    player_id: '2',
                    game_website_id: '3',
                    total_time: 900
                }),
                knex('player_game_website').insert({
                    player_id: '3',
                    game_website_id: '1',
                    total_time: 1300
                }),
                knex('player_game_website').insert({
                    player_id: '3',
                    game_website_id: '2',
                    total_time: 1500
                }),
                knex('player_game_website').insert({
                    player_id: '3',
                    game_website_id: '3',
                    total_time: 2100
                }),
                knex('player_game_website').insert({
                    player_id: '4',
                    game_website_id: '1',
                    total_time: 800
                }),
                knex('player_game_website').insert({
                    player_id: '4',
                    game_website_id: '2',
                    total_time: 2300
                }),
                knex('player_game_website').insert({
                    player_id: '4',
                    game_website_id: '3',
                    total_time: 2100
                }),

            ]);
        });
};
