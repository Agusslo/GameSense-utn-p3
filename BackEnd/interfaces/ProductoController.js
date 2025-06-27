export default class ProductoController {
  constructor({ crearProducto, actualizarProducto, obtenerProductos }) {
    this.crearProducto = crearProducto;
    this.actualizarProducto = actualizarProducto;
    this.obtenerProductos = obtenerProductos;
  }

async crear(req, res) {
  try {
const datosProducto = {
  ...req.body,
  imagen: req.file ? `/uploads/${req.file.filename}` : undefined
};

const producto = await this.crearProducto.ejecutar(datosProducto);
    res.status(201).json(producto);
  } catch (e) {
    res.status(500).json({ error: "Error al guardar producto" });
  }
}


  async actualizar(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = {
        ...req.body,
        imagen: req.file ? `/uploads/${req.file.filename}` : undefined
      };

      const actualizado = await this.actualizarProducto.ejecutar(id, datosActualizados);
      res.json(actualizado);
    } catch (e) {
      console.log(e);
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
  async obtenerPorId(req, res) {
    try {
      const id = req.params.id;
      const producto = await this.obtenerProductos.ejecutar(id);
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (e) {
      res.status(500).json({ error: "Error al obtener producto" });
    }
  }
}
