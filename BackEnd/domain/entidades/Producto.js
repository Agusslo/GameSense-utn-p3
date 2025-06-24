export default class Producto {
  constructor({ id, nombre, categoria, precio, imagen, activo = true }) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
    this.activo = activo;
  }
}