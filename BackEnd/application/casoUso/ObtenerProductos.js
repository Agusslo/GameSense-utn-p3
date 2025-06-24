export default class ObtenerProductos {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar() {
    return await this.repo.obtenerTodos();
  }
}
