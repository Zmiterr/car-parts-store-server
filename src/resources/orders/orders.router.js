const ordersService = require('./orders.service');

async function OrdersRouter(fastify) {
  const OrdersRoutes = [
    {
      method: 'GET',
      url: '/orders',
      handler: ordersService.getAll,
      // handler: async () => 'done!',
    },
    {
      method: 'GET',
      url: '/orders/:id',
      handler: ordersService.getByDealer,
    },
    {
      method: 'GET',
      url: '/customer-orders/:id',
      handler: ordersService.getByCustomer,
    },
    {
      method: 'POST',
      url: '/orders',
      handler: ordersService.createLot,
    },
    {
      method: 'PUT',
      url: '/orders/:id',
      handler: ordersService.updateLotByID,
    },
    {
      method: 'DELETE',
      url: '/orders/:id',
      handler: ordersService.deleteLotByID,
    },
  ];
  OrdersRoutes.forEach((route) => {
    fastify.route(route);
  });
}
module.exports = OrdersRouter;
