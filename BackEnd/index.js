import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); 
const MONGO_URI = 'mongodb+srv://axeloy1:Axelote123.@gamersense.6dtperb.mongodb.net/?retryWrites=true&w=majority&appName=Gamersense';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// -------------------- VENTAS --------------------
import VentaController from './interfaces/VentaController.js';
import VentaRepositoryMongo from './infrastructure/database/repositories/VentaRepositoryMongo.js';
import crearVentaRoutes from './routes/ventasRoutes.js';

import RegistrarVentas from './application/casoUso/RegistrarVentas.js';
import ListarVentas from './application/casoUso/ListarVentas.js';

const ventaRepo = new VentaRepositoryMongo();
const ventaController = new VentaController({
  registrarVenta: new RegistrarVentas(ventaRepo),
  listarVentas: new ListarVentas(ventaRepo)
});
app.use('/api/ventas', crearVentaRoutes(ventaController));


// -------------------- ADMIN FRONTEND --------------------
app.use('/admin', express.static(path.join(__dirname, 'adminFront')));

// -------------------- CLIENTE FRONTEND --------------------
app.use('/shop', express.static(path.join(__dirname, '../FrontEnd')));

// -------------------- PRODUCTOS --------------------
import crearProductoRoutes from './routes/productoRoutes.js';
import ProductoController from './interfaces/ProductoController.js';
import ProductoRepositoryMongo from './infrastructure/database/repositories/ProductoRepositoryMongo.js';

import CrearProducto from './application/casoUso/CrearProducto.js';
import ActualizarProducto from './application/casoUso/ActualizarProducto.js';
import ObtenerProductos from './application/casoUso/ObtenerProductos.js';

const productoRepo = new ProductoRepositoryMongo();

const productoController = new ProductoController({
  crearProducto: new CrearProducto(productoRepo),
  actualizarProducto: new ActualizarProducto(productoRepo),
  obtenerProductos: new ObtenerProductos(productoRepo),
});

app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use('/api/productos', crearProductoRoutes(productoController));

// -------------------- ADMIN --------------------
import AdminController from './interfaces/AdminController.js';
import AdminRepositoryMongo from './infrastructure/database/repositories/AdminRepositoryMongo.js';
import crearAdminRoutes from './routes/adminRoutes.js';

import CrearAdmin from './application/casoUso/CrearAdmin.js';

const adminRepo = new AdminRepositoryMongo();
const adminController = new AdminController({
  crearAdmin: new CrearAdmin(adminRepo)
});
app.use('/api/admins', crearAdminRoutes(adminController));


// -------------------- SERVIDOR --------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
