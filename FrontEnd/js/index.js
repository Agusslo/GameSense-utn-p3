document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("comenzarBtn");
    const inputNombre = document.getElementById("nombreUsuario");

    btn.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (nombre === "") {
            alert("Por favor ingresá tu nombre para continuar.");
        } else {
            localStorage.setItem("nombreUsuario", nombre);
            window.location.href = "productos.html";
        }
    });
});
