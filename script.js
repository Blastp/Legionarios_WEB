// Productos disponibles
const productos = [
  { id: 1, nombre: "Reloj Classic", precio: 150, img: "./images/reloj_classic.jpg" },
  { id: 2, nombre: "Reloj Modern", precio: 180, img: "./images/reloj_modern.jpg" },
  { id: 3, nombre: "Reloj Sport", precio: 120, img: "./images/reloj_sport.jpg" },
  { id: 4, nombre: "Reloj Elegance", precio: 210, img: "./images/reloj_elegance.jpg" }
];

let carrito = [];

// Mostrar productos
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

// Mostrar carrito
function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";

  let suma = 0;

  carrito.forEach(item => {
    suma += item.precio * item.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button onclick="sumar(${item.id})">+</button>
      <button onclick="restar(${item.id})">-</button>
      <button onclick="eliminar(${item.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });

  total.innerText = `Total: $${suma}`;
}

//CRUD Carrito
function agregarProducto(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  mostrarCarrito();
}

function sumar(id) {
  const producto = carrito.find(p => p.id === id);
  producto.cantidad++;
  mostrarCarrito();
}

function restar(id) {
  const producto = carrito.find(p => p.id === id);
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    eliminar(id);
  }
  mostrarCarrito();
}

function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  mostrarCarrito();
}

const btnVaciar = document.getElementById("vaciar");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    carrito = [];
    mostrarCarrito();
  });
}