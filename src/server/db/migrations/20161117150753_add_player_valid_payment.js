
exports.up = function(knex, Promise) {
    return knex.schema.table('game_player', function(table) {
              table.boolean('valid_payment').defaultTo(false);
      })

};

exports.down = function(knex, Promise) {
    return knex.schema.table('game_player', function(table) {
            table.dropColumn('valid_payment');
      })
};
