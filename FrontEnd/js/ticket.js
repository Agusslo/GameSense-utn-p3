document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("nombreUsuario") || "Cliente anónimo";
  document.getElementById("nombreUsuarioTicket").innerHTML = "Cliente: <span>" + usuario + "</span>";

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

  const totalBtn = document.getElementById("btn-total");
  const modal = document.getElementById("ticketModal");
  const closeBtn = document.querySelector(".close-ticket");
  const PDFBtn = document.getElementById("btn-pdf");
  const ImprimirBtn = document.getElementById("btn-imprimir");



  totalBtn.addEventListener("click", function () {
    totalBtn.classList.add("loading");

  // Esperar a que termine la animación (2s) y mostrar modal
  setTimeout(() => {
    totalBtn.classList.remove("loading");

    // Mostrar modal
    modal.style.display = "flex";
    document.getElementById("modalNombre").textContent = usuario;
    document.getElementById("modalTotal").textContent = totalTexto.textContent;

  }, 2000);
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  PDFBtn.addEventListener("click", function () {
    const { jsPDF } = window.jspdf; // Esto importa jsPDF desde el namespace global
    const doc = new jsPDF();
    doc.text(`Ticket de Compra`, 10, 10);
    doc.text(`Cliente: ${usuario}`, 10, 20);
    doc.text(`Total: ${totalTexto.textContent}`, 10, 30);

    carrito.forEach((prod, index) => {
      const subtotal = prod.precio * prod.cantidad;
      doc.text(`${index + 1}. ${prod.nombre} - Cantidad: ${prod.cantidad} - Subtotal: $${subtotal}`, 10, 40 + (index * 10));
    });

    doc.save('ticket_compra.pdf');
  });

});
