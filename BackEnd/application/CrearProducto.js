import Producto from '../domain/Producto.js';

export default class CrearProducto {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar(datos) {
    const nuevo = new Producto({
      id: Date.now(),
      ...datos
    });

    return await this.repo.guardar(nuevo);
  }
}
