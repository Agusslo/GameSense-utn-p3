document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const form = document.getElementById("formAlta");
    const preview = document.getElementById("previewImagen");
    const inputArchivo = document.getElementById("imagenArchivo");
    const infoImagenActual = document.getElementById("infoImagenActual");
    const volverBtn = document.getElementById("volver");
    volverBtn.addEventListener("click", () => {
        localStorage.removeItem("modificarIndex");
    });
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
                    document.getElementById("formAlta").dataset.id = productoExistente._id;
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

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const file = inputArchivo.files[0];

    if (!file && !productoExistente) {
        return Swal.fire({
            title: "Imagen requerida",
            text: "Por favor, seleccioná una imagen.",
            icon: "warning",
            confirmButtonText: "OK"
        });
    }

    const url = modificarIndex !== null
        ? `http://localhost:4000/api/productos/${productoExistente._id}`
        : "http://localhost:4000/api/productos";

    const metodo = modificarIndex !== null ? "PUT" : "POST";

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("categoria", categoria);
    formData.append("precio", precio);
    formData.append("activo", true);
    if (file) formData.append("imagen", file);

    fetch(url, {
        method: metodo,
        body: formData
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
            }).then(() => {
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
    });
});
