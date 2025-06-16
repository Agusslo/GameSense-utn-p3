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
  const modalConf = document.getElementById("confModal");
  const closeBtn = document.querySelector(".close-ticket");
  const PDFBtn = document.getElementById("btn-pdf");
  const ImprimirBtn = document.getElementById("btn-imprimir");
  const btnConfOk = document.getElementById("btn-conf-ok");
  const btnConfCancelar = document.getElementById("btn-conf-cancel");
  const btnMostrar = document.getElementById("btn-mostrar");
  const modalMostrar = document.getElementById("modalMostrarPDF");
  const btnMostrarClose = document.getElementById("btn-mostrar-close");
  const canvas = document.getElementById("pdfCanvas");

  totalBtn.addEventListener("click", function () {
    totalBtn.classList.add("loading");
    setTimeout(() => {
      totalBtn.classList.remove("loading");
      totalBtn.textContent = "✅";
      modalConf.style.display = "flex";
      btnConfOk.addEventListener("click", function () {
          modalConf.style.display = "none";
            
          document.getElementById("modalNombre").textContent = usuario;
          document.getElementById("modalTotal").textContent = totalTexto.textContent;
          modal.style.display = "flex";
      });
      btnConfCancelar.addEventListener("click", function () {
        modalConf.style.display = "none";
      });
      setTimeout(() => {
        totalBtn.textContent = "Finalizar compra";
      }, 2000);
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

  function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Ticket de Compra`, 10, 10);
    doc.text(`Cliente: ${usuario}`, 10, 20);
    doc.text(`Total: ${totalTexto.textContent}`, 10, 30);

    carrito.forEach((prod, index) => {
      const subtotal = prod.precio * prod.cantidad;
      doc.text(`${index + 1}. ${prod.nombre} - Cantidad: ${prod.cantidad} - Subtotal: $${subtotal}`, 10, 40 + (index * 10));
    });

    return doc;
  }

  PDFBtn.addEventListener("click", function () {
    const doc = generarPDF();
    doc.save('ticket_compra.pdf');
  });


  btnMostrar.addEventListener("click", async () => {
    const doc = generarPDF();
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);

    const context = canvas.getContext("2d");
    const viewport = page.getViewport({ scale: 1.5 });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;

    modalMostrar.style.display = "flex";

    btnMostrarClose.onclick = () => {
      modalMostrar.style.display = "none";
      URL.revokeObjectURL(pdfUrl);
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  });
    // Imprimir el PDF y luego redirigir
  ImprimirBtn.addEventListener("click", function () {
    const doc = generarPDF();
    const pdfBlob = doc.output("blob");   // Convierto PDF en formato Blob (archivo en memoria)
    const pdfUrl = URL.createObjectURL(pdfBlob);   // URL temporal que apunta al Blob para poder cargarlo en un iframe
    const iframe = document.createElement("iframe");   // iframe oculto que uso para cargar el PDF y mandar a imprimir
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);   // iframe al body para que se cargue en el DOM


    iframe.onload = function () {   // Cuando haya terminado de cargar el PDF
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Esperar un tiempo razonable antes de redirigir (por ejemplo 3 segundos)
      setTimeout(() => {
        document.body.removeChild(iframe);
        URL.revokeObjectURL(pdfUrl); // Limpio recursos
        window.location.href = "index.html"; // Redirigir después de imprimir
      }, 5000); // En este caso es un timeout, en un caso real imprimiria un ticket en la maquina y no haria falta un timeout
      // y no se usaria un iframe
    };
  });


});
