document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const form = document.getElementById("formAlta");
    const preview = document.getElementById("previewImagen");
    const inputArchivo = document.getElementById("imagenArchivo");
    const infoImagenActual = document.getElementById("infoImagenActual");

    // Verificar si hay un index guardado en localStorage, si es así, estamos en modo modificación
    const modificarIndex = localStorage.getItem("modificarIndex");
    let productoExistente = null;

    // Si hay un index guardado, estamos en modo modificación
    if (modificarIndex !== null) {
        fetch("http://localhost:4000/api/productos")
            .then(res => res.json())
            .then(productos => {
                productoExistente = productos[modificarIndex];
                if (productoExistente) {
                    // Rellenar los campos del formulario
                    document.getElementById("nombre").value = productoExistente.nombre;
                    document.getElementById("categoria").value = productoExistente.categoria;
                    document.getElementById("precio").value = productoExistente.precio;
                    preview.src = productoExistente.imagen;
                    preview.style.display = "block";
                    infoImagenActual.style.display = "block"; // Mostrar info de imagen actual
                }
            });
    }

    // Mostrar vista previa cuando el usuario selecciona una imagen
    inputArchivo.addEventListener("change", () => {
        const file = inputArchivo.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);
            infoImagenActual.style.display = "none"; // ocultar info si cargó una nueva
        } else {
            preview.style.display = "none";
        }
    });
 
    // Manejar el envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar campos
        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoria").value;
        const precio = parseFloat(document.getElementById("precio").value);
        const file = inputArchivo.files[0];

        // Funcion para enviar el producto al servidor
        const procesarProducto = (imagen) => {
            const producto = {
                nombre,
                categoria,
                precio,
                imagen,
                activo: true
            };

            // Definir URL y método HTTP según si se está modificando o creando
            const url = modificarIndex !== null
                ? `http://localhost:4000/api/productos/${productoExistente.id}`
                : "http://localhost:4000/api/productos";

            const metodo = modificarIndex !== null ? "PUT" : "POST"; // Si es modificación, usar PUT, si es alta, usar POST

            fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Error al guardar/modificar producto.");
                    return response.json();
                })
                .then(() => {
                    Swal.fire({
                        title: modificarIndex !== null ? "¡Producto modificado!" : "¡Producto guardado!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => { // Volver al dashboard después de guardar
                        localStorage.removeItem("modificarIndex"); 
                        form.reset();
                        preview.style.display = "none";
                        infoImagenActual.style.display = "none";
                        setTimeout(() => window.location.href = "dashboard.html", 300);
                    });
                })
                .catch(error => {
                    console.error("Error:", error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo guardar/modificar el producto.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                });
        };
        // Validar imagen: si hay una nueva, usarla; si no y hay imagen previa, reutilizarla; si no hay nada, error
        if (file) { // Si se seleccionó una nueva imagen
            const reader = new FileReader();
            reader.onload = (e) => procesarProducto(e.target.result);
            reader.readAsDataURL(file);
        } else if (productoExistente) {
            // Si no se cambió la imagen, usar la anterior
            procesarProducto(productoExistente.imagen);
        } else {
            Swal.fire({
                title: "Imagen requerida",
                text: "Por favor, seleccioná una imagen.",
                icon: "warning",
                confirmButtonText: "OK"
            });
        }
    });
});
