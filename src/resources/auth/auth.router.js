const authService = require('./auth.service');

const AuthRoutes = [
  {
    method: 'POST',
    url: '/signup',
    handler: authService.signup,
  },
];

module.exports = AuthRoutes;
