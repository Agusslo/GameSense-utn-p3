export default class ActualizarProducto {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar(id, datos) {
    if(!id) {
      throw new Error("El ID del producto es requerido para actualizar.");
    }
    return await this.repo.actualizar(id, datos);
  }
}
