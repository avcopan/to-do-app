const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app', 
    user: 'postgres',
    password: DB_PASSWORD,
});

module.exports = pool;
