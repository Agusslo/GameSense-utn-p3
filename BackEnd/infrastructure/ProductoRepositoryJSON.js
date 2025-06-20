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

    const nuevoId = productos.length > 0
      ? Math.max(...productos.map(p => p.id || 0)) + 1
      : 1;

    const productoConId = { ...producto, id: nuevoId };
    productos.push(productoConId);

    await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
    return productoConId;
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
