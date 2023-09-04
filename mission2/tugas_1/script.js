const products = [
    { name: "Hoodie Korea", price: 38000, image: "img/baju.jpg" },
    { name: "Sepatu Vintage", price: 80000, image: "img/sepatu.jpg" },
    { name: "Jaket Minimalis", price: 65000, image: "img/jaket.jpg"},
    { name: "Overall Syar'i", price: 120000, image: "img/overal.jpg"},
    { name: "Kemeja Kerja", price: 35000, image: "img/kemeja.jpg"},
    { name: "Jeans Kece", price: 60000, image: "img/jeans.jpg"},
];

const productContainer = document.querySelector('.grid-container');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmountElement = document.querySelector('.total-amount');
const cart = {};

// Mengganti elemen HTML total harga belanja
function updateTotalPrice() {
    let totalPrice = 0;

    for (const productId in cart) {
        const product = products.find(item => item.id === productId);
        const quantity = cart[productId];
        totalPrice += product.price * quantity;
    }

    totalAmountElement.textContent = `Rp. ${totalPrice}`;
}

// Menambahkan item ke keranjang belanja
function addToCart(productName, productPrice, productImage, quantity) {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <div class="cart-item-details">
            <h3>${productName}</h3>
            <p>Jumlah: ${quantity}</p>
            <p>Total: Rp. ${quantity * productPrice}</p>
        </div>
    `;
    cartItemsContainer.appendChild(cartItemElement);
    
    // Memperbarui total harga belanja
    updateTotalPrice();
}

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.grid-container');

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.name = product.name;
        productCard.dataset.price = product.price;
        productCard.dataset.image = product.image;

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `Rp. ${product.price}`;

        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');

        // Membuat tombol "Decrease"
        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add('control-button', 'decrease-button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
            const quantityInput = productCard.querySelector('.quantity-input');
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 0) {
                currentValue--;
                quantityInput.value = currentValue;
            }
        });
        
        // Membuat input form angka
        const quantityInput = document.createElement('input');
        quantityInput.setAttribute('type', 'number');
        quantityInput.classList.add('quantity-input');
        quantityInput.value = 0;

        // Membuat tombol "Increase"
        const increaseButton = document.createElement('button');
        increaseButton.classList.add('control-button', 'increase-button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => {
            const quantityInput = productCard.querySelector('.quantity-input');
            let currentValue = parseInt(quantityInput.value);
            currentValue++;
            quantityInput.value = currentValue;
        });

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-product');
        addToCartButton.textContent = 'Tambah';
        addToCartButton.addEventListener('click', () => {
            const productName = productCard.dataset.name;
            const productPrice = parseInt(productCard.dataset.price);
            const productImage = productCard.dataset.image;
            const quantityInput = productCard.querySelector('.quantity-display');
            const quantity = parseInt(quantityInput.textContent);

            if (quantity > 0) {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.dataset.name = productName;
                cartItem.dataset.price = productPrice;
                cartItem.dataset.quantity = quantity;

                cartItem.innerHTML = `
                    <img src="${productImage}" alt="${productName}">
                    <div class="cart-item-details">
                        <h3>${productName}</h3>
                        <p>Jumlah: ${quantity}</p>
                        <p>Total: Rp. ${quantity * productPrice}</p>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);
                updateTotalPrice();
            }
});
        // Menggabungkan elemen-elemen di dalam productCard
        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(increaseButton);
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(quantityControls);
        productCard.appendChild(addToCartButton);

        productContainer.appendChild(productCard);
    });

    document.addEventListener('DOMContentLoaded', () => {
        const productContainer = document.querySelector('.grid-container');
        const cartItemsContainer = document.querySelector('.side-right');
    
        const products = [
            { name: "Hoodie Korea", price: 38000, image: "img/baju.jpg" },
            { name: "Sepatu Vintage", price: 80000, image: "img/sepatu.jpg" },
            { name: "Jaket Minimalis", price: 65000, image: "img/jaket.jpg" },
            { name: "Overall Syar'i", price: 120000, image: "img/overall.jpg" },
            { name: "Kemeja Kerja", price: 35000, image: "img/kemeja.jpg" },
            { name: "Jeans Kece", price: 60000, image: "img/jeans.jpg" },
        ];
    
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.name = product.name;
            productCard.dataset.price = product.price;
            productCard.dataset.image = product.image;
    
            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;
            productCard.appendChild(productImage);
    
            const productTitle = document.createElement('h3');
            productTitle.classList.add('product-title');
            productTitle.textContent = product.name;
            productCard.appendChild(productTitle);
    
            const productPrice = document.createElement('p');
            productPrice.classList.add('product-price');
            productPrice.textContent = `Rp. ${product.price}`;
            productCard.appendChild(productPrice);
    
            const quantityControls = document.createElement('div');
            quantityControls.classList.add('quantity-controls');
    
            const decreaseButton = document.createElement('button');
            decreaseButton.classList.add('control-button');
            decreaseButton.textContent = '-';
            quantityControls.appendChild(decreaseButton);
    
            const quantityDisplay = document.createElement('span');
            quantityDisplay.classList.add('quantity-display');
            quantityDisplay.textContent = '0';
            quantityControls.appendChild(quantityDisplay);
    
            const increaseButton = document.createElement('button');
            increaseButton.classList.add('control-button');
            increaseButton.textContent = '+';
            quantityControls.appendChild(increaseButton);
    
            productCard.appendChild(quantityControls);
    
            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('add-product');
            addToCartButton.textContent = 'Tambah';
            productCard.appendChild(addToCartButton);
    
            productContainer.appendChild(productCard);
    
            addToCartButton.addEventListener('click', () => {
                const productName = productCard.dataset.name;
                const productPrice = parseInt(productCard.dataset.price);
                const productImage = productCard.dataset.image;
                const quantityInput = productCard.querySelector('.quantity-display');
                const quantity = parseInt(quantityInput.textContent);
    
                if (quantity > 0) {
                    // Tambahkan produk ke keranjang belanja di sini
                    const cartItem = {
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: quantity,
                    };
                    // Tampilkan informasi produk di sini
                    const cartItemElement = document.createElement('div');
                    cartItemElement.classList.add('cart-item');
                    cartItemElement.innerHTML = `
                        <img src="${cartItem.image}" alt="${cartItem.name}">
                        <div class="cart-item-details">
                            <h3>${cartItem.name}</h3>
                            <p>Jumlah: ${cartItem.quantity}</p>
                            <p>Total: Rp. ${cartItem.quantity * cartItem.price}</p>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItemElement);
                }
            });
        });
    });
    
});


