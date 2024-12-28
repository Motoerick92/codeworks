document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    try {
        const response = await fetch("/send-email/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,  // Si es necesario
            },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
            // Mostrar la alerta de éxito

            // const notification = document.getElementById("notification");
            // notification.style.display = 'block';  // Mostrar la alerta
            // setTimeout(() => {
            //     notification.style.display = 'none';  // Ocultar la alerta después de 5 segundos
            // }, 5000);
            
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            document.getElementById("contactForm").reset();  // Limpiar el formulario
        } else {
            // Si hubo un error, mostrar mensaje
            document.getElementById("responseMessage").innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
        }
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        document.getElementById("responseMessage").innerHTML = `<div class="alert alert-danger">Hubo un error al enviar el correo.</div>`;
    }
});
