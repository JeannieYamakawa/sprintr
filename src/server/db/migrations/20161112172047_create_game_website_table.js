exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('game_website', function(table) {
    table.increments();
    table.integer('game_id').unsigned().index().references('id').inTable('games').onDelete('CASCADE');
    table.string('domain');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('game_website');
};
