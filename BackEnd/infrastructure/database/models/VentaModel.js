import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  productos: [{ 
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }, // referencia al producto
    cantidad: Number
  }],
  total: Number,
  fecha: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model('Venta', ventaSchema);