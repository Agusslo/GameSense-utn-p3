import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// -------------------- VENTAS --------------------
import VentaRepositoryJSON from './infrastructure/VentaRepositoryJSON.js';
import VentaController from './interfaces/VentaController.js';
import crearVentaRoutes from './routes/ventasRoutes.js';

const ventaRepo = new VentaRepositoryJSON();
const ventaController = new VentaController(ventaRepo);
app.use('/api/ventas', crearVentaRoutes(ventaController));

// -------------------- ADMIN FRONTEND --------------------
app.use('/admin', express.static(path.join(__dirname, 'adminFront')));

// -------------------- CLIENTE FRONTEND --------------------
app.use('/shop', express.static(path.join(__dirname, '../FrontEnd')));

// -------------------- PRODUCTOS --------------------
import crearProductoRoutes from './routes/productoRoutes.js';
import ProductoController from './interfaces/ProductoController.js';
import CrearProducto from './application/CrearProducto.js';
import ProductoRepositoryMongo from './infrastructure/ProductoRepositoryMongo.js';

const MONGO_URI = 'mongodb://localhost:27017/miapp';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const repo = new ProductoRepositoryMongo();
const usecase = new CrearProducto(repo);
const controller = new ProductoController(usecase);
app.use('/api/productos', crearProductoRoutes(controller));

// -------------------- ADMIN --------------------
import AdminRepositoryJSON from './infrastructure/AdminRepositoryJSON.js';
import AdminController from './interfaces/AdminController.js';
import crearAdminRoutes from './routes/adminRoutes.js';

const adminRepo = new AdminRepositoryJSON();
const adminController = new AdminController(adminRepo);
app.use('/api/admins', crearAdminRoutes(adminController));

// -------------------- SERVIDOR --------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/admin/alta.html`);
});
