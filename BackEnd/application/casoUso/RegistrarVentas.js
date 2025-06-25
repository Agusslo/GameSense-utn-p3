export default class RegistrarVenta {
  constructor(repo) {
    this.repo = repo;
  }

  async ejecutar({ usuario, productos, total }) {
    const venta = {
      usuario,
      productos: productos.map(p => ({
        producto: p.id,
        cantidad: p.cantidad
      })),
      total,
      fecha: new Date().toISOString()
    };
    return await this.repo.guardarVenta(venta);
  }
}
