const lotsRepo = require('./lots.memory.repository');

const getAll = async (req, res) => {
  try {
    const lots = await lotsRepo.getAll();
    res.status(200).send(lots);
  } catch (err) {
    throw new Error(err);
  }
};

const getLotByID = async (req, res) => {
  try {
    const { id } = req.params;

    const lot = await lotsRepo.getLot(id);
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
    const lot = await lotsRepo.createLot(newLot);
    res.status(201).send(lot.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteLotByID = async (req, res) => {
  try {
    const { id } = req.params;
    const lot = await lotsRepo.deleteLot(id);
    res.status(200).send(lot.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const updateLotByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const lot = await lotsRepo.updateLot(id, updateData);
    res.status(200).send(lot.rows);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getLotByID,
  createLot,
  deleteLotByID,
  updateLotByID,
};
