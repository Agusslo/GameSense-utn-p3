document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAlta");
    const preview = document.getElementById("previewImagen");
    const inputImagen = document.getElementById("imagen");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const indexModificar = localStorage.getItem("modificarIndex");

    // Precargar datos si se está modificando
    if (indexModificar !== null) {
        const producto = productos[indexModificar];
        if (producto) {
            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("categoria").value = producto.categoria;
            document.getElementById("precio").value = producto.precio;
            document.getElementById("imagen").value = producto.imagen;
            preview.src = producto.imagen;
            preview.style.display = "block";

            // Mostrar alerta visual si se está editando
            const alerta = document.getElementById("alertaModificacion");
            if (alerta) {
                alerta.innerHTML = `Estás modificando el producto: <strong>${producto.nombre}</strong>`;
                alerta.style.display = "block";
            }
        }
    }

    inputImagen.addEventListener("input", () => {
        preview.src = inputImagen.value;
        preview.style.display = inputImagen.value ? "block" : "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoria").value;
        const precio = parseFloat(document.getElementById("precio").value);
        const imagen = document.getElementById("imagen").value;

        const nuevoProducto = {
            id: indexModificar !== null ? productos[indexModificar].id : Date.now(),
            nombre,
            categoria,
            precio,
            imagen,
            activo: true // por defecto
        };

        if (indexModificar !== null) {
            const productoViejo = productos[indexModificar];
            nuevoProducto.activo = productoViejo.activo ?? true; // mantener estado anterior
            productos[indexModificar] = nuevoProducto;

            // Actualizar en el carrito si existe
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito = carrito.map(prod =>
                prod.id === productoViejo.id ? { ...prod, ...nuevoProducto } : prod
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
    });
});
