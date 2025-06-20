import express from 'express';

export default function crearProductoRoutes(controller) {
  const router = express.Router();
  router.post('/', controller.crear.bind(controller)); // post
  router.put('/:id', controller.actualizar.bind(controller)); //put
  return router;
}
