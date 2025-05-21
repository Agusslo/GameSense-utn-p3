const productos = [
{
    id: 1,
    nombre: "Auriculares Bluetooth",
    categoria: "auriculares",
    precio: 45000,
    imagen: "./img/AuriUno.png"
},
{
    id: 2,
    nombre: "Auriculares Gamer Pro",
    categoria: "auriculares",
    precio: 30000,
    imagen: "./img/AuriDos.png"
},
{
    id: 3,
    nombre: "Teclado Mecánico RGB",
    categoria: "teclados",
    precio: 55000,
    imagen: "./img/TecladoUno.png"
},
{
    id: 4,
    nombre: "Teclado Membrana",
    categoria: "teclados",
    precio: 32000,
    imagen: "./img/TecladoDos.png"
}
];

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

productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button class="btn-agregar">Agregar al carrito</button>
    `;

    const botonAgregar = card.querySelector(".btn-agregar");
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));

    if (producto.categoria === "auriculares") {
    auricularesDiv.appendChild(card);
    } else {
    tecladosDiv.appendChild(card);
    }
});
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
