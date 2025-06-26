import { Router } from 'express';
export default function crearLoginRoutes(controller) {
    const router = Router();
    router.post('/', controller.ingresar.bind(controller));
    return router;
}
