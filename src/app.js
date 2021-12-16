const fastify = require('fastify')({
  logger: true,
});
const fp = require('fastify-plugin');
const db = require('./database/database_connection');

fastify.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET_KEY,
});

fastify.decorate('authenticate', async (request, reply) => {
  console.log('test');
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

const checkUSer = async (login, password) =>
  db.query('SELECT * FROM USERS WHERE login = $1 AND password = $2', [
    login,
    password,
  ]);
fastify.post('/signup', async (req, res) => {
  const payload = req.body;
  const { login, password } = payload;

  if (!login || !password) {
    res.status(400).send({ error: true, msg: 'no required params' });
  }
  const userData = await checkUSer(login, password);

  console.log(typeof userData.rows);
  if (userData.rows.length) {
    const token = fastify.jwt.sign({ payload }, { expiresIn: 9999999999 });
    res.send({ auth: true, token, userData: userData.rows });
  } else {
    res.status(401).send({ auth: false, msg: 'wrong login data' });
  }
});

const userRouter = require('./resources/users/user.router');
const authRouter = require('./resources/auth/auth.router');

const routes = [...userRouter];
routes.forEach((route) => {
  fastify.route(route);
});

fastify.get(
  '/',
  { preValidation: [fastify.authenticate] },
  async () => 'Service is running!'
);

module.exports = fastify;
