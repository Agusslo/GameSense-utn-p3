import express from 'express';

export default function crearProductoRoutes(controller) {
  const router = express.Router();
  router.post('/', controller.crear.bind(controller));
  return router;
}
