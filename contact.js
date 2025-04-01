document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("6v4VlwTLSgS8J2n4x"); 

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = {
            first_name: document.getElementById("first-name").value,
            last_name: document.getElementById("last-name").value,
            mobile: document.getElementById("mobile").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        emailjs.send("service_aj4c4po", "template_19z2e8e", formData)
            .then(function (response) {
                alert("Message Sent Successfully!");
                document.getElementById("contact-form").reset();
            }, function (error) {
                alert("Error Sending Message: " + error.text);
            });
    });
});
