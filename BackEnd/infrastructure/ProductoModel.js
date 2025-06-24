import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  activo: { type: Boolean, default: true }
}, { versionKey: false });

export default mongoose.model('Producto', productoSchema);
