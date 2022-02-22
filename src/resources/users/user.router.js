const usersService = require('./user.service');

const UserRoutes = [
  {
    method: 'GET',
    url: '/users',
    handler: usersService.getAll,
  },
  {
    method: 'GET',
    url: '/users/:id',
    handler: usersService.getUserByID,
  },
  {
    method: 'POST',
    url: '/users',
    handler: usersService.createUser,
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: usersService.updateUserByID,
  },
  {
    method: 'PUT',
    url: '/users-location/:id',
    handler: usersService.updateUserLocationByID,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: usersService.deleteUserByID,
  },
];

module.exports = UserRoutes;
