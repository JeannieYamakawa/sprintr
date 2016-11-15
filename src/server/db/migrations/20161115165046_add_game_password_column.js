
exports.up = function(knex, Promise) {
    return knex.schema.table('games', function(table) {
              table.string('game_password');
      })

};

exports.down = function(knex, Promise) {
    return knex.schema.table('games', function(table) {
            table.dropColumn('game_password');
      })
};
