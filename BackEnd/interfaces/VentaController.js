export default class VentaController {
constructor(repo) {
this.repo = repo;
}

async registrarVenta(req, res) {
try {
    const { usuario, productos, total } = req.body;
    const nuevaVenta = {
    usuario,
    productos,
    total,
    fecha: new Date().toISOString()
    };
    await this.repo.guardarVenta(nuevaVenta);
    res.status(201).json({ mensaje: "Venta registrada con éxito" });
} catch (error) {
    res.status(500).json({ error: "Error al registrar venta" });
}
}

async listarVentas(req, res) {
try {
    const ventas = await this.repo.obtenerVentas();
    res.json(ventas);
} catch (e) {
    res.status(500).json({ error: "Error al obtener ventas" });
}
}
}
