const db = require('../../database/database_connection');

const checkUser = async (login, password) =>
  db.query(
    'SELECT id, login, role FROM USERS WHERE login = $1 AND password = $2',
    [login, password]
  );

module.exports = { checkUser };
