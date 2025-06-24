export default class ProductoController {
  constructor({ crearProducto, actualizarProducto, obtenerProductos }) {
    this.crearProducto = crearProducto;
    this.actualizarProducto = actualizarProducto;
    this.obtenerProductos = obtenerProductos;
  }

  async crear(req, res) {
    try {
      const producto = await this.crearProducto.ejecutar(req.body);
      res.status(201).json(producto);
    } catch (e) {
      res.status(500).json({ error: "Error al guardar producto" });
    }
  }

  async actualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const actualizado = await this.actualizarProducto.ejecutar(id, req.body);
      res.json(actualizado);
    } catch (e) {
      res.status(500).json({ error: "Error al actualizar producto" });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const productos = await this.obtenerProductos.ejecutar();
      res.json(productos);
    } catch (e) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
  }
}
