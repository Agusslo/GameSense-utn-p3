import Venta from "../../domain/entidades/Venta.js";

export default class RegistrarVenta {
  constructor(ventaRepo) {
    this.ventaRepo = ventaRepo;
  }

  async ejecutar(datos) {
    const nuevaVenta = new Venta(datos);
    return await this.ventaRepo.guardarVenta(nuevaVenta);
  }
}
