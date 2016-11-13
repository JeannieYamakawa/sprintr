exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('websites', function(table) {
    table.increments();
    table.string('url');
    table.integer('game_id').unsigned().index().references('id').inTable('games').onDelete('CASCADE');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('websites');
};
