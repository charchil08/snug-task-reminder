const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'taskStoreDB',
    password: 'db_password',
    port: 5432,
})

module.exports = pool;
