const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
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
});
