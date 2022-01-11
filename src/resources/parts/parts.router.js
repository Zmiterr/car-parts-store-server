const partsService = require('./parts.service');

async function PartsRouter(fastify) {
  const PartsRoutes = [
    {
      method: 'GET',
      url: '/parts',
      handler: partsService.getAll,
      // handler: async () => 'done!',
    },
    {
      method: 'GET',
      url: '/parts/:id',
      handler: partsService.getPartByID,
    },
    {
      method: 'POST',
      url: '/parts',
      handler: partsService.createPart,
    },
    {
      method: 'PUT',
      url: '/parts/:id',
      handler: partsService.updatePartByID,
    },
    {
      method: 'DELETE',
      url: '/parts/:id',
      handler: partsService.deletePartByID,
    },
  ];
  PartsRoutes.forEach((route) => {
    fastify.route(route);
  });
}
module.exports = PartsRouter;
