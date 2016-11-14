exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('player_game_website', function(table) {
    table.increments();
    table.integer('game_website_id').unsigned().index().references('id').inTable('game_website').onDelete('CASCADE');
    table.integer('player_id').unsigned().index().references('id').inTable('players').onDelete('CASCADE');
    table.integer('total_time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('player_game_website');
};
