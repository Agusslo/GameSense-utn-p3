document.addEventListener("DOMContentLoaded", () => {
const usuario = localStorage.getItem("usuario") || "Cliente anónimo";
document.getElementById("nombreUsuarioTicket").textContent = "Cliente: " + usuario;

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const detalle = document.getElementById("detalleTicket");
const totalTexto = document.getElementById("totalTicket");

if (carrito.length === 0) {
    detalle.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
}

let total = 0;
carrito.forEach(prod => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;

    const item = document.createElement("div");
    item.classList.add("ticket-item");
    item.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}" width="50" />
    <span>${prod.nombre}</span>
    <span>Cantidad: ${prod.cantidad}</span>
    <span>Precio Unitario: \$${prod.precio}</span>
    <span>Subtotal: \$${subtotal}</span>
    `;
    detalle.appendChild(item);
});

totalTexto.textContent = "Total Final: $" + total;
});
