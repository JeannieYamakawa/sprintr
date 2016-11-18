exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('game_website').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex.raw('ALTER SEQUENCE game_website_id_seq RESTART WITH 1'),
                knex('game_website').insert({
                    game_id: '1',
                    domain: 'github.com'
                }),
                knex('game_website').insert({
                    game_id: '1',
                    domain: 'codeacademy.com'
                }),
                knex('game_website').insert({
                    game_id: '1',
                    domain: 'scotch.io'
                }),
                knex('game_website').insert({
                    game_id: '2',
                    domain: 'alpacainfo.com'
                }),
                knex('game_website').insert({
                    game_id: '2',
                    domain: 'openherd.com'
                }),
                knex('game_website').insert({
                    game_id: '2',
                    domain: 'alpacanation.com'
                }),
                knex('game_website').insert({
                    game_id: '3',
                    domain: 'biggerpockets.com'
                }),
                knex('game_website').insert({
                    game_id: '3',
                    domain: 'zillow.com'
                }),
                knex('game_website').insert({
                    game_id: '3',
                    domain: 'austinrenc.com'
                }),
                knex('game_website').insert({
                    game_id: '4',
                    domain: 'babbel.com'
                }),
                knex('game_website').insert({
                    game_id: '4',
                    domain: 'duolingo.com'
                }),
                knex('game_website').insert({
                    game_id: '4',
                    domain: 'bonjour.com'
                }),
            ]);
        });
};
