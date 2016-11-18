exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('game_player').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex.raw('ALTER SEQUENCE game_player_id_seq RESTART WITH 1'),
                ///LEARNING REACT GAME
                knex('game_player').insert({
                    game_id: '1',
                    player_id: '1',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '1',
                    player_id: '2',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '1',
                    player_id: '3',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '1',
                    player_id: '4',
                    final_ranking: null
                }),
                //REAL ESTATE GAME
                knex('game_player').insert({
                    game_id: '2',
                    player_id: '1',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '2',
                    player_id: '2',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '2',
                    player_id: '3',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '2',
                    player_id: '4',
                    final_ranking: null
                }),
                //FANTAST FOOTBALL GAME
                knex('game_player').insert({
                    game_id: '3',
                    player_id: '1',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '3',
                    player_id: '2',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '3',
                    player_id: '3',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '3',
                    player_id: '4',
                    final_ranking: null
                }),
                //ALAPCA BREEDING CLUB
                knex('game_player').insert({
                    game_id: '4',
                    player_id: '1',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '5',
                    player_id: '2',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '5',
                    player_id: '3',
                    final_ranking: null
                }),
                knex('game_player').insert({
                    game_id: '5',
                    player_id: '4',
                    final_ranking: null
                }),
            ]);
        });
};
