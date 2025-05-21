document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
});

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-contenedor");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
      <p>Cantidad: ${producto.cantidad}</p>
    `;
    contenedor.appendChild(card);
  });
}


