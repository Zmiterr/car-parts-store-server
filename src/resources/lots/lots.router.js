const lotsService = require('./lots.service');

async function LotsRouter(fastify) {
  const LotsRoutes = [
    {
      method: 'GET',
      url: '/lots',
      handler: lotsService.getAll,
      // handler: async () => 'done!',
    },
    {
      method: 'GET',
      url: '/lots/:id',
      handler: lotsService.getLotByID,
    },
    {
      method: 'POST',
      url: '/lots',
      handler: lotsService.createLot,
    },
    {
      method: 'PUT',
      url: '/lots/:id',
      handler: lotsService.updateLotByID,
    },
    {
      method: 'DELETE',
      url: '/lots/:id',
      handler: lotsService.deleteLotByID,
    },
  ];
  LotsRoutes.forEach((route) => {
    fastify.route(route);
  });
}
module.exports = LotsRouter;
