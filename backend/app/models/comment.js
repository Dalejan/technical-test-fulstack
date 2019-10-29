/**
 * comment.js
 * Archivo que contiene las funciones CRUD para la base de datos postgres en la tabla de comentarios
 */

const environment = process.env.NODE_ENV || "development"; // obtiene el environment
const configuration = require("../../knexfile")[environment]; // usa configuración dependiendo del environment
const database = require("knex")(configuration); // conexión a postgres dependiendo de la configuración

const createComment = (request, response) => {
  const comment = request.body.comment;
  createCommentPromise(comment)
    .then(comment => {
      comment
        ? response.status(200).json(comment)
        : response.status(404).json("Imposible crear comentario");
    })
    .catch(err => response.status(404).json(err));
};

const getCommentsByMovie = (request, response) => {
  const movie_id = request.query.movie_id;
  getCommentsPromise(movie_id)
    .then(comments => {
      comments
        ? response.status(200).json(comments)
        : response.status(404).json("Imposible encontrar comentarios");
    })
    .catch(err => response.status(404).json(err));
};

const updateComment = (request, response) => {
  const comment = request.body.comment;
  updateCommentPromise(comment)
    .then(comment => {
      comment
        ? response.status(200).json(comment)
        : response.status(404).json("Imposible actualizar comentario");
    })
    .catch(err => response.status(404).json(err));
};

const deleteComment = (request, response) => {
  const comment_id = request.query.comment_id;
  deleteCommentPromise(comment)
    .then(comment => {
      comment
        ? response.status(200).json(comment)
        : response.status(404).json("Imposible eliminar comentario");
    })
    .catch(err => response.status(404).json(err));
};

const createCommentPromise = comment => {
  return database
    .raw(
      "INSERT INTO comments (text, created_at, updated_at, user_id,  movie_id)" +
        "VALUES (?, ?, ?, ?, ?)" +
        "RETURNING text, created_at, user_id, movie_id",

      [
        comment.text,
        comment.created_at,
        comment.created_at,
        comment.user_id,
        comment.movie_id
      ]
    )
    .then(data => data.rows[0], err => console.log(err));
};

const getCommentsPromise = movie_id => {
  return database
    .raw("SELECT * FROM comments WHERE movie_id=? ORDER BY updated_at", [
      movie_id
    ])
    .then(data => data.rows, err => console.log(err));
};

const updateCommentPromise = comment => {
  return database
    .raw(
      "UPDATEcomments SET(text, updated_at)" +
        "VALUES (?, ?)" +
        "RETURNING text, updated_at, user_id, movie_id",

      [comment.text, comment.updated_at ? comment.updated_at : new Date()]
    )
    .then(data => data.rows[0], err => console.log(err));
};

const deleteCommentPromise = comment_id => {
  return database
    .raw("DELETE FROM comments WHERE comment_id=?", [comment_id])
    .then(data => data.rows, err => console.log(err));
};

// Exporta las funciones
module.exports = {
  createComment,
  getCommentsByMovie,
  updateComment,
  deleteComment
};
