export default class VentaController {
  constructor({ registrarVenta, listarVentas }) {
    this.registrarVenta = registrarVenta;
    this.listarVentas = listarVentas;
  }

  async registrarVentas(req, res) {
    try {
      await this.registrarVenta.ejecutar(req.body);
      res.status(201).json({ mensaje: "Venta registrada con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar venta" });
    }
  }

  async listar(req, res) {
    try {
      const ventas = await this.listarVentas.ejecutar();
      res.json(ventas);
    } catch (e) {
      res.status(500).json({ error: "Error al obtener ventas" });
    }
  }

  async obtenerVentas(req, res) {
  try {
    const ventas = await this.ventaRepository.obtenerTodas();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
}


}
