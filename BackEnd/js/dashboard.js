document.addEventListener("DOMContentLoaded", () => {
    mostrarDashboard();
    document.getElementById("btnConfirmar").addEventListener("click", eliminarProductoConfirmado);
    document.getElementById("btnCancelar").addEventListener("click", cerrarModal);
    document.getElementById("confirmarActivar").addEventListener("click", activarProductoConfirmado);
    document.getElementById("cancelarActivar").addEventListener("click", cerrarModalActivar);
});

let productoAEliminarIndex = null;
let productoAActivarIndex = null;

//* LISTAR PRODUCTOS EN DASHBOARD
function mostrarDashboard() {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    const categorias = ["auriculares", "teclados"];

    categorias.forEach(categoria => {
        const productosCategoria = productos.filter(p => p.categoria === categoria);
        if (productosCategoria.length > 0) {
            const seccion = document.createElement("section");
            seccion.className = "seccion-categoria";

            const titulo = document.createElement("h3");
            titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            seccion.appendChild(titulo);

            const grilla = document.createElement("div");
            grilla.className = "grilla-categoria";

            productosCategoria.forEach(prod => {
                grilla.appendChild(crearCardProducto(prod, productos.indexOf(prod)));
            });

            seccion.appendChild(grilla);
            contenedor.appendChild(seccion);
        }
    });
}

function crearCardProducto(producto, index) {
    const card = document.createElement("div");
    card.className = "card-producto";

    const esInactivo = producto.activo === false;

    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre} ${esInactivo ? "(Inactivo)" : ""}</h3>
        <p>Categoría: ${producto.categoria}</p>
        <p>Precio: $${producto.precio}</p>
        <button onclick="modificarProducto(${index})" ${esInactivo ? "disabled" : ""}>Modificar</button>
        <button onclick="mostrarModal(${index})" ${esInactivo ? "disabled" : ""}>Eliminar</button>
        ${esInactivo ? `<button onclick="mostrarModalActivar(${index})">Activar</button>` : ""}
    `;

    return card;
}


//* MODIFICAR PRODUCTO
function modificarProducto(index) {
    localStorage.setItem("modificarIndex", index);
    window.location.href = "alta.html";
}



//* MOSTRAR MODAL DE ELIMINACIÓN
function mostrarModal(index) {
    productoAEliminarIndex = index;

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos[index];

    const modal = document.getElementById("modalConfirmacion");
    const mensaje = document.getElementById("mensajeConfirmacion");
    mensaje.textContent = `¿Eliminar el producto "${producto.nombre}"?`;

    modal.style.display = "block";
}

//* CONFIRMAR ELIMINACIÓN
function eliminarProductoConfirmado() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos[productoAEliminarIndex];

    // Baja lógica
    producto.activo = false;
    productos[productoAEliminarIndex] = producto;
    localStorage.setItem("productos", JSON.stringify(productos));

    // Sacarlo del carrito si esta en el
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== producto.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    cerrarModal();
    mostrarDashboard();
}

//* CANCELAR MODAL DE ELIMINACIÓN
function cerrarModal() {
    document.getElementById("modalConfirmacion").style.display = "none";
    productoAEliminarIndex = null;
}

//* MOSTRAR MODAL DE ACTIVACIÓN
function mostrarModalActivar(index) {
    productoAActivarIndex = index;

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos[index];

    const modal = document.getElementById("modalActivar");
    const texto = document.getElementById("textModalActivar");
    texto.textContent = `¿Seguro que querés activar el producto "${producto.nombre}"?`;

    modal.style.display = "block";
}

//* CONFIRMAR ACTIVACIÓN
function activarProductoConfirmado() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos[productoAActivarIndex];

    producto.activo = true;
    productos[productoAActivarIndex] = producto;
    localStorage.setItem("productos", JSON.stringify(productos));

    cerrarModalActivar();
    mostrarDashboard(); // Actualizar la lista de productos
}

//* CANCELAR MODAL DE ACTIVACIÓN
function cerrarModalActivar() {
    document.getElementById("modalActivar").style.display = "none";
    productoAActivarIndex = null;
}
