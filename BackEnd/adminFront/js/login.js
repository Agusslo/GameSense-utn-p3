document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const mensajeError = document.getElementById("mensajeError");

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena })
    });

    const data = await res.json();

    if (res.status === 200) {
      mensajeError.textContent = "";
      window.location.href = "dashboard.html";
    } else {
      mensajeError.textContent = data.mensaje || "Error en el login";
    }
  } catch (err) {
    mensajeError.textContent = "Error al conectar con el servidor";
  }
});

function autocompletarLogin() {
  document.getElementById("correo").value = "admin@admin.com";
  document.getElementById("contrasena").value = "admin1234";
}

// Mostrar/Ocultar contraseña con ojito
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("togglePassword");
  const input = document.getElementById("contrasena");

  if (toggle && input) {
    toggle.addEventListener("click", () => {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggle.classList.toggle("bi-eye");
      toggle.classList.toggle("bi-eye-slash");
    });
  }
});
