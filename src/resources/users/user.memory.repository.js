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
  const { firstName, lastName, phone, email } = updateData;
  if (db.query('SELECT * FROM USERS WHERE ID = $1', [id]).length) {
    throw new Error(`User with id ${id} not found`);
  }
  const updatedUser = db.query(
    `UPDATE users 
     SET "firstName" = '${firstName}',
         "lastName" = '${lastName}',
         "phone" = '${phone}',
         "email" = '${email}'
     WHERE id = ${id} `
  );
  return updatedUser;
};

const updateUserLocation = async (id, updateData) => {
  if (db.query('SELECT * FROM USERS WHERE ID = $1', [id]).length) {
    throw new Error(`User with id ${id} not found`);
  }
  const updatedUser = db.query(
    `UPDATE users 
     SET "location" = '${updateData}'         
     WHERE id = ${id} `
  );
  return updatedUser;
};

const deleteUser = async (id) => {
  if (db.query('SELECT * FROM USERS WHERE ID = $1', [id]).rows.length) {
    throw new Error(`User with id ${id} not found`);
  }
  db.query('DELETE FROM users WHERE id =$1', [id]);

  return id;
};

module.exports = {
  getAll,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateUserLocation,
};
