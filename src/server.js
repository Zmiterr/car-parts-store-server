const { PORT } = require('./common/config');
const fastify = require('./app');

(async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
