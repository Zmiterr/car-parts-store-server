const fs = require('fs');
const db = require('../../database/database_connection');

const getParts = () => {
  const partsObject = JSON.parse(fs.readFileSync('src/json-base/parts.json'));

  return Object.keys(partsObject).map((key) => ({
    id: key,
    ...partsObject[key],
  }));
};
const isLotExist = (id) =>
  db.query(`SELECT *
                               FROM lots
                               WHERE ID = '${id}'`).rows;

const getLots = async (id) => {
  const dealerLotsQuery = await db.query(
    `SELECT * FROM lots WHERE "dealerId" = '1'`
  );
  return dealerLotsQuery.rows;
};

const getAll = async () => {
  const dealerLots = await getLots();
  return dealerLots.map((lot) => ({ ...getParts()[lot.partId], ...lot }));
};

const getByDealer = async (dealerId = 1) => {
  const dealerLots = await getLots(dealerId);
  return dealerLots.map((lot) => ({ ...lot, ...getParts()[lot.partId] }));
};

const getLot = async (id) => {
  const lotById = db.query(`SELECT * FROM lots WHERE ID = '${id}'`);
  if (!lotById) {
    throw new Error(`Lot with id ${id} not found`);
  }
  return lotById.rows;
};

const createLot = async ({
  partId,
  dealerId,
  description,
  price,
  condition,
  photoUrl,
}) =>
  db.query(
    `INSERT INTO lots("partId", "dealerId", description, price, condition, "photoUrl") 
VALUES (${partId || null}, 
        ${dealerId || 1}, 
        ${description || null}, 
        '${price}', '${condition}', 
        ${photoUrl || null}) RETURNING *`
  );

const updateLot = async (
  id,
  { partId, description, price, condition, photoUrl }
) =>
  // if (db.query('SELECT * FROM lots WHERE ID = $1', [id]).length) {
  //   throw new Error(`User with id ${id} not found`);
  // }
  db.query(
    `UPDATE lots 
SET "partId" = '${partId}', 
    description = '${description}', 
    price = '${price}', 
    condition ='${condition}', 
    "photoUrl" = '${photoUrl}' 
WHERE id = '${id}'  RETURNING *`
  );
const deleteLot = async (id) => {
  if (!isLotExist) {
    throw new Error(`Lot with id ${id} not found`);
  }
  db.query(`DELETE FROM lots WHERE id ='${id}'`);

  return 1;
};

module.exports = {
  getAll,
  getLot,
  getByDealer,
  createLot,
  deleteLot,
  updateLot,
};
