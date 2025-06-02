document.addEventListener("DOMContentLoaded", mostrarDashboard);

let indexProductoAEliminar = null;

//* LISTAR PRODUCTOS EN DASHBOARD
function mostrarDashboard() {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.forEach((producto, index) => {
        const card = document.createElement("div");
        card.className = "card-producto";

        const estado = producto.activo === false ? "(Inactivo)" : "";

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre} <span style="color:red">${estado}</span></h3>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="modificarProducto(${index})">Modificar</button>
            ${producto.activo !== false ? `<button onclick="confirmarEliminacion(${index})">Eliminar</button>` : ""}
        `;

        contenedor.appendChild(card);
    });
}

//* MODIFICAR PRODUCTO
function modificarProducto(index) {
    localStorage.setItem("modificarIndex", index);
    window.location.href = "alta.html";
}

//* CONFIRMAR ELIMINACIÓN CON MODAL
function confirmarEliminacion(index) {
    indexProductoAEliminar = index;
    document.getElementById("modalConfirmacion").style.display = "block";
}

document.getElementById("btnCancelar").addEventListener("click", () => {
    indexProductoAEliminar = null;
    document.getElementById("modalConfirmacion").style.display = "none";
});

document.getElementById("btnConfirmar").addEventListener("click", () => {
    if (indexProductoAEliminar !== null) {
        bajaLogicaProducto(indexProductoAEliminar);
        indexProductoAEliminar = null;
        document.getElementById("modalConfirmacion").style.display = "none";
        mostrarDashboard();
    }
});

//* BAJA LÓGICA DEL PRODUCTO
function bajaLogicaProducto(index) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos[index];

    if (producto) {
        producto.activo = false;
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    // También podría actualizar el carrito si el producto está allí (opcional)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== producto.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
