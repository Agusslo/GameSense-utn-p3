# 🎮 GameSense

**GameSense** es una aplicación de autoservicio que simula un sistema de compra de productos tecnológicos, pensada para ser intuitiva, rápida y flexible. Combina un frontend orientado al usuario final con un backend robusto para la gestión de productos y ventas por parte de un administrador.

---

## 🚀 Objetivo del Proyecto

- Permitir a un usuario seleccionar productos (auriculares o teclados), agregarlos a un carrito y generar un ticket final de compra.
- Ofrecer a un administrador un panel privado para crear, editar, activar/desactivar productos y ver las ventas realizadas.
- Simular el flujo real de una compra en un kiosco o terminal autoservicio.

---

## 💡 ¿Cómo iniciar el proyecto?
📥 Requisitos previos

Asegurate de tener instalada la versión actual de Node.js:
👉 Descargar Node.js ([versión actual](https://nodejs.org/es/download/current))

1. Abrí una terminal en la carpeta raíz del proyecto.
2. Navegá hasta la carpeta del backend:
   ```bash 
   cd backend
   node app.js
3. Accedé a la pagina web desde:
    ```bash
    http://localhost:4000

---
## 🛠️ Tecnologías Utilizadas

### 🔹 Frontend
- HTML5 + CSS3
- JavaScript Vanilla
- Bootstrap 5 (layout y componentes)
- LocalStorage para persistir carrito
- Paginación por categoría
- Modal de confirmación para volver al inicio
- Generación de tickets de compra con nombre de cliente y total

### 🔹 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Arquitectura MVC (Model-View-Controller)
- CRUD completo de productos y usuarios
- Registro de ventas
- Conexión remota con MongoDB Atlas

---

## 🧠 Lógica de Funcionamiento

### 📲 Cliente (Frontend)
- `index.html`: pantalla de entrada con ingreso de nombre del cliente.
- `productos.html`: muestra los productos por categoría con paginación. Cada producto tiene su imagen, nombre, precio y botón de agregar al carrito.
- `carrito.jsl`: gestiona la lógica de agregar, eliminar y persistir productos en el carrito (usando LocalStorage).
- `ticket.html`: vista final con resumen del carrito, nombre del cliente, total y opciones para finalizar o reiniciar la compra.
- Al finalizar, se genera una venta en el backend mediante POST /ventas, lo que permite al administrador visualizarla en su panel.

### 📅 Administrador (Backend)
- Login con acceso predefinido (`admin@admin.com`).
- Funciones disponibles:
  - Alta de productos
  - Edición
  - Eliminación lógica (activo: false)
  - Reactivación desde la vista admin
  - Visualización de ventas

### 🔧 Estructura del backend
- `/routes`: rutas REST para `productos`, `admin`, `login`,  y `ventas`
- `/controllers`: lógica y validaciones
- `/models`: esquemas Mongoose para `Producto`, `Venta` y `Admin`
- `/repositories`: acceso directo a datos (MongoDB)
- `/usecases`: manejo de la lógica de negocio
- `/views`: panel admin (login, dashboard)

---

## 🔢 Flujo General

1. El cliente entra al sistema, ingresa su nombre.
2. Explora los productos filtrados por categoría.
3. Agrega productos al carrito (persisten en LocalStorage).
4. Finaliza la compra generando un ticket y creando la venta.
5. El administrador accede al panel privado para gestionar el stock y revisar ventas.

---

## 💪 Características Destacadas

| Característica           | Descripción                                                                           |
|--------------------------|---------------------------------------------------------------------------------------|
| Paginación               | Navegación fluida entre productos de cada categoría.                                 |
| Carrito persistente      | Se guarda incluso si el usuario recarga la página o cambia de sección.              |
| Panel admin              | CRUD completo con Bootstrap + CSS.                                                  |
| Validaciones amigables   | Se evita comprar sin productos o sin nombre.                                        |  
| Ticket final             | Muestra nombre del cliente, productos y total, con opción de reiniciar la sesión.   |

---

## 📍 Autoría

Proyecto desarrollado por **Agustín López** y **Axel Cannavina**, como entrega final para la materia **Programación 3** (UTN-FRA).

---

**Gracias por visitar GameSense!**
