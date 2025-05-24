document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("formAlta");
const inputImagen = document.getElementById("imagen");
const preview = document.getElementById("previewImagen");

inputImagen.addEventListener("input", () => {
const url = inputImagen.value;
preview.src = url;
preview.style.display = url ? "block" : "none";
});

form.addEventListener("submit", (e) => {
e.preventDefault();

const nombre = document.getElementById("nombre").value.trim();
const categoria = document.getElementById("categoria").value;
const precio = parseFloat(document.getElementById("precio").value);
const imagen = document.getElementById("imagen").value.trim();

if (!nombre || !categoria || !precio || !imagen) {
    alert("Todos los campos son obligatorios.");
    return;
}

const nuevoProducto = {
    id: Date.now(),
    nombre,
    categoria,
    precio,
    imagen,
};

const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
productosGuardados.push(nuevoProducto);
localStorage.setItem("productos", JSON.stringify(productosGuardados));

alert("Producto cargado correctamente.");
form.reset();
preview.src = "";
preview.style.display = "none";
});
});
