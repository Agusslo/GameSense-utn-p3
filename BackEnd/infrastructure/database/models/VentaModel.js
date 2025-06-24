import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
  productos: [{ 
    nombre: String, 
    precio: Number, 
    cantidad: Number 
  }],
  total: Number,
  fecha: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model('Venta', ventaSchema);
