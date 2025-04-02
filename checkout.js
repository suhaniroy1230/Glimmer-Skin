
function showPaymentDetails(method) { 
    document.getElementById('bank').style.display = 'none';
    document.getElementById('card').style.display = 'none';
    document.getElementById('cod').style.display = 'none';
    
    document.getElementById(method).style.display = 'block';
}




document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderSummary = document.getElementById("order-summary");
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let discount = 0;

    function updateTotal() {
        let subtotal = 0;
        cart.forEach(item => {
            let priceNumber = parseFloat(item.price.replace("₹", "")) || 0;
            subtotal += priceNumber * (item.quantity || 1);
        });

        let total = subtotal - discount;
        document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById("discount").textContent = `₹${discount.toFixed(2)}`;
        document.getElementById("total").textContent = `₹${total.toFixed(2)}`;

        if (totalPriceElement) {
            totalPriceElement.innerText = `₹${subtotal}`;
        }
    }

    function renderCartItems() {
        if (orderSummary) {
            orderSummary.innerHTML = cart.length === 0 ? "<p>Your cart is empty</p>" : "";

            cart.forEach((item, index) => {
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p>${item.title}</p>
                        <p class="price">${item.price}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span id="qty-${index}">${item.quantity || 1}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${index})">✕</button>
                `;
                orderSummary.appendChild(cartItem);
            });
        }

        if (cartContainer) {
            cartContainer.innerHTML = cart.length === 0 ? "<p>Your cart is empty</p>" : "";
            let totalPrice = 0;

            cart.forEach((item, index) => {
                let priceNumber = parseFloat(item.price.replace("₹", "")) || 0;
                totalPrice += priceNumber * (item.quantity || 1);

                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" width="50">
                    <p>${item.title}</p>
                    <p>${item.price}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
            });

            totalPriceElement.innerText = `₹${totalPrice}`;
        }

        updateTotal();
    }

    window.updateQuantity = function (index, change) {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            removeItem(index);
            return;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
    };

    window.removeItem = function (index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
        }
    };

    document.getElementById("apply-discount").addEventListener("click", function () {
        let code = document.getElementById("discount-code").value.trim();
        discount = code === "WELCOME123" ? 12.00 : 0;
        updateTotal();
    });

    document.getElementById("checkout-btn").addEventListener("click", function () {
        let firstName = document.getElementById("first-name").value.trim();
        let lastName = document.getElementById("last-name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let street = document.getElementById("street-address").value.trim();
        let postal = document.getElementById("postal-code").value.trim();
        let city = document.getElementById("city").value.trim();
        let paymentMethod = document.querySelector('input[name="payment"]:checked');

        if (!firstName || !lastName || !email || !phone || !street || !postal || !city || !paymentMethod) {
            alert("Please fill in all required fields before proceeding.");
            return;
        }

        alert("Thank you! Your order has been placed successfully.");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

    renderCartItems();
});
