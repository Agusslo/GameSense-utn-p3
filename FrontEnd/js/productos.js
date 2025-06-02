document.addEventListener("DOMContentLoaded", mostrarProductos);

if (!localStorage.getItem("nombreUsuario")) {
    window.location.href = "index.html"; 
}

function obtenerTodosLosProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(p => p.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos() {
    const auricularesDiv = document.getElementById("categoria-auriculares");
    const tecladosDiv = document.getElementById("categoria-teclados");

    const productos = obtenerTodosLosProductos().filter(p => p.activo !== false);

    if (productos.length === 0) {
        auricularesDiv.innerHTML = "<p>No hay productos disponibles.</p>";
        tecladosDiv.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card-producto";
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar">Agregar al carrito</button>
        `;

        card.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));

        if (producto.categoria === "auriculares") {
            auricularesDiv.appendChild(card);
        } else {
            tecladosDiv.appendChild(card);
        }
    });
}
