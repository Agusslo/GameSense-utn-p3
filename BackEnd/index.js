import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import VentaRepositoryJSON from './infrastructure/VentaRepositoryJSON.js';
import VentaController from './interfaces/VentaController.js';
import crearVentaRoutes from './routes/ventasRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

const ventaRepo = new VentaRepositoryJSON();
const ventaController = new VentaController(ventaRepo);
app.use('/api/ventas', crearVentaRoutes(ventaController));

// (adminFrontend)
app.use('/admin', express.static(path.join(__dirname, 'adminFront')));

// (FrontEnd)
app.use('/shop', express.static(path.join(__dirname, '../FrontEnd')));

// API
import crearProductoRoutes from './routes/productoRoutes.js';
import ProductoController from './interfaces/ProductoController.js';
import CrearProducto from './application/CrearProducto.js';
import ProductoRepositoryJSON from './infrastructure/ProductoRepositoryJSON.js';

const repo = new ProductoRepositoryJSON('./productos.json');
const usecase = new CrearProducto(repo);
const controller = new ProductoController(usecase);
app.use('/api/productos', crearProductoRoutes(controller));

//ADMIN
import AdminRepositoryJSON from './infrastructure/AdminRepositoryJSON.js';
import AdminController from './interfaces/AdminController.js';
import crearAdminRoutes from './routes/adminRoutes.js';

const adminRepo = new AdminRepositoryJSON();
const adminController = new AdminController(adminRepo);
app.use('/api/admins', crearAdminRoutes(adminController));

// INICIAR SERVIDOR
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/admin/alta.html`);
});
