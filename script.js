document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".product-slider");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    if (!slider || !prev || !next) {
        console.error("Slider or navigation buttons not found!");
        return;
    }

    function updateButtonState() {
        let maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        prev.disabled = slider.scrollLeft <= 0;
        next.disabled = slider.scrollLeft >= maxScrollLeft;
    }

    function scrollSlider(direction) {
        let productWidth = document.querySelector(".product")?.offsetWidth + 20 || 0;
        let scrollAmount = window.innerWidth <= 768 ? productWidth * 2 : productWidth * 4; 

        if (direction === "next") {
            slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        } else if (direction === "prev") {
            slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }

        setTimeout(updateButtonState, 500); 
    }

    next.addEventListener("click", () => scrollSlider("next"));
    prev.addEventListener("click", () => scrollSlider("prev"));
    slider.addEventListener("scroll", updateButtonState);

    updateButtonState();
});


document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            let product = {
                id: this.parentElement.querySelector("h3").innerText, 
                image: this.parentElement.querySelector("img").src,
                title: this.parentElement.querySelector("h3").innerText,
                price: this.parentElement.querySelector(".new").innerText,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        });
    });
});

function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
} 



document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".wishlist-btn");
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
    buttons.forEach(button => {
      const product = button.closest(".product");
      const img = product.querySelector("img");
      const name = product.querySelector("h3")?.innerText || "";
      const price = product.querySelector(".price .new")?.innerText?.replace("₹", "") || "";
      const image = img?.getAttribute("src") || "";
      const id = name + price; // generate simple ID based on name+price
  
      // Show active state if already in wishlist
      if (wishlist.find(item => item.id === id)) {
        button.classList.add("active");
        const icon = button.querySelector("i");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }
  
      button.addEventListener("click", () => {
        const icon = button.querySelector("i");
        const existing = wishlist.find(item => item.id === id);
  
        if (!existing) {
          wishlist.push({ id, name, price, image });
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          button.classList.add("active");
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
          alert(`${name} added to wishlist!`);
        } else {
          wishlist = wishlist.filter(item => item.id !== id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          button.classList.remove("active");
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          alert(`${name} removed from wishlist.`);
        }
      });
    });
  });
  
// document.querySelectorAll('.wishlist-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       button.classList.toggle('active');
//       const icon = button.querySelector('i');
//       icon.classList.toggle('fa-regular');
//       icon.classList.toggle('fa-solid');
//     });
//   });

//   const wishlistBtns = document.querySelectorAll('.wishlist-btn');

//   wishlistBtns.forEach(btn => {
//     btn.addEventListener('click', function () {
//       const product = btn.closest('.product');
//       const id = product.dataset.id;
//       const name = product.dataset.name;
//       const price = product.dataset.price;
//       const image = product.dataset.image;

//       let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

//       // Check if already exists
//       const existing = wishlist.find(item => item.id === id);

//       if (!existing) {
//         wishlist.push({ id, name, price, image });
//         btn.classList.add('active');
//         const icon = btn.querySelector('i');
//         icon.classList.remove('fa-regular');
//         icon.classList.add('fa-solid');
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));
//         alert(`${name} added to wishlist!`);
//       } else {
//         alert(`${name} is already in wishlist.`);
//       }
//     });
//   });

function startCountdown(durationInDays) {
    let endTime = new Date().getTime() + durationInDays * 24 * 60 * 60 * 1000;

    function updateCountdown() {
        let now = new Date().getTime();
        let timeLeft = endTime - now;

        if (timeLeft < 0) {
            let countdownContainer = document.querySelector(".countdown");
            if (countdownContainer) countdownContainer.innerHTML = "Countdown Finished!";
            clearInterval(timer);
            return;
        }

        let daysElement = document.getElementById("days");
        let hoursElement = document.getElementById("hours");
        let minutesElement = document.getElementById("minutes");
        let secondsElement = document.getElementById("seconds");

        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error("Countdown elements not found!");
            return;
        }

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        daysElement.innerHTML = `${days} <br />Days`;
        hoursElement.innerHTML = `${hours} <br />Hours`;
        minutesElement.innerHTML = `${minutes} <br />Min`;
        secondsElement.innerHTML = `${seconds} <br />Sec`;
    }

    let timer = setInterval(updateCountdown, 1000);
    updateCountdown();
}

startCountdown(10);



function toggleMenu() {
    document.querySelector(".main-menu").classList.toggle("active");
}





function redirectToCart(product, price) {
    window.location.href = `add to card.html?product=${encodeURIComponent(product)}&price=${price}`;
  }
  
  function redirectToView(product) {
    window.location.href = `view.html?product=${encodeURIComponent(product)}`;
  }



  document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".treatment-slider");
    const cards = document.querySelectorAll(".treatment-card");
    const prevBtn = document.getElementById("prev-treatment");
    const nextBtn = document.getElementById("next-treatment");

    let index = 0;
    const visibleCards = 3;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 15;
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        if (index < cards.length - visibleCards) {
            index++;
        } else {
            index = 0;
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
        } else {
            index = cards.length - visibleCards;
        }
        updateSlider();
    });
});
