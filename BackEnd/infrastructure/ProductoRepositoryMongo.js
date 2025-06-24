import ProductoModel from './ProductoModel.js';

export default class ProductoRepositoryMongo {
  async guardar(producto) {
    const nuevo = new ProductoModel(producto);
    const resultado = await nuevo.save();
    return resultado.toObject();
  }

  async obtenerTodos() {
    const productos = await ProductoModel.find();
    return productos.map(p => p.toObject());
  }

  async actualizar(id, datos) {
    const actualizado = await ProductoModel.findByIdAndUpdate(id, datos, { new: true });
    if (!actualizado) throw new Error('Producto no encontrado');
    return actualizado.toObject();
  }
}
