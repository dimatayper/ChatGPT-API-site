const form = document.getElementById("chatform");
const chatlog = document.getElementById("chatlog");
const usermsg = document.getElementById("usermsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = usermsg.value;
  addMessage("You", message);
  sendMessage(message);
  usermsg.value = "";
});

function addMessage(user, message) {
  const messageNode = document.createElement("div");
  messageNode.innerHTML = `<strong>${user}:</strong> ${message}`;
  chatlog.appendChild(messageNode);
  chatlog.scrollTop = chatlog.scrollHeight;
}

async function sendMessage(message) {
  const response = await fetch("/api/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  addMessage("ChatGPT", data.response);
}
