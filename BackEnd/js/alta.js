document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAlta");
    const nombreInput = document.getElementById("nombre");
    const categoriaInput = document.getElementById("categoria");
    const precioInput = document.getElementById("precio");
    const imagenInput = document.getElementById("imagen");
    const preview = document.getElementById("previewImagen");

    const indexModificar = localStorage.getItem("modificarIndex");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    imagenInput.addEventListener("input", () => {
        const url = imagenInput.value.trim();
        if (url) {
            preview.src = url;
            preview.style.display = "block";
        } else {
            preview.style.display = "none";
        }
    });

    if (indexModificar !== null) {
        const producto = productos[indexModificar];
        if (producto) {
            nombreInput.value = producto.nombre;
            categoriaInput.value = producto.categoria;
            precioInput.value = producto.precio;
            imagenInput.value = producto.imagen;
            preview.src = producto.imagen;
            preview.style.display = "block";
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevoProducto = {
            nombre: nombreInput.value.trim(),
            categoria: categoriaInput.value.trim(),
            precio: parseFloat(precioInput.value),
            imagen: imagenInput.value.trim()
        };

        if (indexModificar !== null) {
            productos[indexModificar] = nuevoProducto;
            localStorage.removeItem("modificarIndex");
        } else {
            productos.push(nuevoProducto);
        }

        localStorage.setItem("productos", JSON.stringify(productos));
        window.location.href = "dashboard.html";
    });
});
