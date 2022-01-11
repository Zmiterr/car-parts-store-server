const profilesRepo = require('./profiles.memory.repository');

const getProfileByID = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await profilesRepo.getProfile(id);
    if (profile.rows.length) {
      res.status(200).send(profile.rows);
    } else {
      res.status(404).send(`Profile with id ${id} not found`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createProfile = async (req, res) => {
  try {
    const newProfile = req.body;
    const profile = await profilesRepo.createProfile(newProfile);
    res.status(201).send(profile.rows);
  } catch (err) {
    throw new Error(err);
  }
};

const updateProfileByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const profile = await profilesRepo.updateProfile(id, updateData);
    res.status(200).send(profile.rows);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getProfileByID,
  createProfile,
  updateProfileByID,
};
