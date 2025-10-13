// Array de productos con sus propiedades: id, nombre, precio e imagen
const productos = [
  { id: 1, nombre: "Reloj Classic", precio: 150, img: "./images/reloj_classic.jpg" },
  { id: 2, nombre: "Reloj Modern", precio: 180, img: "./images/reloj_modern.jpg" },
  { id: 3, nombre: "Reloj Sport", precio: 120, img: "./images/reloj_sport.jpg" },
  { id: 4, nombre: "Reloj Elegance", precio: 210, img: "./images/reloj_elegance.jpg" }
];

// Array que almacenará los productos agregados al carrito
let carrito = [];

// Obtener el contenedor donde se mostrarán los productos
const listaProductos = document.getElementById("lista-productos");
if (listaProductos) {
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.nombre}"> 
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarProducto(${prod.id})">Agregar al carrito</button>
    `;
    listaProductos.appendChild(div);
  });
}

// Función para actualizar la visualización del carrito
function mostrarCarrito() {
  // Obtener elementos del DOM
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  // Limpiar la lista actual
  lista.innerHTML = "";

  // Calcular el total y mostrar cada item
  let suma = 0;

  carrito.forEach(item => {
    // Calcular subtotal por cada item
    suma += item.precio * item.cantidad;

    // Crear elemento de lista con controles para cada producto
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button onclick="sumar(${item.id})">+</button>
      <button onclick="restar(${item.id})">-</button>
      <button onclick="eliminar(${item.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });

  // Actualizar el total en el DOM
  total.innerText = `Total: $${suma}`;
}

// Funciones para manipular el carrito (CRUD: Create, Read, Update, Delete)

// Agregar un producto al carrito
function agregarProducto(id) {
  // Buscar el producto en el array de productos
  const producto = productos.find(p => p.id === id);
  // Verificar si el producto ya existe en el carrito
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    // Si ya existe, aumentar la cantidad
    existente.cantidad++;
  } else {
    // Si no existe, agregarlo al carrito con cantidad 1
    carrito.push({ ...producto, cantidad: 1 });
  }

  mostrarCarrito();
}

// Aumentar la cantidad de un producto en el carrito
function sumar(id) {
  const producto = carrito.find(p => p.id === id);
  producto.cantidad++;
  mostrarCarrito();
}

// Disminuir la cantidad de un producto en el carrito
function restar(id) {
  const producto = carrito.find(p => p.id === id);
  if (producto.cantidad > 1) {
    // Si hay más de 1, reducir la cantidad
    producto.cantidad--;
  } else {
    // Si solo hay 1, eliminar el producto del carrito
    eliminar(id);
  }
  mostrarCarrito();
}

// Eliminar un producto del carrito
function eliminar(id) {
  // Filtrar el carrito para excluir el producto con el id especificado
  carrito = carrito.filter(p => p.id !== id);
  mostrarCarrito();
}

// Configurar el botón para vaciar el carrito
const btnVaciar = document.getElementById("vaciar");
if (btnVaciar) {
  // Agregar evento click al botón
  btnVaciar.addEventListener("click", () => {
    // Reiniciar el carrito a un array vacío
    carrito = [];
    // Actualizar la visualización
    mostrarCarrito();
  });
}