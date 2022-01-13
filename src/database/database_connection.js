require('dotenv').config();
const { Pool } = require('pg');
// TODO security

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StoreDB',
  password: 'lipasoma',
  port: 5432,
});

module.exports = pool;
