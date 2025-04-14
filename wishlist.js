let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Clear wishlist ONLY once
if (!localStorage.getItem("wishlistClearedOnce")) {
  wishlist = [];
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  localStorage.setItem("wishlistClearedOnce", "true");
}

// function renderWishlist() {
//   const container = document.getElementById("wishlist");
//   if (!container) return;

//   container.innerHTML = "";

//   if (wishlist.length === 0) {
//     container.innerHTML = "<p>Your wishlist is empty 💔</p>";
//     return;
//   }

//   wishlist.forEach(product => {
//     const card = document.createElement("div");
//     card.classList.add("product-card");
//     card.innerHTML = `
//       <img src="${product.img}" alt="${product.name}" />
//       <h3>${product.name}</h3>
//       <p class="price">${product.price}</p>
//       <button class="remove-btn" onclick="removeFromWishlist('${product.id}')">Remove</button>
//     `;
//     container.appendChild(card);
//   });
// }


function renderWishlist() {
  const container = document.getElementById("wishlist");
  if (!container) return;

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty 💔</p>";
    return;
  }

  wishlist.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <button class="remove-btn">Remove</button>
    `;

    // Add event listener instead of inline onclick
    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      removeFromWishlist(product.id);
    });

    container.appendChild(card);
  });
}


function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
  showToast("Removed from wishlist ❌");
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style = `
    position: fixed; bottom: 20px; right: 20px;
    background: #e05656; color: #fff;
    padding: 10px 15px; border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    z-index: 9999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

document.addEventListener("DOMContentLoaded", renderWishlist);
