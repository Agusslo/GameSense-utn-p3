import bcrypt from 'bcrypt';

export default class AdminController {
    constructor(repo) {
    this.repo = repo;
  }

    async crearAdmin(req, res) {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Faltan campos' });
    }

    const existe = await this.repo.existeAdmin(correo);
    if (existe) {
        return res.status(409).json({ mensaje: 'El admin ya existe' });
    }

    const hash = await bcrypt.hash(contrasena, 10);
    await this.repo.guardarAdmin({ correo, contrasena: hash });
    res.status(201).json({ mensaje: 'Admin creado correctamente' });
    }
}
