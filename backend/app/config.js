/**
 * Configuración de variables de entorno
 */
module.exports = {
  name: "MovieAppBackend",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db_url: process.env.DATABASE_URL,
  base_url:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
};
