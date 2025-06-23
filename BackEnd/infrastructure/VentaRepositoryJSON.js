import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RUTA_ARCHIVO = path.resolve(__dirname, '../data/ventas.json');

export default class VentaRepositoryJSON {
    constructor() {
    if (!fs.existsSync(RUTA_ARCHIVO)) {
        fs.writeFileSync(RUTA_ARCHIVO, '[]');
    }
    }

    async guardarVenta(venta) {
    const ventas = JSON.parse(fs.readFileSync(RUTA_ARCHIVO));
    ventas.push(venta);
    fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(ventas, null, 2));
    }

    async obtenerVentas() {
    return JSON.parse(fs.readFileSync(RUTA_ARCHIVO));
    }
}
