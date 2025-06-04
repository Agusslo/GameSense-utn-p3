document.addEventListener("DOMContentLoaded", mostrarProductos);

if (!localStorage.getItem("nombreUsuario")) {
    window.location.href = "index.html"; 
}

function obtenerTodosLosProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(p => p.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos() {
    const auricularesDiv = document.getElementById("categoria-auriculares");
    const tecladosDiv = document.getElementById("categoria-teclados");
    const carruselAuriculares = document.getElementById("carousel-inner-auriculares");
    const carruselTeclados = document.getElementById("carousel-inner-teclados");

    const productos = obtenerTodosLosProductos().filter(p => p.activo !== false);

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
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar">Agregar al carrito</button>
        `;
        card.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));

        // Card para carrusel
        const carouselItem = document.createElement("div"); // Creo item para carrusel
        carouselItem.className = `carousel-item ${(producto.categoria === "auriculares" && indexAur === 0) || 
                                                  (producto.categoria === "teclados" && indexTec === 0) ? 'active' : ''}`; // con el active muestra primero el primer item de productos
        carouselItem.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary btn-agregar">Agregar al carrito</button>
                </div>
            </div>
        `;
        carouselItem.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));

        if (producto.categoria === "auriculares") {
            auricularesDiv.appendChild(card);
            carruselAuriculares.appendChild(carouselItem);
            indexAur++; // le agrego indice asi lo diferencia del primer item
        } else if (producto.categoria === "teclados") {
            tecladosDiv.appendChild(card);
            carruselTeclados.appendChild(carouselItem);
            indexTec++;
        }
    });
}
