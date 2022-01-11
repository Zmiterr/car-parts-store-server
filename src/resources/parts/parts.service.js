const partsRepo = require('./parts.memory.repository');

const getAll = async (req, res) => {
  try {
    const parts = await partsRepo.getAll();
    res.status(200).send(parts);
  } catch (err) {
    throw new Error(err);
  }
};

const getPartByID = async (req, res) => {
  try {
    const { id } = req.params;

    const part = await partsRepo.getPart(id);
    if (part.rows.length) {
      res.status(200).send(part.rows);
    } else {
      res.status(404).send(`Part with id ${id} not found`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createPart = async (req, res) => {
  try {
    const newPart = req.body;
    const part = await partsRepo.createPart(newPart);
    res.status(201).send(part.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const deletePartByID = async (req, res) => {
  try {
    const { id } = req.params;
    const part = await partsRepo.deletePart(id);
    res.status(200).send(part.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const updatePartByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const part = await partsRepo.updatePart(id, updateData);
    res.status(200).send(part.rows);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getPartByID,
  createPart,
  deletePartByID,
  updatePartByID,
};
