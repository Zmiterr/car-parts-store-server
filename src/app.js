const fastify = require('fastify');

const app = fastify({
  logger: true,
});

app.get('/', async () => 'Service is running!');

module.exports = app;
