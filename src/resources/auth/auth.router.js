const authService = require('./auth.service');

async function AuthRouter(fastify) {
  const AuthRoutes = [
    {
      method: 'POST',
      url: '/signupp',
      preValidation: [fastify.authenticate],
      handler: authService.signup(fastify),
      // handler: async () => 'done!',
    },
  ];
  AuthRoutes.forEach((route) => {
    fastify.route(route);
  });
}
module.exports = AuthRouter;
