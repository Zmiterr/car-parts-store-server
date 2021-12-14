const fastify = require('fastify');
const userRouter = require('./resources/users/user.router');

const app = fastify({
  logger: true,
});

const routes = [...userRouter];
routes.forEach((route) => {
  app.route(route);
});

app.get('/', async () => 'Service is running!');

module.exports = app;
