const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const addMessage = (message, sender) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
};

const sendMessage = async () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, "user");
        userInput.value = "";

        try {
            const response = await fetch("/get-response/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Error en el servidor");
            }

            const data = await response.json();
            addMessage(data.response, "bot");
        } catch (error) {
            addMessage("Hubo un problema al conectar con el servidor.", "bot");
        }
    }
};

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});


//Se arrastra el chatbot
const chatbot = document.getElementById("chatbot");
const header = chatbot.querySelector(".chat-header");

let offsetX = 0, offsetY = 0, isDragging = false;

header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - chatbot.offsetLeft;
    offsetY = e.clientY - chatbot.offsetTop;
    document.body.style.userSelect = "none"; // Desactiva la selección de texto
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    chatbot.style.left = `${e.clientX - offsetX}px`;
    chatbot.style.top = `${e.clientY - offsetY}px`;
    chatbot.style.bottom = ""; // Elimina la posición inferior para mover libremente
    chatbot.style.right = "";  // Elimina la posición derecha para mover libremente
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = ""; // Reactiva la selección de texto
});

// Eventos para touch
header.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    isDragging = true;
    offsetX = touch.clientX - chatbot.offsetLeft;
    offsetY = touch.clientY - chatbot.offsetTop;
    document.body.style.userSelect = "none"; // Desactiva la selección de texto
});

header.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    chatbot.style.left = `${touch.clientX - offsetX}px`;
    chatbot.style.top = `${touch.clientY - offsetY}px`;
    chatbot.style.bottom = ""; // Elimina la posición inferior para mover libremente
    chatbot.style.right = "";  // Elimina la posición derecha para mover libremente
});

header.addEventListener("touchend", () => {
    isDragging = false;
    document.body.style.userSelect = ""; // Reactiva la selección de texto
});