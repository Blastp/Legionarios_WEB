// Lista de productos disponibles en la tienda// Clase principal para manejar el carrito de compras

const products = [class ShoppingCart {

    { id: 'jersey-01', name: 'Jersey Legionarios', price: 29.99, stock: 10 },    constructor() {

    { id: 'short-01', name: 'Short de Entrenamiento', price: 19.99, stock: 15 },        // Recuperar carrito guardado o crear uno nuevo

    { id: 'cap-01', name: 'Gorra Legionarios', price: 14.99, stock: 20 },        this.items = JSON.parse(localStorage.getItem('cart')) || [];

    { id: 'bag-01', name: 'Mochila Deportiva', price: 24.99, stock: 8 }        this.total = 0;

];        this.updateTotal();

    }

// Clase principal para manejar el carrito de compras

class ShoppingCart {    // Agregar un nuevo producto al carrito

    constructor() {    addItem(item) {

        // Recuperar carrito guardado o crear uno nuevo        const existingItem = this.items.find(i => i.id === item.id);

        this.items = JSON.parse(localStorage.getItem('cart')) || [];        if (existingItem) {

        this.total = 0;            existingItem.quantity += item.quantity;

        this.updateTotal();        } else {

    }            this.items.push(item);

        }

    // Agregar un nuevo producto al carrito        this.updateTotal();

    addItem(item) {        this.saveCart();

        const existingItem = this.items.find(i => i.id === item.id);        this.displayCart();

        if (existingItem) {    }

            existingItem.quantity += item.quantity;

        } else {    // Obtener todos los productos del carrito

            this.items.push(item);    getItems() {

        }        return this.items;

        this.updateTotal();    }

        this.saveCart();

        this.displayCart();    // Actualizar la cantidad de un producto

    }    updateItemQuantity(id, quantity) {

        const item = this.items.find(i => i.id === id);

    // Obtener todos los productos del carrito        if (item) {

    getItems() {            item.quantity = quantity;

        return this.items;            if (item.quantity <= 0) {

    }                this.removeItem(id);

            }

    // Actualizar la cantidad de un producto        }

    updateItemQuantity(id, quantity) {        this.updateTotal();

        const item = this.items.find(i => i.id === id);        this.saveCart();

        if (item) {        this.displayCart();

            item.quantity = quantity;    }

            if (item.quantity <= 0) {

                this.removeItem(id);    // Eliminar un producto del carrito

            }    removeItem(id) {

        }        this.items = this.items.filter(item => item.id !== id);

        this.updateTotal();        this.updateTotal();

        this.saveCart();        this.saveCart();

        this.displayCart();        this.displayCart();

    }    }



    // Eliminar un producto del carrito    // Vaciar completamente el carrito

    removeItem(id) {    clearCart() {

        this.items = this.items.filter(item => item.id !== id);        this.items = [];

        this.updateTotal();        this.updateTotal();

        this.saveCart();        this.saveCart();

        this.displayCart();        this.displayCart();

    }    }



    // Vaciar completamente el carrito    // Actualizar el precio total del carrito

    clearCart() {    updateTotal() {

        this.items = [];        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        this.updateTotal();        const totalElement = document.getElementById('cart-total');

        this.saveCart();        if (totalElement) {

        this.displayCart();            totalElement.textContent = `$${this.total.toFixed(2)}`;

    }        }

    }

    // Actualizar el precio total del carrito

    updateTotal() {    // Guardar el carrito en localStorage

        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);    saveCart() {

        const totalElement = document.getElementById('cart-total');        localStorage.setItem('cart', JSON.stringify(this.items));

        if (totalElement) {    }

            totalElement.textContent = `$${this.total.toFixed(2)}`;

        }    // Mostrar los productos en el carrito

    }    displayCart() {

        const cartList = document.getElementById('cart-items');

    // Guardar el carrito en localStorage        if (!cartList) return;

    saveCart() {

        localStorage.setItem('cart', JSON.stringify(this.items));        cartList.innerHTML = '';

    }        this.items.forEach(item => {

            const li = document.createElement('li');

    // Mostrar los productos en el carrito            li.className = 'cart-item';

    displayCart() {            li.innerHTML = `

        const cartList = document.getElementById('cart-items');                <span>${item.name}</span>

        if (!cartList) return;                <span>$${item.price.toFixed(2)}</span>

                <div class="quantity-controls">

        cartList.innerHTML = '';                    <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity - 1})">-</button>

        this.items.forEach(item => {                    <span>${item.quantity}</span>

            const li = document.createElement('li');                    <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>

            li.className = 'cart-item';                </div>

            li.innerHTML = `                <button onclick="cart.removeItem('${item.id}')" class="remove-item">×</button>

                <span>${item.name}</span>            `;

                <span>$${item.price.toFixed(2)}</span>            cartList.appendChild(li);

                <div class="quantity-controls">        });

                    <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity - 1})">-</button>    }

                    <span>${item.quantity}</span>}

                    <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>

                </div>// Lista de productos disponibles en la tienda

                <button onclick="cart.removeItem('${item.id}')" class="remove-item">×</button>const products = [

            `;    { id: 'jersey-01', name: 'Jersey Legionarios', price: 29.99, stock: 10 },

            cartList.appendChild(li);    { id: 'short-01', name: 'Short de Entrenamiento', price: 19.99, stock: 15 },

        });    { id: 'cap-01', name: 'Gorra Legionarios', price: 14.99, stock: 20 },

    }    { id: 'bag-01', name: 'Mochila Deportiva', price: 24.99, stock: 8 }

}];



// Crear instancia del carrito// Crear instancia del carrito

const cart = new ShoppingCart();const cart = new ShoppingCart();



// Agregar un producto al carrito// Agregar un producto al carrito

function addToCart(productId) {function addToCart(productId) {

    const product = products.find(p => p.id === productId);    const product = products.find(p => p.id === productId);

    if (product) {    if (product) {

        cart.addItem({        cart.addItem({

            id: product.id,            id: product.id,

            name: product.name,            name: product.name,

            price: product.price,            price: product.price,

            quantity: 1            quantity: 1

        });        });

    }    }

}}



// Mostrar productos en la página// Mostrar productos en la página

function displayProducts() {function displayProducts() {

    const productsContainer = document.getElementById('products-container');    const productsContainer = document.getElementById('products-container');

    if (!productsContainer) return;    if (!productsContainer) return;



    products.forEach(product => {    products.forEach(product => {

        const productElement = document.createElement('div');        const productElement = document.createElement('div');

        productElement.className = 'product-card';        productElement.className = 'product-card';

        productElement.innerHTML = `        productElement.innerHTML = `

            <h3>${product.name}</h3>            <h3>${product.name}</h3>

            <p class="price">$${product.price.toFixed(2)}</p>            <p class="price">$${product.price.toFixed(2)}</p>

            <p class="stock">Stock: ${product.stock}</p>            <p class="stock">Stock: ${product.stock}</p>

            <button onclick="addToCart('${product.id}')" class="add-to-cart">            <button onclick="addToCart('${product.id}')" class="add-to-cart">

                Agregar al Carrito                Agregar al Carrito

            </button>            </button>

        `;        `;

        productsContainer.appendChild(productElement);        productsContainer.appendChild(productElement);

    });    });

}}



// Inicializar la página cuando carga// Inicializar la página cuando carga

document.addEventListener('DOMContentLoaded', () => {document.addEventListener('DOMContentLoaded', () => {

    displayProducts();    displayProducts();

    cart.displayCart();    cart.displayCart();

});});
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    // Vaciar completamente el carrito
    clearCart() {
        this.items = [];
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    // Actualizar el precio total del carritoras
class ShoppingCart {
    constructor() {
        // Recuperar carrito guardado o crear uno nuevo
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

    // Agregar un nuevo producto al carrito
    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    // Obtener todos los productos del carrito
    getItems() {
        return this.items;
    }

    // Actualizar la cantidad de un producto
    updateItemQuantity(id, quantity) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(id);
            }
        }
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    // Eliminar un producto del carrito
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    // Actualizar el precio total del carrito
    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.getElementById('cart-total');
        if (totalElement) {
            totalElement.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    // Guardar el carrito en localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Mostrar los productos en el carrito
    displayCart() {
        const cartList = document.getElementById('cart-items');
        if (!cartList) return;

        cartList.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <div class="quantity-controls">
                    <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button onclick="cart.removeItem('${item.id}')" class="remove-item">×</button>
            `;
            cartList.appendChild(li);
        });
    }
}

// Lista de productos disponibles en la tienda
const products = [
    { id: 'jersey-01', name: 'Jersey Legionarios', price: 29.99, stock: 10 },
    { id: 'short-01', name: 'Short de Entrenamiento', price: 19.99, stock: 15 },
    { id: 'cap-01', name: 'Gorra Legionarios', price: 14.99, stock: 20 },
    { id: 'bag-01', name: 'Mochila Deportiva', price: 24.99, stock: 8 }
];

// Crear instancia del carrito
const cart = new ShoppingCart();

// Agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
}

// Mostrar productos en la página
function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="stock">Stock: ${product.stock}</p>
            <button onclick="addToCart('${product.id}')" class="add-to-cart">
                Agregar al Carrito
            </button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Inicializar la página cuando carga
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    cart.displayCart();
});