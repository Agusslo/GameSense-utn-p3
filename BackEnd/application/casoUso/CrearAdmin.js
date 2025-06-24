import bcrypt from 'bcrypt';

export default class CrearAdmin {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar({ correo, contrasena }) {
    if (!correo || !contrasena) {
      throw new Error('Faltan campos');
    }

    const existe = await this.repo.existeAdmin(correo);
    if (existe) {
      throw new Error('El admin ya existe');
    }

    const hash = await bcrypt.hash(contrasena, 10);
    return await this.repo.guardarAdmin({ correo, contrasena: hash });
  }
}
