exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Gandalf",
          password: "You shall not pass!"
        },
        {
          username: "Aragorn",
          password: "Strange place for a hobbit!"
        },
        {
          username: "Gimli",
          password: "And my axe!"
        }
      ]);
    });
};
