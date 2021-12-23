const usersRepo = require('./auth.memory.repository');

const signup = async (req, res) => {
  try {
    const payload = req.body;
    const { username, password } = payload;
    if (!username || !password) {
      res.status(400).send({ error: true, msg: 'no required params' });
    }
    const userData = await usersRepo.checkUser(username, password);
    // TODO import correct fastify with decorator
    if (userData.rows.length) {
      const token = await fastify.jwt.sign(
        { payload },
        { expiresIn: 9999999999 }
      );
      res.send({ auth: true, token, userData: userData.rows });
    } else {
      res.status(401).send({ auth: false, msg: 'wrong login data' });
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  signup,
};
