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



// (function(){
//     emailjs.init("6v4VlwTLSgS8J2n4x"); // Email.js thi mḷelī Public Key muko
//   })();

//   document.querySelector("form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Form default submit ne rokava

//     const serviceID = "service_48q8ha4"; // Email.js Dashboard thi Service ID lo
//     const templateID = "template_19z2e8e"; // Email Template ID

//     const formData = {
//       name: document.querySelector("input[name='name']").value,
//       email: document.querySelector("input[name='email']").value,
//       phone: document.querySelector("input[name='phone']").value,
//       subject: document.querySelector("input[name='subject']").value,
//       message: document.querySelector("textarea[name='message']").value,
//     };

//     emailjs.send(serviceID, templateID, formData)
//       .then(response => {
//         alert("Your message has been sent successfully!");
//         document.querySelector("form").reset();
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         alert("Oops! Something went wrong.");
//       });
//   });

// document.addEventListener("DOMContentLoaded", function () {
//   emailjs.init("6v4VlwTLSgS8J2n4x"); // Replace with your Public Key

//   document.getElementById("contact-form").addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent default form submission

//       const serviceID = "service_48q8ha4"; // Replace with your Service ID
//       const templateID = "template_szh310w"; // Replace with your Template ID

//       const formData = {
//           name: document.getElementById("name").value,
//           email: document.getElementById("email").value,
//           phone: document.getElementById("phone").value,
//           subject: document.getElementById("subject").value,
//           message: document.getElementById("message").value,
//       };

//       emailjs.send(serviceID, templateID, formData)
//           .then(response => {
//               alert("Your message has been sent successfully!");
//               document.getElementById("contact-form").reset();
//           })
//           .catch(error => {
//               console.error("Error:", error);
//               alert("Oops! Something went wrong.");
//           });
//   });
// });

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





