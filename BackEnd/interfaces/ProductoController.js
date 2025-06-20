export default class ProductoController {
  constructor(crearProducto) {
    this.crearProducto = crearProducto;
  }

  async crear(req, res) {
    try {
      const prod = await this.crearProducto.ejecutar(req.body);
      res.status(201).json(prod);
    } catch (e) {
      res.status(500).json({ error: "Error al guardar producto" });
    }
  }
  async actualizar(req, res) { // actualizar productos
    try {
      const id = parseInt(req.params.id);
      const actualizado = await this.crearProducto.repo.actualizar(id, req.body); // usar directamente el repo
      res.json(actualizado);
    } catch (e) {
      res.status(500).json({ error: "Error al actualizar producto" });
    }
}

}
