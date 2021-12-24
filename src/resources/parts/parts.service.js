const partsRepo = require('./parts.memory.repository');

const getAll = async (req, res) => {
  try {
    const users = await partsRepo.getAll();
    res.status(200).send(users.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const getPartByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await partsRepo.getPart(id);
    if (user.rows.length) {
      res.status(200).send(user.rows);
    } else {
      res.status(404).send(`User with id ${id} not found`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createPart = async (req, res) => {
  try {
    const newPart = req.body;
    const user = await partsRepo.createPart(newPart);
    res.status(201).send(user.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const deletePartByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await partsRepo.deletePart(id);
    res.status(200).send(user.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const updatePartByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = await partsRepo.updateUser(id, updateData);
    res.status(200).send(user.rows);
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
