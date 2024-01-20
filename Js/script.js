document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById("products-row");
    const cartButton = document.getElementById("cart-button");
    const notificationDiv = document.getElementById("notification");
    const purchaseForm = document.getElementById("purchase-form");
    const showAllButton = document.querySelector(".show-all");

    let products = [];

    if (cartButton) {
        cartButton.addEventListener("click", toggleCart);
    }

    function displayProducts(productsToShow) {
        productsContainer.innerHTML = "";
        productsToShow.forEach(product => {
            const productCard = `
                <div class="col">
                    <div class="card h-100">
                        <img class="card-img-top" src="${product.image}" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-price">$${product.price.toFixed(2)}</p>
                            <p class="card-type">${product.productType}</p>
                            <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" data-link="${product.link}">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    }

    function filterByType(productType) {
        const products = productsContainer.querySelectorAll(".col");
        products.forEach(product => {
            const typeElement = product.querySelector(".card-type");
            const productTypeText = typeElement.textContent.trim().toLowerCase();
            if (productTypeText.includes(productType.toLowerCase())) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

    document.querySelectorAll('[data-type]').forEach(option => {
        option.addEventListener("click", function () {
            const productType = option.dataset.type;
            productsContainer.querySelectorAll(".col").forEach(product => {
                product.style.display = "block";
            });
            filterByType(productType);
        });
    });

    function filterByPrice(price) {
        const products = productsContainer.querySelectorAll(".col");
        products.forEach(product => {
            const priceElement = product.querySelector(".card-price");
            const productPrice = parseFloat(priceElement.textContent.slice(1));
            if (productPrice <= price) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

    document.querySelectorAll('[data-price]').forEach(option => {
        option.addEventListener("click", function () {
            const price = parseFloat(option.dataset.price);
            filterByPrice(price);
        });
    });

    showAllButton.addEventListener("click", function () {
        productsContainer.querySelectorAll(".col").forEach(product => {
            product.style.display = "block";
        });
    });

    productsContainer.addEventListener("click", function (event) {
        const addToCartButton = event.target.closest(".add-to-cart");
        if (addToCartButton) {
            const productLink = addToCartButton.dataset.link;
            window.location.href = productLink;
        }
    });

    fetch('Data/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById("products-row");
    const searchForm = document.getElementById("search-form");

    let products = [];

    function displayProducts(productsToShow) {
        productsContainer.innerHTML = "";
        productsToShow.forEach(product => {
            const productCard = `
                <div class="col">
                    <div class="card h-100">
                        <img class="card-img-top" src="${product.image}" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-price">$${product.price.toFixed(2)}</p>
                            <p class="card-type">${product.productType}</p>
                            <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" data-link="${product.link}">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    }

    // Cambiando el evento a keyup para manejar la entrada del usuario
    document.getElementById("search-input").addEventListener("keyup", function () {
        const searchTerm = this.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    });

    fetch('Data/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    new Splide(".splide", {
        type: "fade",
        autoplay: true,
        interval: 3000,
        pauseOnHover: false,
        resetProgress: false,
        arrows: true,
        pagination: true,
        cover: true,
        heightRatio: 0.3125,
    }).mount();
});