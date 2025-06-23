import { Router } from 'express';

export default function crearAdminRoutes(controller) {
  const router = Router();
  router.post('/', controller.crearAdmin.bind(controller));
  return router;
}
