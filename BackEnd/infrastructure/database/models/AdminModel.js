import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
}, { versionKey: false });

export default mongoose.model('Admin', adminSchema);
