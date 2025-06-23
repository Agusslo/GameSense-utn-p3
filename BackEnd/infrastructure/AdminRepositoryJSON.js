import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA = path.resolve(__dirname, '../data/admins.json');

export default class AdminRepositoryJSON {
    async guardarAdmin(admin) {
    const contenido = await fs.readFile(RUTA, 'utf-8').catch(() => '[]');
    const admins = JSON.parse(contenido);
    admins.push(admin);
    await fs.writeFile(RUTA, JSON.stringify(admins, null, 2));
    }

    async existeAdmin(correo) {
    const contenido = await fs.readFile(RUTA, 'utf-8').catch(() => '[]');
    const admins = JSON.parse(contenido);
    return admins.some(a => a.correo === correo);
    }
}
