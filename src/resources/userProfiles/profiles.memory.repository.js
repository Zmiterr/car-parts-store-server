// const db = require('../../database/database_connection');

const getProfile = async (id) =>
  // const profileById = db.query('SELECT * FROM profiles WHERE ID = $1', [id]);
  // if (!profileById) {
  //   throw new Error(`User with id ${id} not found`);
  // }
  // return profileById;
  ({
    rows: `getProfile mock executed id ${id}`,
  });
const createProfile = async (profile) =>
  // const { id } = profile;
  // const newProfile = db.query('INSERT INTO profiles (id)  VALUES ($1) RETURNING *;', [
  //   id,
  // ]);
  // return newProfile;
  ({
    rows: `createProfile mock executed  profile ${profile}`,
  });
const updateProfile = async (id, updateData) =>
  // const { password } = updateData;
  // if (db.query('SELECT * FROM profiles WHERE ID = $1', [id]).length) {
  //   throw new Error(`User with id ${id} not found`);
  // }
  // const updatedProfile = db.query('UPDATE profiles SET password = $2 WHERE id = $1', [
  //   id,
  //   password,
  // ]);
  // return updatedProfile;
  ({
    rows: `updateProfile mock executed. id ${id} updateData ${updateData}`,
  });

module.exports = { getProfile, createProfile, updateProfile };
