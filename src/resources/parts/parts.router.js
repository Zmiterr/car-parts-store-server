const partsService = require('./parts.service');

const PartsRoutes = [
  {
    method: 'GET',
    url: '/parts',
    handler: partsService.getAll,
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

module.exports = PartsRoutes;
