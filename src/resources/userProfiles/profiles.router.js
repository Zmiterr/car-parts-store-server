const profilesService = require('./profiles.service');

async function ProfilesRouter(fastify) {
  const ProfilesRoutes = [
    {
      method: 'GET',
      url: '/profiles/:id',
      handler: profilesService.getProfileByID,
    },
    {
      method: 'POST',
      url: '/profiles',
      handler: profilesService.createProfile,
    },
    {
      method: 'PUT',
      url: '/profiles/:id',
      handler: profilesService.updateProfileByID,
    },
  ];
  ProfilesRoutes.forEach((route) => {
    fastify.route(route);
  });
}
module.exports = ProfilesRouter;
