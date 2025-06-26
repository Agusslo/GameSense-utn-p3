export default class Producto {
  constructor({ nombre, categoria, precio, imagen, activo = true }) {
    if (!nombre) throw new Error('Nombre inválido');
    if (precio < 0) throw new Error('El precio no puede ser negativo');
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
    this.activo = activo;
  }
}
