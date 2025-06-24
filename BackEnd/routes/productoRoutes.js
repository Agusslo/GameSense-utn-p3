import express from 'express';
import upload from '../infrastructure/config/multerConfig.js'; 

export default function crearProductoRoutes(controller) {
  const router = express.Router();

  router.post('/', upload.single('imagen'), controller.crear.bind(controller));
  router.put('/:id', controller.actualizar.bind(controller));
  router.get('/', controller.obtenerTodos.bind(controller));
  router.get('/:id', controller.obtenerPorId.bind(controller));

  return router;
}
