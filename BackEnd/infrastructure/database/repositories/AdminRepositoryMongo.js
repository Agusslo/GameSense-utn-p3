import AdminModel from '../models/AdminModel.js';
import bcrypt from 'bcrypt';

export default class AdminRepositoryMongo {
    async guardarAdmin(admin) {
        const nuevo = new AdminModel(admin);
        await nuevo.save();
    }

  async existeAdmin(correo) {
    const admin = await AdminModel.findOne({ correo });
    return !!admin; // true si existe, false si no
  }

  async buscarPorCorreo(correo) {
  return await AdminModel.findOne({ correo });
}

}
