exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('player_websites', function(table) {
    table.increments();
    table.integer('game_id').unsigned().index().references('id').inTable('games').onDelete('CASCADE');
    table.integer('player_id').unsigned().index().references('id').inTable('players').onDelete('CASCADE');
    table.integer('website_id').unsigned().index().references('id').inTable('websites').onDelete('CASCADE');
    table.integer('total_time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('player_websites');
};
