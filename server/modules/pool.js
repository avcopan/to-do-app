const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;

pool_args = {
  host: "localhost",
  port: 5432,
  database: "weekend-to-do-app",
};

if (DB_PASSWORD) {
  pool_args.user = "postgres";
  pool_args.password = DB_PASSWORD;
}

const pool = new pg.Pool(pool_args);

module.exports = pool;
