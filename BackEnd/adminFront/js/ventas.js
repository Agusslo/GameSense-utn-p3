let ventasOriginales = [];

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
      const fechaVenta = new Date(v.fecha).toISOString().split('T')[0];
      return fechaVenta === fecha;
    });
  }

  renderizarVentas(filtradas);
}

function renderizarVentas(ventas) {
  const tbody = document.getElementById("tabla-ventas-body");
  tbody.innerHTML = "";

  if (ventas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">No se encontraron ventas.</td></tr>`;
    return;
  }

  ventas.forEach(venta => {
    const fila = document.createElement("tr");

    const productosHTML = venta.productos.map(p => {
      if (!p.producto) return '';
      return `${p.producto.nombre} x${p.cantidad}`;
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
