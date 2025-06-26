import VentaModel from '../models/VentaModel.js';

export default class VentaRepositoryMongo {
  async guardarVenta(ventaEntidad) {
    const ventaDoc = new VentaModel({
      usuario: ventaEntidad.usuario,
      productos: ventaEntidad.productos,
      total: ventaEntidad.total,
      fecha: ventaEntidad.fecha
    });

    const guardada = await ventaDoc.save();
    return guardada.toObject();
  }

  async obtenerVentas() {
    const ventas = await VentaModel.find()
      .populate('productos.producto') 
      .sort({ fecha: -1 });

    return ventas.map(v => v.toObject());
  }
}
