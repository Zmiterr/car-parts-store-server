const db = require('../../database/database_connection');

const getAll = async () => db.query('SELECT * FROM users');

const getUser = async (id) => {
  const userById = db.query('SELECT * FROM USERS WHERE ID = $1', [id]);
  if (!userById) {
    throw new Error(`User with id ${id} not found`);
  }
  return userById;
};

const createUser = async (user) => {
  const { login, password, role } = user;
  const newUser = db.query(
    'INSERT INTO users (login, password, role)  VALUES ($1, $2, $3) RETURNING *;',
    [login, password, role]
  );
  return newUser;
};

const updateUser = async (id, updateData) => {
  const { password } = updateData;
  if (db.query('SELECT * FROM USERS WHERE ID = $1', [id]).rowCount === 0) {
    throw new Error(`User with id ${id} not found`);
  }
  const updatedUser = db.query('UPDATE users SET password = $2 WHERE id = $1', [
    id,
    password,
  ]);
  return updatedUser;
};

const deleteUser = async (id) => {
  if (db.query('SELECT * FROM USERS WHERE ID = $1', [id]).rowCount === 0) {
    throw new Error(`User with id ${id} not found`);
  }
  db.query('DELETE FROM users WHERE id =$1', [id]);

  return id;
};

module.exports = { getAll, getUser, createUser, deleteUser, updateUser };
