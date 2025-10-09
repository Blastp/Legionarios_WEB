// Lista de productos disponibles en la tienda
const products = [
    { id: 'jersey-01', name: 'Jersey Legionarios', price: 29.99, stock: 10 },
    { id: 'short-01', name: 'Short de Entrenamiento', price: 19.99, stock: 15 },
    { id: 'cap-01', name: 'Gorra Legionarios', price: 14.99, stock: 20 },
    { id: 'bag-01', name: 'Mochila Deportiva', price: 24.99, stock: 8 }
];

// Clase principal para manejar el carrito de compras
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

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

    getItems() {
        return this.items;
    }

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

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    clearCart() {
        this.items = [];
        this.updateTotal();
        this.saveCart();
        this.displayCart();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.getElementById('cart-total');
        if (totalElement) {
            totalElement.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

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
    console.log('Iniciando displayProducts');
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.log('No se encontró el contenedor de productos');
        return;
    }

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
    console.log('Productos mostrados correctamente');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Cargado');
    displayProducts();
    cart.displayCart();
});