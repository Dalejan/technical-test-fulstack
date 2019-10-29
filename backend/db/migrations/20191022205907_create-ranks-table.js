exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE ranks(
    id SERIAL PRIMARY KEY NOT NULL,
    value NUMERIC NOT NULL,
    user_id TEXT NOT NULL,
    movie_id NUMERIC NOT NULL
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE comments`;
  return knex.raw(dropQuery);
};
