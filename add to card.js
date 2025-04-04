document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            const priceNumber = parseInt(String(item.price).replace("₹", "")) || 0;
            total += priceNumber * (item.quantity || 1);
        });
        return total;
    }

    function renderCart() {
        cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cartContainer) return;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty</p>";
            if (totalPriceElement) totalPriceElement.innerText = "₹0";
            return;
        }

        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" width="100" height="100" style="border-radius: 8px; object-fit: cover;">
                <p class="cart-title">${item.title}</p>
                <p class="cart-price">${item.price}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `).join("");

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                removeItem(index);
            });
        });

        if (totalPriceElement) {
            totalPriceElement.innerText = `₹${calculateTotal()}`;
        }
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    renderCart();
});



function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1); 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        
        renderCart(); 
    } else {
        console.error("Invalid index:", index);
    }
}



document.getElementById("checkout-btn").addEventListener("click", function () {
    window.location.href = "checkout.html";
});
