import Producto from '../../domain/entidades/Producto.js';

export default class CrearProducto {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar(datos) {
    const nuevo = new Producto({
      ...datos
    });

    return await this.repo.guardar(nuevo);
  }
}
