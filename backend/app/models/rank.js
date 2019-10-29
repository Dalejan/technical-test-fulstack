/**
 * rank.js
 * Archivo que contiene las funciones CRUD para la base de datos postgres en la tabla de ranks
 */

const environment = process.env.NODE_ENV || "development"; // obtiene el environment
const configuration = require("../../knexfile")[environment]; // usa configuración dependiendo del environment
const database = require("knex")(configuration); // conexión a postgres dependiendo de la configuración

const createRank = (request, response) => {
  const rank = request.body.rank;
  createRankPromise(rank)
    .then(rank => {
      rank
        ? response.status(200).json(rank)
        : response.status(404).json("Imposible crear rank");
    })
    .catch(err => response.status(404).json(err));
};

const getRanksByMovie = (request, response) => {
  const movie_id = request.query.movie_id;

  getRanksPromise(movie_id)
    .then(ranks => {
      ranks
        ? response.status(200).json(ranks)
        : response.status(404).json("Imposible encontrar ranks");
    })
    .catch(err => response.status(404).json(err));
};

const updateRank = (request, response) => {
  const rank = request.body.rank;
  updateRankPromise(rank)
    .then(rank => {
      rank
        ? response.status(200).json(rank)
        : response.status(404).json("Imposible actualizar rank");
    })
    .catch(err => response.status(404).json(err));
};

const deleteRank = (request, response) => {
  const rank_id = request.query.rank_id;
  deleteRankPromise(rank_id)
    .then(rank => {
      rank
        ? response.status(200).json(rank)
        : response.status(404).json("Imposible eliminar rank");
    })
    .catch(err => response.status(404).json(err));
};

const createRankPromise = rank => {
  return database
    .raw(
      "INSERT INTO ranks (value, user_id,  movie_id)" +
        "VALUES (?, ?, ?)" +
        "RETURNING value, user_id, movie_id",

      [rank.value, rank.user_id, rank.movie_id]
    )
    .then(data => data.rows[0], err => console.log(err));
};

const getRanksPromise = movie_id => {
  return database
    .raw("SELECT * FROM ranks where movie_id = ?;", [movie_id])
    .then(data => data.rows, err => console.log(err));
};

const updateRankPromise = rank => {
  return database
    .raw(
      "UPDATE ranks set value = ? WHERE user_id= ? AND movie_id= ?" +
        "RETURNING value, user_id, movie_id",

      [rank.value, rank.user_id, rank.movie_id]
    )
    .then(data => data.rows[0], err => console.log(err));
};

const deleteRankPromise = rank_id => {
  return database
    .raw(
      "DELETE FROM ranks WHERE id = ?",

      [rank.id]
    )
    .then(data => data.rows[0], err => console.log(err));
};

// Exporta las funciones
module.exports = { createRank, getRanksByMovie, updateRank, deleteRank };
