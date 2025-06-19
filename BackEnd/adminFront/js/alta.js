document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAlta");
    const preview = document.getElementById("previewImagen");
    const inputArchivo = document.getElementById("imagenArchivo");

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
            Swal.fire({
                title: "Imagen requerida",
                text: "Por favor, seleccioná una imagen.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imagen = e.target.result;

            const nuevoProducto = {
                nombre,
                categoria,
                precio,
                imagen,
                activo: true
            };

            fetch("http://localhost:4000/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al guardar producto.");
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: "¡Producto guardado con éxito!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    form.reset();
                    preview.style.display = "none";
                    setTimeout(() => window.location.href = "dashboard.html", 300);
                });
            })
            .catch(error => {
                console.error("Error al guardar producto:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo guardar el producto.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            });
        };

        reader.readAsDataURL(file);
    });
});
