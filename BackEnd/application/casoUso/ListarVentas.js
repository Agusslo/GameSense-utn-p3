export default class ListarVentas {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar() {
    return await this.repo.obtenerVentas();
  }
}
