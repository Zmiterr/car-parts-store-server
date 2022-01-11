const fs = require('fs');
// const db = require('../../database/database_connection');

const getAll = async () => {
  const rawdata = fs.readFileSync('src/json-base/lots.json');
  const lots = JSON.parse(rawdata);
  return lots;
};

const getLot = async (id) =>
  // const lotById = db.query('SELECT * FROM lots WHERE ID = $1', [id]);
  // if (!lotById) {
  //   throw new Error(`User with id ${id} not found`);
  // }
  // return lotById;
  ({
    rows: `getLot mock executed id ${id}`,
  });
const createLot = async (lot) =>
  // const { id } = lot;
  // const newLot = db.query('INSERT INTO lots (id)  VALUES ($1) RETURNING *;', [
  //   id,
  // ]);
  // return newLot;
  ({
    rows: `createLot mock executed  lot ${lot}`,
  });
const updateLot = async (id, updateData) =>
  // const { password } = updateData;
  // if (db.query('SELECT * FROM lots WHERE ID = $1', [id]).length) {
  //   throw new Error(`User with id ${id} not found`);
  // }
  // const updatedLot = db.query('UPDATE lots SET password = $2 WHERE id = $1', [
  //   id,
  //   password,
  // ]);
  // return updatedLot;
  ({
    rows: `updateLot mock executed. id ${id} updateData ${updateData}`,
  });
const deleteLot = async (id) =>
  // if (db.query('SELECT * FROM lots WHERE ID = $1', [id]).rows.length) {
  //   throw new Error(`User with id ${id} not found`);
  // }
  // db.query('DELETE FROM lots WHERE id =$1', [id]);
  //
  // return id;
  ({
    rows: `deleteLot mock executed ${id}`,
  });
module.exports = { getAll, getLot, createLot, deleteLot, updateLot };
