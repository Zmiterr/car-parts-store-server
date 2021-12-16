const usersRepo = require('./auth.memory.repository');
// TODO import correct fastify

const signup = async (req, res) => {
  try {
    const users = await usersRepo.getAll();
    const payload = req.body;
    const token = fastify.jwt.sign({ payload });
    res.send({ token });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  signup,
};
