const db = require('../../database/database_connection');

const getAll = async (login, password) =>
  db.query('SELECT * FROM users WHERE login=$1 AND password=$2', [
    login,
    password,
  ]);

module.exports = { getAll };
