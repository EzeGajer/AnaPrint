// Manejo del formulario de contacto
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const newMessage = {
            name: name,
            email: email,
            message: message
        };

        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));

        Swal.fire({
            icon: 'success',
            title: 'Mensaje Enviado',
            text: 'Tu mensaje ha sido enviado correctamente.',
            confirmButtonText: 'Entendido'
        });

        contactForm.reset();
    });
}
