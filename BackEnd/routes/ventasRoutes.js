import express from 'express';

export default function crearVentaRoutes(controller) {
const router = express.Router();

router.post('/', controller.registrarVentas.bind(controller));
router.get('/', controller.listar.bind(controller));

return router;
}
