exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('game_player', function(table) {
    table.increments();
    table.integer('game_id').unsigned().index().references('id').inTable('games').onDelete('CASCADE');
    table.integer('player_id').unsigned().index().references('id').inTable('players').onDelete('CASCADE');
    table.integer('final_ranking');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('game_player');
};
