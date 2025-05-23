document.getElementById("formAlta").addEventListener("submit", function (e) {
e.preventDefault();

const nombre = document.getElementById("nombre").value.trim();
const categoria = document.getElementById("categoria").value;
const precio = parseFloat(document.getElementById("precio").value);
const cantidad = parseInt(document.getElementById("cantidad").value);
const imagen = document.getElementById("imagen").value.trim();


if (!nombre || !categoria || isNaN(precio) || !imagen) {
    alert("Todos los campos son obligatorios.");
    return;
}

const nuevoProducto = {
    id: Date.now(),
    nombre,
    categoria,
    precio,
    cantidad,
    imagen
};

const productos = JSON.parse(localStorage.getItem("carrito")) || [];
productos.push(nuevoProducto);
localStorage.setItem("carrito", JSON.stringify(productos));

alert("✅ Producto cargado correctamente");
document.getElementById("formAlta").reset();
});
