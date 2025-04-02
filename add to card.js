document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalPriceElement = document.getElementById("total-price");

  if (!cartContainer || !totalPriceElement) {
      console.error("Cart container or total price element not found!");
      return;
  }

  let totalPrice = 0;

  if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty</p>";
  } else {
      cartContainer.innerHTML = cart
          .map((item, index) => {
              let priceNumber = parseInt(String(item.price).replace("₹", "")) || 0;
              totalPrice += priceNumber * (item.quantity || 1);

              return `
                  <div class="cart-item">
                      <img src="${item.image}" width="50">
                      <p>${item.title}</p>
                      <p>${item.price}</p>
                      <button onclick="removeItem(${index})">Remove</button>
                  </div>
              `;
          })
          .join("");
  }

  totalPriceElement.innerText = `₹${totalPrice}`;
});



// Function to update the cart display dynamically
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1); // Remove item from array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
        
        renderCart(); // Re-render cart items dynamically
    } else {
        console.error("Invalid index:", index);
    }
}



document.getElementById("checkout-btn").addEventListener("click", function () {
    window.location.href = "checkout.html";
});
