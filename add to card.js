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
                      <p>${item.price} x ${item.quantity || 1}</p>
                      <button onclick="updateQuantity(${index}, -1)">-</button>
                      <button onclick="updateQuantity(${index}, 1)">+</button>
                      <button onclick="removeItem(${index})">Remove</button>
                  </div>
              `;
          })
          .join("");
  }

  totalPriceElement.innerText = `₹${totalPrice}`;
});


function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}


document.getElementById("checkout-btn").addEventListener("click", function () {
    window.location.href = "checkout.html";
});
