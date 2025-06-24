import { Router } from 'express';

export default function crearAdminRoutes(controller) {
    const router = Router();
    router.post('/', controller.crear.bind(controller));
    return router;
}
