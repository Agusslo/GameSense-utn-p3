document.addEventListener("DOMContentLoaded", mostrarProductosDashboard);

function mostrarProductosDashboard() {
const productos = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("listadoProductos");
contenedor.innerHTML = "";

productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto-dashboard";
    div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button class="btn-modificar">✏️ Modificar</button>
    <button class="btn-eliminar">❌ Eliminar</button>
    `;
    contenedor.appendChild(div);
});
}
