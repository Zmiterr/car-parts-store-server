const fs = require('fs');
// const db = require('../../database/database_connection');

const getAll = async () => {
  const rawdata = fs.readFileSync('src/json-base/parts.json');
  const parts = JSON.parse(rawdata);
  return parts;
};

const getPart = async (id) => {
  const partById = db.query('SELECT * FROM parts WHERE ID = $1', [id]);
  if (!partById) {
    throw new Error(`User with id ${id} not found`);
  }
  return partById;
};

const createPart = async (part) => {
  const { id } = part;
  const newPart = db.query('INSERT INTO parts (id)  VALUES ($1) RETURNING *;', [
    id,
  ]);
  return newPart;
};

const updatePart = async (id, updateData) => {
  const { password } = updateData;
  if (db.query('SELECT * FROM parts WHERE ID = $1', [id]).length) {
    throw new Error(`User with id ${id} not found`);
  }
  const updatedPart = db.query('UPDATE parts SET password = $2 WHERE id = $1', [
    id,
    password,
  ]);
  return updatedPart;
};

const deletePart = async (id) => {
  if (db.query('SELECT * FROM parts WHERE ID = $1', [id]).rows.length) {
    throw new Error(`User with id ${id} not found`);
  }
  db.query('DELETE FROM parts WHERE id =$1', [id]);

  return id;
};

module.exports = { getAll, getPart, createPart, deletePart, updatePart };
