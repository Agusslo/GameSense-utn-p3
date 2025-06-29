document.addEventListener("DOMContentLoaded", cargarProductos);

if (!localStorage.getItem("nombreUsuario")) {
    window.location.href = "index.html"; 
}

// Variables de estado por categoría
let productosAuriculares = [];
let productosTeclados = [];

let paginaAuriculares = 1;
let paginaTeclados = 1;

const limitePorPagina = 3;

function obtenerTodosLosProductos() {
    return fetch("http://localhost:4000/api/productos")
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

async function cargarProductos() {
    try {
        const productos = await obtenerTodosLosProductos();
        const activos = productos.filter(p => p.activo !== false);

        productosAuriculares = activos.filter(p => p.categoria === "auriculares");
        productosTeclados = activos.filter(p => p.categoria === "teclados");

        mostrarProductos("auriculares", paginaAuriculares);
        mostrarProductos("teclados", paginaTeclados);
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

function mostrarProductos(categoria, pagina) {
    const div = document.getElementById(`categoria-${categoria}`);
    const carrusel = document.getElementById(`carousel-inner-${categoria}`);
    const spanPagina = document.getElementById(`pagina-actual-${categoria}`);

    // Limpiar
    div.innerHTML = '';
    carrusel.innerHTML = '';

    const productos = categoria === "auriculares" ? productosAuriculares : productosTeclados;
    const inicio = (pagina - 1) * limitePorPagina;
    const productosPagina = productos.slice(inicio, inicio + limitePorPagina);

    spanPagina.textContent = pagina;

    let index = 0;

    productosPagina.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card-producto";
        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body text-center">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button class="btn-outline-primary btn-agregar">Agregar al carrito</button>
            </div>
        `;
        card.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));

        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
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

        div.appendChild(card);
        carrusel.appendChild(carouselItem);
        index++;
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
}

// Botones de paginacion
document.getElementById("btn-anterior-auriculares").addEventListener("click", () => {
    if (paginaAuriculares > 1) {
        paginaAuriculares--;
        mostrarProductos("auriculares", paginaAuriculares);
    }
});

document.getElementById("btn-siguiente-auriculares").addEventListener("click", () => {
    const total = Math.ceil(productosAuriculares.length / limitePorPagina);
    if (paginaAuriculares < total) {
        paginaAuriculares++;
        mostrarProductos("auriculares", paginaAuriculares);
    }
});

document.getElementById("btn-anterior-teclados").addEventListener("click", () => {
    if (paginaTeclados > 1) {
        paginaTeclados--;
        mostrarProductos("teclados", paginaTeclados);
    }
});

document.getElementById("btn-siguiente-teclados").addEventListener("click", () => {
    const total = Math.ceil(productosTeclados.length / limitePorPagina);
    if (paginaTeclados < total) {
        paginaTeclados++;
        mostrarProductos("teclados", paginaTeclados);
    }
});
