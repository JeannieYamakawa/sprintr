exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('player_game', function(table) {
    table.increments();
    table.integer('game_id').unsigned().index().references('id').inTable('games').onDelete('CASCADE');
    table.integer('total_time');
    table.integer('final_ranking');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('player_game');
};
