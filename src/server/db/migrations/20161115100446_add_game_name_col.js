
exports.up = function(knex, Promise) {
    return knex.schema.table('games', function(table) {
              table.string('name');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('games', function(table) {
            table.dropColumn('name');
      })
};
