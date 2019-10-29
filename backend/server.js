/**
 * server.js Archivo principal encargado de inicializar el servidor
 */

//Importaciones
if (process.env.NODE_ENV === "development") {
  // Lee estas variables solo si está en development
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const Comment = require("./app/models/comment");
const Rank = require("./app/models/rank");
const config = require("./app/config");
const cors = require("cors");

// Declaraciones
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// CRUD comments
app.post("/api/comments", Comment.createComment);
app.get("/api/comments", Comment.getCommentsByMovie);
app.patch("/api/comments", Comment.updateComment);
app.delete("/api/comments", Comment.deleteComment);

// CRUD ranks
app.post("/api/ranks", Rank.createRank);
app.get("/api/ranks", Rank.getRanksByMovie);
app.patch("/api/ranks", Rank.updateRank);
app.delete("/api/ranks", Rank.deleteRank);

// Inicialización del servidor
app.listen(config.port, () => {
  console.log(
    "%s Server listening at %s, in %s enviroment",
    config.name,
    config.base_url,
    config.env
  );
});

module.exports = app;
