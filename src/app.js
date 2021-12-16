const fastify = require('fastify')({
  logger: true,
});
const userRouter = require('./resources/users/user.router');

const routes = [...userRouter];
routes.forEach((route) => {
  fastify.route(route);
});

fastify.get('/', async () => 'Service is running!');

module.exports = fastify;
