document.addEventListener("DOMContentLoaded", mostrarProductos);

if (!localStorage.getItem("nombreUsuario")) {
    window.location.href = "index.html"; 
}

function obtenerTodosLosProductos() {
    return fetch("http://localhost:4000/api/productos") // asegurate que sea el puerto correcto
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener productos");
            return response.json();
        });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(p => p._id === producto._id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function mostrarProductos() {
    const auricularesDiv = document.getElementById("categoria-auriculares");
    const tecladosDiv = document.getElementById("categoria-teclados");
    const carruselAuriculares = document.getElementById("carousel-inner-auriculares");
    const carruselTeclados = document.getElementById("carousel-inner-teclados");

    try {
        const productos = (await obtenerTodosLosProductos()).filter(p => p.activo !== false);

        if (productos.length === 0) {
            auricularesDiv.innerHTML = tecladosDiv.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        let indexAur = 0;
        let indexTec = 0;

        productos.forEach(producto => {
            // Card para grilla
            const card = document.createElement("div");
            card.className = "card-producto";
            card.innerHTML = `
                <img src="${producto.imagen}" class= "card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn-outline-primary btn-agregar">Agregar al carrito</button>
                </div>
            `;
            card.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));

            // Card para carrusel
            const carouselItem = document.createElement("div");
            carouselItem.className = `carousel-item ${(producto.categoria === "auriculares" && indexAur === 0) || 
                                                    (producto.categoria === "teclados" && indexTec === 0) ? 'active' : ''}`;
            carouselItem.innerHTML = `
                <div class="mx-auto card-producto" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <button class="btn-outline-primary btn-agregar">Agregar al carrito</button>
                    </div>
                </div>
            `;
            carouselItem.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));

            if (producto.categoria === "auriculares") {
                auricularesDiv.appendChild(card);
                carruselAuriculares.appendChild(carouselItem);
                indexAur++;
            } else if (producto.categoria === "teclados") {
                tecladosDiv.appendChild(card);
                carruselTeclados.appendChild(carouselItem);
                indexTec++;
            }
        });

        document.querySelectorAll('.card-producto button').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.card-producto');
                card.classList.add('clicked');
                setTimeout(() => card.classList.remove('clicked'), 300);
            });
        });

        VanillaTilt.init(document.querySelectorAll(".card-producto"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    } catch (error) {
        console.error("Error mostrando productos:", error);
        auricularesDiv
    }
}


