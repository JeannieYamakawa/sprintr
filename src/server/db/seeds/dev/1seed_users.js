const bcrypt = require('bcrypt');
const saltRounds = 4;
const passwordHash = bcrypt.hashSync('password1', saltRounds);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex.raw('ALTER SEQUENCE players_id_seq RESTART WITH 1'),
        knex('players').insert({
          first_name: "Tim",
          last_name: "Chew",
          username: "tryanc",
          password: passwordHash,
          email: 'timothyrchew@gmail.com'
        }),
        knex('players').insert({
          first_name: "Jeannie",
          last_name: "Y",
          username: "jeansey",
          password: passwordHash,
          email: 'jeanbean@gmail.com'
        }),
      ]);
    });
};
