const usersRepo = require('./user.memory.repository');

const getAll = async (req, res) => {
  try {
    const users = await usersRepo.getAll();
    res.status(200).send(users.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepo.getUser(id);
    if (user.rows.length) {
      res.status(200).send(user.rows);
    } else {
      res.status(404).send(`User with id ${id} not found`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await usersRepo.createUser(newUser);
    res.status(201).send(user.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.deleteUser(id);
    res.status(200).send(user.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const updateUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = await usersRepo.updateUser(id, updateData);
    res.status(200).send(user.rows);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getUserByID,
  createUser,
  deleteUserByID,
  updateUserByID,
};
