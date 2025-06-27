document.getElementById("registroForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (!correo.endsWith("@admin.com")) {
    mensaje.innerHTML = `<span class="text-danger">El correo debe terminar en @admin.com</span>`;
    return;
    }

    try {
    const res = await fetch("http://localhost:4000/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
    });

    const data = await res.json();

    if (res.status === 201) {
        mensaje.innerHTML = `<span class="text-success">${data.mensaje}</span>`;
        document.getElementById("registroForm").reset();
    } else {
        mensaje.innerHTML = `<span class="text-danger">${data.mensaje || data.error}</span>`;
    }
    } catch (err) {
    mensaje.innerHTML = `<span class="text-danger">Error al conectar con el servidor</span>`;
    }
});

const toggle = document.getElementById("togglePassword");
const input = document.getElementById("contrasena");

toggle.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    toggle.classList.toggle("bi-eye");
    toggle.classList.toggle("bi-eye-slash");
});
