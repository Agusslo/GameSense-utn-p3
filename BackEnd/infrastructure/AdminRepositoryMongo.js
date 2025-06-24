import AdminModel from './AdminModel.js';
import bcrypt from 'bcrypt';

export default class AdminRepositoryMongo {
    async guardarAdmin(admin) {
        const hash = await bcrypt.hash(admin.password, 10);
        const nuevo = new AdminModel({ ...admin, password: hash });
        await nuevo.save();
    }

  async existeAdmin(correo) {
    const admin = await AdminModel.findOne({ correo });
    return !!admin; // true si existe, false si no
  }
}
