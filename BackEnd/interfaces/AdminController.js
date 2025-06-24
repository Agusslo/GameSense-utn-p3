export default class AdminController {
  constructor({ crearAdmin }) {
    this.crearAdmin = crearAdmin;
  }

  async crear(req, res) {
    try {
      await this.crearAdmin.ejecutar(req.body);
      res.status(201).json({ mensaje: 'Admin creado correctamente' });
    } catch (e) {
      if (e.message === 'Faltan campos') {
        res.status(400).json({ mensaje: e.message });
      } else if (e.message === 'El admin ya existe') {
        res.status(409).json({ mensaje: e.message });
      } else {
        res.status(500).json({ error: 'Error al crear admin' });
      }
    }
  }
}
