document.addEventListener("DOMContentLoaded", mostrarDashboard);

//* LISTAR PRODUCTOS EN DASHBOARD
function mostrarDashboard() {
const contenedor = document.getElementById("lista-productos");
contenedor.innerHTML = "";

const productos = JSON.parse(localStorage.getItem("productos")) || [];

productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Categoría: ${producto.categoria}</p>
    <p>Precio: $${producto.precio}</p>
    <button onclick="modificarProducto(${index})">Modificar</button>
    <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;

    contenedor.appendChild(card);
});
}

//* ELIMINAR PRODUCTO
function eliminarProducto(index) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const productoEliminado = productos[index];

    if (confirm(`¿Eliminar el producto "${productoEliminado.nombre}"?`)) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));

    // lo bortro del carrito si esta
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== productoEliminado.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarDashboard();
    }
}


//* MODIFICAR PRODUCTO
function modificarProducto(index) {
localStorage.setItem("modificarIndex", index);
window.location.href = "alta.html";
}
