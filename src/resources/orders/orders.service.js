const ordersRepo = require('./orders.memory.repository');

const getAll = async (req, res) => {
  try {
    const lots = await ordersRepo.getAll();
    res.status(200).send(lots);
  } catch (err) {
    throw new Error(err);
  }
};

const getByCustomer = async (req, res) => {
  try {
    const lots = await ordersRepo.getByCustomer();
    res.status(200).send(lots);
  } catch (err) {
    throw new Error(err);
  }
};

const getByDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const lot = await ordersRepo.getByDealer(id);
    if (lot.rows.length) {
      res.status(200).send(lot.rows);
    } else {
      res.status(404).send(`Lot with id ${id} not found`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createLot = async (req, res) => {
  try {
    const newLot = req.body;
    const lot = await ordersRepo.createLot(newLot);
    res.status(201).send(lot.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteLotByID = async (req, res) => {
  try {
    const { id } = req.params;
    const lot = await ordersRepo.deleteLot(id);
    res.status(200).send(lot);
  } catch (err) {
    throw new Error(err);
  }
};

const updateLotByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const lot = await ordersRepo.updateLot(id, updateData);
    res.status(200).send(lot.rows);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getByDealer,
  getByCustomer,
  createLot,
  deleteLotByID,
  updateLotByID,
};
