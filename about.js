document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".product-slider");
    const cards = document.querySelectorAll(".product-card");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

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



document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("6v4VlwTLSgS8J2n4x"); 
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        const serviceID = "service_48q8ha4"; 
        const templateID = "template_szh310w"; 

        const formData = {
            user_name: document.getElementById("name").value.trim(),
            user_email: document.getElementById("email").value.trim(),
            user_phone: document.getElementById("phone").value.trim(),
            user_subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
        };

        console.log("📨 Sending Data:", formData);

        emailjs.send(serviceID, templateID, formData)
            .then(response => {
                console.log("✅ Success:", response);
                alert("✅ Your message has been sent successfully!");
                document.getElementById("contact-form").reset();
            })
            .catch(error => {
                console.error("❌ Error:", error);
                alert("❌ Oops! Something went wrong.\nCheck the console for details.");
            });
    });
});





