export default class ActualizarProducto {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar(id, datos) {
    return await this.repo.actualizar(id, datos);
  }
}
