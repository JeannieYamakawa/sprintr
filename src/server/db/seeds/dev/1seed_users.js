const bcrypt = require('bcrypt');
const saltRounds = 4;
const passwordHash = bcrypt.hashSync('password1', saltRounds);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('players').insert({
          id: 1,
          first_name: "Tim",
          last_name: "Chew",
          username: "tryanc",
          password: passwordHash,
          email: 'timothyrchew@gmail.com'
        }),
        knex('players').insert({
          id: 2,
          first_name: "Jeannie",
          last_name: "Y",
          username: "jeansey",
          password: passwordHash,
          email: 'jeanbean@gmail.com'
        }),
      ]);
    });
};
