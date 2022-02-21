const fastify = require('fastify')({
  logger: {
    level: 'info',
    prettyPrint: true,
    target: 'pino-pretty',
    // file: './log.txt', // Will use pino.destination()
    options: {
      colorize: true,
    },
  },
});

fastify.addHook('preHandler', async (req, reply) => {
  if (req.body) {
    req.log.info({ body: req.body, params: req.params }, 'parsed body');
    reply.log.info({ body: req.body }, 'parsed body');
  }
});
// const fp = require('fastify-plugin');
// const jwt = require('fastify-jwt');
const db = require('./database/database_connection');

fastify.register(require('fastify-cors'), {
  origin: '*',
});

fastify.register(require('fastify-socket.io'), {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  maxPayload: 2500,
});

fastify.get('/chat', (req, reply) => {
  fastify.io.emit('hello');
  reply.status(200).send('Socket connected');
});

fastify.ready((err) => {
  if (err) throw err;

  fastify.io.on('connection', (socket) => {
    console.info('Socket connected!', socket.id);
    socket.on('newMessage', (data) => {
      console.log('initiated', data);
      fastify.io.sockets.emit('chat', data);
    });
    socket.on('online', () => {
      fastify.io.emit('joined', {
        success: true,
      });
    });
  });
});

// fp(async (fast) => {
// fastify.register(require('fastify-jwt'), {
//   secret: async () => process.env.JWT_SECRET_KEY,
// });
//
// fastify.decorate('authenticate', async (request, reply) => {
//   try {
//     await request.jwtVerify();
//   } catch (err) {
//     reply.send(err);
//   }
// });
// });

fastify.register(require('./middleware/auth'));

const checkUSer = async (login, password) =>
  db.query('SELECT * FROM USERS WHERE login = $1 AND password = $2', [
    login,
    password,
  ]);
fastify.post('/signup', async (req, res) => {
  const payload = req.body;
  const { username, password } = payload;
  if (!username || !password) {
    res.status(400).send({ error: true, msg: 'no required params' });
  }
  const userData = await checkUSer(username, password);

  if (userData.rows.length) {
    const token = await fastify.jwt.sign(
      { payload },
      { expiresIn: 9999999999 }
    );
    res.send({ auth: true, token, userData: userData.rows });
  } else {
    res.status(401).send({ auth: false, msg: 'wrong login data' });
  }
});

const userRouter = require('./resources/users/user.router');
// const authRouter = require('./resources/auth/auth.router');

const routes = [...userRouter];
routes.forEach((route) => {
  fastify.route(route);
});

fastify.register(require('./resources/auth/auth.router'));
fastify.register(require('./resources/parts/parts.router'));
fastify.register(require('./resources/lots/lots.router'));
fastify.register(require('./resources/orders/orders.router'));

fastify.get(
  '/',
  // { preValidation: [fastify.authenticate] },
  async () => 'Service is running!'
);

module.exports = fastify;
