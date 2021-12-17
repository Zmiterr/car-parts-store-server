const fp = require('fastify-plugin');
const jwt = require('fastify-jwt');

module.exports = fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET_KEY,
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
