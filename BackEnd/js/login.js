document.getElementById("loginForm").addEventListener("submit", function(e) {
e.preventDefault();

const correo = document.getElementById("correo").value;
const contrasena = document.getElementById("contrasena").value;
const mensajeError = document.getElementById("mensajeError");

if (correo.endsWith("@admin.com") && contrasena === "1234") {
    mensajeError.textContent = "";
    window.location.href = "dashboard.html";
} else {
    mensajeError.textContent = "Correo o contraseña incorrectos";
}
});
