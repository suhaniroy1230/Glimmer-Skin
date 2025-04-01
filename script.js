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