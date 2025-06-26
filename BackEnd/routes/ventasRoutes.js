import { validarVenta } from '../middlewares/validarVenta.js';
import express from 'express';

export default function crearVentaRoutes(controller) {
  const router = express.Router();

  router.post('/', validarVenta, controller.registrarVentas.bind(controller));
  router.get('/', controller.listar.bind(controller));

  return router;
}
