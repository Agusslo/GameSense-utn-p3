<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("nombreUsuario")) {
        window.location.href = "index.html";
    }

    inicializarPaginacion();
});


let productosPorPagina = 5;
let paginaActualAuriculares = 1;
let paginaActualTeclados = 1;
let productosFiltrados = [];
=======
document.addEventListener("DOMContentLoaded", mostrarProductos);

if (!localStorage.getItem("nombreUsuario")) {
    window.location.href = "index.html"; 
}
>>>>>>> b09f83c256d61706e279c9c909b8505f283a3983

function obtenerTodosLosProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

<<<<<<< HEAD
function inicializarPaginacion() {
    productosFiltrados = obtenerTodosLosProductos().filter(p => p.activo !== false);
    mostrarCategoria("auriculares", paginaActualAuriculares);
    mostrarCategoria("teclados", paginaActualTeclados);
}

function mostrarCategoria(categoria, paginaActual) {
    const contenedor = document.getElementById(`categoria-${categoria}`);
    contenedor.innerHTML = "";

    const productosCategoria = productosFiltrados.filter(p => p.categoria === categoria);

    if (productosCategoria.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosCategoria.slice(inicio, fin);

    productosPagina.forEach(producto => {
        const card = document.createElement("div");
        card.className = "card-producto";
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-agregar">Agregar al carrito</button>
        `;
        card.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));
        contenedor.appendChild(card);
    });

    agregarControlesPaginacion(contenedor, categoria, paginaActual, Math.ceil(productosCategoria.length / productosPorPagina));
}

function agregarControlesPaginacion(contenedor, categoria, paginaActual, totalPaginas) {
    const paginacion = document.createElement("nav");
    paginacion.className = "paginacion mt-4";

    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center";

    // Boton anterior
    const liAnterior = document.createElement("li");
    liAnterior.className = `page-item ${paginaActual === 1 ? "disabled" : ""}`;
    liAnterior.innerHTML = `
        <button class="page-link" ${paginaActual === 1 ? "tabindex='-1'" : ""}>
            «
        </button>
    `;
    liAnterior.querySelector("button").addEventListener("click", () => {
        if (categoria === "auriculares") {
            paginaActualAuriculares--;
            mostrarCategoria(categoria, paginaActualAuriculares);
        } else {
            paginaActualTeclados--;
            mostrarCategoria(categoria, paginaActualTeclados);
        }
    });
    ul.appendChild(liAnterior);

    // Pagina actual
    const liPagina = document.createElement("li");
    liPagina.className = "page-item disabled";
    liPagina.innerHTML = `<span class="page-link">Página ${paginaActual} de ${totalPaginas}</span>`;
    ul.appendChild(liPagina);

    // Boton siguiente
    const liSiguiente = document.createElement("li");
    liSiguiente.className = `page-item ${paginaActual === totalPaginas ? "disabled" : ""}`;
    liSiguiente.innerHTML = `
        <button class="page-link" ${paginaActual === totalPaginas ? "tabindex='-1'" : ""}>
            »
        </button>
    `;
    liSiguiente.querySelector("button").addEventListener("click", () => {
        if (categoria === "auriculares") {
            paginaActualAuriculares++;
            mostrarCategoria(categoria, paginaActualAuriculares);
        } else {
            paginaActualTeclados++;
            mostrarCategoria(categoria, paginaActualTeclados);
        }
    });
    ul.appendChild(liSiguiente);

    paginacion.appendChild(ul);
    contenedor.appendChild(paginacion);
}


=======
>>>>>>> b09f83c256d61706e279c9c909b8505f283a3983
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
            <img src="${producto.imagen}" class= "card-img-top" alt="${producto.nombre}">
            <div class="card-body text-center">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button class="btn-outline-primary btn-agregar">Agregar al carrito</button>
            </div>
        `;
        card.querySelector(".btn-agregar").addEventListener("click", () => agregarAlCarrito(producto));


        // Card para carrusel
        const carouselItem = document.createElement("div"); // Creo item para carrusel
        carouselItem.className = `carousel-item ${(producto.categoria === "auriculares" && indexAur === 0) || 
                                                  (producto.categoria === "teclados" && indexTec === 0) ? 'active' : ''}`; // con el active muestra primero el primer item de productos
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
            indexAur++; // le agrego indice asi lo diferencia del primer item
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
            setTimeout(() => {
                card.classList.remove('clicked');
            }, 300); // Remuevo la clase ya que si no el estilo de clicked queda activo, el efecto dura 300ms
        });
    });

    VanillaTilt.init(document.querySelectorAll(".card-producto"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    });
}

