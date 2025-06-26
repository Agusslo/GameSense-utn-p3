import bcrypt from 'bcrypt';

export default class LoginController {
  constructor(adminRepo) {
    this.adminRepo = adminRepo;
  }

  async ingresar(req, res) {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json({ mensaje: 'Faltan campos' });
    }

    const admin = await this.adminRepo.buscarPorCorreo(correo);
    if (!admin) {
      return res.status(401).json({ mensaje: 'Admin no encontrado' });
    }

    const esValida = await bcrypt.compare(contrasena, admin.contrasena);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({ mensaje: 'Login exitoso' });
  }
}
