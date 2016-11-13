
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('username')
      .unique()
      .notNullable()
      .defaultTo('');
    table.string('password')
      .notNullable()
      .defaultTo('');
    table.string('email')
      .notNullable()
      .defaultTo('');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
