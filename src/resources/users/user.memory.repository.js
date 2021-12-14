const db = require('../../database/database_connection');
const User = require('./user.model');

const getAll = async () => db.query('SELECT * FROM USERS');

const getUser = async (id) => {
  const userById = db.query('SELECT * FROM USERS WHERE ID = $1', [id]);
  if (!userById) {
    throw new Error(`User with id ${id} not found`);
  }
  return userById;
};

const createUser = async (user) => {
  const newUser = new User(user);
  db.query('');
  return User.toResponse(newUser);
};

const updateUser = async (id, updateData) => {
  if (db.query('') === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  const updatedUser = db.query('', [id, updateData]);
  return User.toResponse(updatedUser);
};

const deleteUser = async (id) => {
  if (db.query('') === -1) {
    throw new Error(`User with id ${id} not found`);
  }
  db.query('');

  return id;
};

module.exports = { getAll, getUser, createUser, deleteUser, updateUser };
