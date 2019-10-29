exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE comments(
    id SERIAL PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    user_id TEXT NOT NULL,
    movie_id NUMERIC NOT NULL
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE comments`;
  return knex.raw(dropQuery);
};
