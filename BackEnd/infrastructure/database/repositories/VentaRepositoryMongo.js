import VentaModel from '../models/VentaModel.js';

export default class VentaRepositoryMongo {
  async guardarVenta(venta) {
    const nuevaVenta = new VentaModel(venta);
    const guardada = await nuevaVenta.save();
    return guardada.toObject();
  }

  async obtenerVentas() {
    const ventas = await VentaModel.find()
      .populate('productos.producto') 
      .sort({ fecha: -1 });

    return ventas.map(v => v.toObject());
  }
}
