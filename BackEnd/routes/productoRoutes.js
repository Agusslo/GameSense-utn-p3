import express from 'express';
import upload from '../infrastructure/config/multerConfig.js';
import { validarProducto } from '../middlewares/validarProducto.js';

export default function crearProductoRoutes(controller) {
  const router = express.Router();

  router.post('/', upload.single('imagen'), validarProducto, controller.crear.bind(controller));
  router.put('/:id', validarProducto, controller.actualizar.bind(controller));
  router.get('/', controller.obtenerTodos.bind(controller));
  router.get('/:id', controller.obtenerPorId.bind(controller));

  return router;
}
