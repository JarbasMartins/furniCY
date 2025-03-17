window.addEventListener("DOMContentLoaded", () => {
    const leftItems = document.querySelector(".left");

    try {
        gsap.set(leftItems, {
            opacity: 0,
            y: "-50%",
        });

        gsap.to(leftItems, {
            y: "0%",
            opacity: 1,
            duration: 2,
            ease: "power2.out",
        });
    } catch (error) {
        console.error("Erro ao executar animação GSAP:", error);
        leftItems?.classList.add("reveal");
    }
});
//
//
function shopCart() {
    const cartManager = {
        getCart: () => {
            try {
                return JSON.parse(localStorage.getItem("carrinho")) || [];
            } catch (error) {
                console.error("Erro ao carregar o carrinho:", error);
                return [];
            }
        },
        saveCart: (cart) => {
            try {
                localStorage.setItem("carrinho", JSON.stringify(cart));
            } catch (error) {
                console.error("Erro ao salvar o carrinho:", error);
            }
        },
        addOrUpdateItem: (name, price) => {
            const cart = cartManager.getCart();
            const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ""));
            if (isNaN(numericPrice)) {
                console.error(`Preço inválido para ${name}: ${price}`);
                return cart;
            }
            const existingItem = cart.find((item) => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price: numericPrice, quantity: 1 });
            }
            cartManager.saveCart(cart);
            return cart;
        },
        updateItemQuantity: (name, newQuantity) => {
            const cart = cartManager.getCart();
            const item = cart.find((item) => item.name === name);
            if (item && newQuantity >= 1) {
                item.quantity = newQuantity;
                cartManager.saveCart(cart);
            }
            return cart;
        },
        removeItem: (name) => {
            const cart = cartManager.getCart();
            const itemIndex = cart.findIndex((item) => item.name === name);
            if (itemIndex !== -1) {
                cart.splice(itemIndex, 1);
                cartManager.saveCart(cart);
            }
            return cart;
        },
        getTotal: () => {
            return cartManager
                .getCart()
                .reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
    };

    function updateCartTotal() {
        const totalElement = document.querySelector("#total-items");
        if (totalElement) {
            const total = cartManager.getTotal();
            totalElement.textContent = `R$${total.toFixed(2)}`;
        }
    }

    function initializeShopPage() {
        const addToCartButtons = document.querySelectorAll(".btn-product");
        if (addToCartButtons.length === 0) return;

        const productImages = document.querySelectorAll(".shop img");

        function getProductDetails(event, index) {
            const product = productImages[index];
            const name = product.getAttribute("data-name");
            const price = product.getAttribute("data-price");
            cartManager.addOrUpdateItem(name, price);
            updateCartTotal();
        }

        addToCartButtons.forEach((button, index) => {
            button.addEventListener("click", (event) =>
                getProductDetails(event, index)
            );
        });
    }

    function initializeCartPage() {
        const tableBody = document.querySelector("tbody");
        if (!tableBody) return;

        function renderCartItem(name, price, quantity) {
            const existingRow = Array.from(
                tableBody.querySelectorAll("tr")
            ).find(
                (row) =>
                    row.querySelector(".name-product")?.textContent === name
            );

            if (existingRow) {
                const quantityInput =
                    existingRow.querySelector(".quantity-input");
                const totalCell = existingRow.querySelector(".total-value");
                quantityInput.value = quantity;
                totalCell.textContent = `R$${(price * quantity).toFixed(2)}`;
            } else {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><span class="name-product">${name}</span></td>
                    <td><span class="price-product">R$${price.toFixed(
                        2
                    )}</span></td>
                    <td>
                        <div class="quantity-control">
                            <button class="btn-minus" aria-label="Diminuir quantidade">-</button>
                            <input type="text" class="quantity-input" value="${quantity}" readonly aria-label="Quantidade de ${name}">
                            <button class="btn-plus" aria-label="Aumentar quantidade">+</button>
                        </div>
                    </td>
                    <td><span class="total-value">R$${(
                        price * quantity
                    ).toFixed(2)}</span></td>
                    <td><span class="remove-btn" aria-label="Remover ${name}"><i class="fa-solid fa-xmark"></i></span></td>
                `;
                tableBody.appendChild(row);

                const btnMinus = row.querySelector(".btn-minus");
                const btnPlus = row.querySelector(".btn-plus");
                const quantityInput = row.querySelector(".quantity-input");
                const totalSpan = row.querySelector(".total-value");
                const removeBtn = row.querySelector(".remove-btn");

                btnMinus.addEventListener("click", () => {
                    const currentQuantity = parseInt(quantityInput.value);
                    if (currentQuantity > 1) {
                        const newQuantity = currentQuantity - 1;
                        quantityInput.value = newQuantity;
                        totalSpan.textContent = `R$${(
                            price * newQuantity
                        ).toFixed(2)}`;
                        cartManager.updateItemQuantity(name, newQuantity);
                        updateCartTotal();
                    }
                });

                btnPlus.addEventListener("click", () => {
                    const currentQuantity = parseInt(quantityInput.value);
                    const newQuantity = currentQuantity + 1;
                    quantityInput.value = newQuantity;
                    totalSpan.textContent = `R$${(price * newQuantity).toFixed(
                        2
                    )}`;
                    cartManager.updateItemQuantity(name, newQuantity);
                    updateCartTotal();
                });

                removeBtn.addEventListener("click", () => {
                    cartManager.removeItem(name);
                    row.remove();
                    updateCartTotal();
                });
            }
        }

        const cart = cartManager.getCart();
        cart.forEach((item) =>
            renderCartItem(item.name, item.price, item.quantity)
        );
        updateCartTotal();
    }

    initializeShopPage();
    initializeCartPage();
}

shopCart();

//
//
//

// MENU MOB

const menuMobBtn = document.querySelector(".mobile-icon");
const menuMobile = document.querySelector(".menu-mobile-section");
const menuMobClose = document.querySelector(".menu-mobile-close");

function menuMobileShow() {
    menuMobile.style.transform = "translateX(0)";
}

function menuMobileClose() {
    menuMobile.style.transform = "translateX(100%)";
}
