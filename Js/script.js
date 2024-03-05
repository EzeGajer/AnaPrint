document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById("products-row");
    const showAllButton = document.querySelector(".show-all");

    let products = [];

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
                            <p class="card-price">$${formatPrice(product.price.toFixed(0))}</p>
                            <p class="card-type">${product.productType}</p>
                            <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" data-link="${product.link}">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    }

    function filterElements(filterFunction) {
        const elements = productsContainer.querySelectorAll(".col");
        elements.forEach(element => {
            filterFunction(element);
        });
    }

    function filterByTypeAndPrice(productType, maxPrice) {
        filterElements(product => {
            const typeElement = product.querySelector(".card-type");
            const priceElement = product.querySelector(".card-price");
            
            const productTypeText = typeElement.textContent.trim().toLowerCase();
            const productPrice = parseFloat(priceElement.textContent.slice(1).replace(".", ""));

            const typeCondition = productType ? productTypeText.includes(productType.toLowerCase()) : true;
            const priceCondition = maxPrice ? productPrice <= maxPrice : true;

            product.style.display = typeCondition && priceCondition ? "block" : "none";
        });
    }

    function updateFilter() {
        const selectedType = getSelectedType();
        const selectedPrice = getSelectedPrice();
        filterByTypeAndPrice(selectedType, selectedPrice);
    }

    document.querySelectorAll('[data-type]').forEach(option => {
        option.addEventListener("click", function () {
            toggleActiveClass(option);
            updateFilter();
        });
    });

    document.querySelectorAll('[data-price]').forEach(option => {
        option.addEventListener("click", function () {
            toggleActiveClass(option);
            updateFilter();
        });
    });

    showAllButton.addEventListener("click", function () {
        filterElements(product => product.style.display = "block");
        clearActiveClasses();
    });

    function toggleActiveClass(element) {
        element.classList.toggle('active');
    }

    function clearActiveClasses() {
        document.querySelectorAll('[data-type]').forEach(option => {
            option.classList.remove('active');
        });

        document.querySelectorAll('[data-price]').forEach(option => {
            option.classList.remove('active');
        });
    }

    function getSelectedType() {
        const selectedTypeButton = Array.from(document.querySelectorAll('[data-type].active'))[0];
        return selectedTypeButton ? selectedTypeButton.dataset.type : null;
    }

    function getSelectedPrice() {
        const selectedPriceButton = Array.from(document.querySelectorAll('[data-price].active'))[0];
        return selectedPriceButton ? parseFloat(selectedPriceButton.dataset.price.replace(".", "")) : null;
    }

    productsContainer.addEventListener("click", function (event) {
        const addToCartButton = event.target.closest(".add-to-cart");
        if (addToCartButton) {
            const productLink = addToCartButton.dataset.link;
            window.location.href = productLink;
        }
    });

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
