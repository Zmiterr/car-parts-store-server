const db = require('../../database/database_connection');

const getAll = async () => {
  const orders = await db.query(
    `SELECT l.*,
       customers."firstName" as "customerFirstName",
       customers."lastName" as "customerLastName",
       customers.email,
       customers."deliveryAddress",
       customers.phone,
       dealers."firstName" as "dealerFirstName",
       dealers."lastName" as "dealerLastName",
       dealers.phone,
       dealers.location,
       o."orderDate"
FROM orders o
         JOIN lots l ON l.id = o."lotsId"
         JOIN users dealers ON dealers.id = l."dealerId"
         JOIN users customers ON customers.id = o."customerId"`
  );
  return orders;
};

const getByCustomer = async (customerId) => {
  const customersLots = await db.query(
    `SELECT l.id,
       customers."firstName" as "customerFirstName",
       customers."lastName" as "customerLastName",
       customers.email,
       customers."deliveryAddress",
       customers.phone,
       dealers."firstName" as "dealerFirstName",
       dealers."lastName" as "dealerLastName",
       dealers.phone,
       dealers.location,
       o."orderDate"
FROM orders o
         JOIN lots l ON l.id = o."lotsId"
         JOIN users dealers ON dealers.id = l."dealerId"
         JOIN users customers ON customers.id = o."customerId"
WHERE customers.id = ${customerId};`
  );
  return customersLots;
};

const getByDealer = async (dealerId) => {
  const dealerLots = await db.query(
    `SELECT l.id,
       customers."firstName" as "customerFirstName",
       customers."lastName" as "customerLastName",
       customers.email,
       customers."deliveryAddress",
       customers.phone,
       dealers."firstName" as "dealerFirstName",
       dealers."lastName" as "dealerLastName",
       dealers.phone,
       dealers.location,
       o."orderDate"
FROM orders o
         JOIN lots l ON l.id = o."lotsId"
         JOIN users dealers ON dealers.id = l."dealerId"
         JOIN users customers ON customers.id = o."customerId"
WHERE dealers.id = ${dealerId};`
  );
  return dealerLots;
};

const createLot = async ({ lotsId, customerId }) =>
  db.query(
    `INSERT INTO orders("lotsId", "customerId", "orderDate")
         VALUES (${lotsId},
                 ${customerId},
                  (select current_date)
                 )
         RETURNING *`
  );

const updateLot = async (id, { lotsId, customerId }) =>
  db.query(
    `UPDATE orders
         SET "lotsId"    = '${lotsId}',
             "customerId" = '${customerId}'             
         WHERE id = '${id}'
         RETURNING *`
  );
const deleteLot = async (id) => {
  db.query(`DELETE
              FROM orders
              WHERE id = '${id}'`);

  return 1;
};

module.exports = {
  getAll,
  getByDealer,
  getByCustomer,
  createLot,
  deleteLot,
  updateLot,
};
