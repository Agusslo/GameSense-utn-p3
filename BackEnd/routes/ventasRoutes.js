import express from 'express';

export default function crearVentaRoutes(controller) {
const router = express.Router();

router.post('/', controller.registrarVenta.bind(controller));
router.get('/', controller.listarVentas.bind(controller));

return router;
}
