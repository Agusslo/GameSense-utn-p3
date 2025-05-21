document.addEventListener("DOMContentLoaded", () => {
mostrarCarrito();
});

function mostrarCarrito() {
const contenedor = document.getElementById("carrito-contenedor");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

contenedor.innerHTML = "";

if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    return;
}

carrito.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <p>Cantidad: 
        <button class="btn-menos" data-id="${producto.id}">➖</button>
        <span>${producto.cantidad}</span>
        <button class="btn-mas" data-id="${producto.id}">➕</button> 
    </p>
    `;
    contenedor.appendChild(card);
});

// Eventos ➕ y ➖
document.querySelectorAll(".btn-mas").forEach(btn => {
    btn.addEventListener("click", (e) => {
    modificarCantidad(parseInt(e.target.dataset.id), 1);
    });
});

document.querySelectorAll(".btn-menos").forEach(btn => {
    btn.addEventListener("click", (e) => {
    modificarCantidad(parseInt(e.target.dataset.id), -1);
    });
});
}

function modificarCantidad(idProducto, cambio) {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const index = carrito.findIndex(p => p.id === idProducto);
if (index !== -1) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Refrescar la vista
}
}
