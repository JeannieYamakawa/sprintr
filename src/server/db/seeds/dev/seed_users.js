
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({first_name: "Tim", last_name: "Chew", username: "tryanc", password: "1234", email: 'timothyrchew@gmail.com'}),
      ]);
    });
};
