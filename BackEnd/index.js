import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SERVIR ESTÁTICOS (adminFrontend)
app.use('/admin', express.static(path.join(__dirname, 'adminFront')));

// API (si ya la tenés configurada con rutas)
import crearProductoRoutes from './routes/productoRoutes.js';
import ProductoController from './interfaces/ProductoController.js';
import CrearProducto from './application/CrearProducto.js';
import ProductoRepositoryJSON from './infrastructure/ProductoRepositoryJSON.js';

const repo = new ProductoRepositoryJSON('./productos.json');
const usecase = new CrearProducto(repo);
const controller = new ProductoController(usecase);
app.use('/api/productos', crearProductoRoutes(controller));

// ✅ INICIAR SERVIDOR
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/admin/alta.html`);
});
