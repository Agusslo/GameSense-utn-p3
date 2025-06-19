import fs from 'fs/promises';

export default class ProductoRepositoryJSON {
  constructor(path) {
    this.path = path;
  }

  async leer() {
    try {
      const contenido = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(contenido);
    } catch (e) {
      return [];
    }
  }

  async guardar(producto) {
    const productos = await this.leer();
    productos.push(producto);
    await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
    return producto;
  }

  async obtenerTodos() {
    return await this.leer();
  }

  async actualizar(id, datos) {
    const productos = await this.leer();
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...datos };
      await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
      return productos[index];
    }
    throw new Error("Producto no encontrado");
  }
}
    