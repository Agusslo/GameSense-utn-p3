export default class Venta {
  constructor({ usuario, productos, total, fecha = new Date().toISOString() }) {
    if (!usuario || !Array.isArray(productos) || productos.length === 0) {
      throw new Error("Venta inválida");
    }
    this.usuario = usuario;
    this.productos = productos;
    this.total = total;
    this.fecha = fecha;
  }
}
