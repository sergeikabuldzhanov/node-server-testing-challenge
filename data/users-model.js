//knex instance import
const db = require("./db-config");

//query builder function
const u = () => db("users");

function getAll() {
  return u();
}

function getById(id) {
  return u()
    .where({ id })
    .first();
}

function insert(user) {
  return u()
    .insert(user)
    .then(([id]) => getById(id));
}

function remove(id) {
  u()
    .where({ id })
    .del();
}

module.exports = {
  getAll,
  getById,
  insert,
  remove
};
