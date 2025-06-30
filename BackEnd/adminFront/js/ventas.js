let ventasOriginales = [];
let ventasMostradas = [];

document.addEventListener("DOMContentLoaded", async () => {
  await cargarVentas();

  document.getElementById("btn-filtrar").addEventListener("click", aplicarFiltros);
});

async function cargarVentas() {
  const tbody = document.getElementById("tabla-ventas-body");

  try {
    const response = await fetch("http://localhost:4000/api/ventas");
    if (!response.ok) throw new Error("Error al obtener ventas");

    ventasOriginales = await response.json();
    renderizarVentas(ventasOriginales);
  } catch (error) {
    console.error("Error al mostrar ventas:", error);
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar ventas</td></tr>`;
  }
}

function aplicarFiltros() {
  const usuario = document.getElementById("filtro-usuario").value.toLowerCase();
  const fecha = document.getElementById("filtro-fecha").value;

  let filtradas = ventasOriginales;

  if (usuario) {
    filtradas = filtradas.filter(v => v.usuario.toLowerCase().includes(usuario));
  }

  if (fecha) {
    filtradas = filtradas.filter(v => {
      const fechaVenta = new Date(v.fecha);
      const year = fechaVenta.getFullYear();
      const month = (fechaVenta.getMonth() + 1).toString().padStart(2, '0');
      const day = fechaVenta.getDate().toString().padStart(2, '0');
      const fechaVentaLocal = `${year}-${month}-${day}`;
      return fechaVentaLocal === fecha;
    });
  }
  renderizarVentas(filtradas);
}

function renderizarVentas(ventas) {
  ventasMostradas = ventas;
  const tbody = document.getElementById("tabla-ventas-body");
  tbody.innerHTML = "";

  if (ventas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">No se encontraron ventas.</td></tr>`;
    return;
  }

  ventas.forEach(venta => {
    const fila = document.createElement("tr");

    const productosHTML = venta.productos.map(p => {
      const nombre = p.producto?.nombre || "Producto sin nombre";
      const cantidad = p.cantidad || 1;
      return `${nombre} x${cantidad}`;
    }).join("<br>");


    fila.innerHTML = `
      <td>${venta.usuario}</td>
      <td>${productosHTML}</td>
      <td>$${venta.total}</td>
      <td>${new Date(venta.fecha).toLocaleString()}</td>
    `;
    tbody.appendChild(fila);
  });
}

document.getElementById("btn-exportar-excel").addEventListener("click", () => {
  if (ventasMostradas.length === 0) {
    alert("No hay ventas para exportar.");
    return;
  }
  
  const data = ventasMostradas.map(v => ({
    Usuario: v.usuario,
    Productos: v.productos.map(p => (p.producto?.nombre || 'N/A') + ' x' + p.cantidad).join(', '),
    Total: v.total,
    Fecha: new Date(v.fecha).toLocaleString()
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");

  // --- INICIO DE LA NUEVA MODIFICACIÓN ---
  const fechaHoy = new Date().toISOString().slice(0, 10);
  let nombreArchivo = "";

  // Comparamos si la cantidad de ventas mostradas es igual a la original.
  if (ventasMostradas.length === ventasOriginales.length) {
    nombreArchivo = `reporte_completo_${fechaHoy}.xlsx`;
  } else {
    nombreArchivo = `ventas_filtradas_${fechaHoy}.xlsx`;
  }

  XLSX.writeFile(workbook, nombreArchivo);
  // --- FIN DE LA NUEVA MODIFICACIÓN ---
});