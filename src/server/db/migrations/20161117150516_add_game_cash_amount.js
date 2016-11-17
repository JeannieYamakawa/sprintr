
exports.up = function(knex, Promise) {
    return knex.schema.table('games', function(table) {
              table.integer('cash_amount');
      })

};

exports.down = function(knex, Promise) {
    return knex.schema.table('games', function(table) {
            table.dropColumn('cash_amount');
      })
};
