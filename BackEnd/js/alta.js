document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAlta");
    const preview = document.getElementById("previewImagen");
    const inputArchivo = document.getElementById("imagenArchivo");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const indexModificar = localStorage.getItem("modificarIndex");

    // Precargar datos si se está modificando (ignorado si se usa solo para alta)
    if (indexModificar !== null) {
        const producto = productos[indexModificar];
        if (producto) {
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("categoria").value = producto.categoria;
            document.getElementById("precio").value = producto.precio;

            preview.src = producto.imagen;
            preview.style.display = "block";
        }
    }

    // Vista previa
    inputArchivo.addEventListener("change", () => {
        const file = inputArchivo.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            preview.style.display = "none";
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoria").value;
        const precio = parseFloat(document.getElementById("precio").value);
        const file = inputArchivo.files[0];

        if (!file) {
            alert("Por favor, seleccioná una imagen.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imagen = e.target.result;

            const nuevoProducto = {
                id: indexModificar !== null ? productos[indexModificar].id : Date.now(),
                nombre,
                categoria,
                precio,
                imagen,
                activo: indexModificar !== null ? productos[indexModificar].activo : true
            };

            if (indexModificar !== null) {
                productos[indexModificar] = nuevoProducto;

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                carrito = carrito.map(prod =>
                    prod.id === nuevoProducto.id ? { ...prod, ...nuevoProducto } : prod
                );
                localStorage.setItem("carrito", JSON.stringify(carrito));
                localStorage.removeItem("modificarIndex");
            } else {
                productos.push(nuevoProducto);
            }

            localStorage.setItem("productos", JSON.stringify(productos));
            alert("Producto guardado con éxito");
            form.reset();
            preview.style.display = "none";
            window.location.href = "dashboard.html";
        };

        reader.readAsDataURL(file);
    });
});
