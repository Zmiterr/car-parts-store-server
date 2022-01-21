const usersRepo = require('./auth.memory.repository');
const { TOKEN_EXPIRE } = require('../../common/config');

const signup = (fastify) => async (req, res) => {
  try {
    const payload = req.body;
    const { username, password } = payload;
    if (!username || !password) {
      res.status(400).send({ error: true, msg: 'no required params' });
    }
    const userData = await usersRepo.checkUser(username, password);
    if (userData.rows.length) {
      const token = fastify.jwt.sign({ payload }, { expiresIn: TOKEN_EXPIRE });
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
