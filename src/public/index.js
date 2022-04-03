let socket = io();
let chatBox = document.getElementById("chatBox");
let log = document.getElementById("log");
let user;
//ALERT DE IDENTIFICACION
Swal.fire({
  title: "Identificate",
  input: "text",
  allowOutsideClick: false,
  inputValidator: (value) => {
    return !value && "¡Necesitas escribir un nombre de usuario!";
  },
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      //POR LO MENOS SE ENVIA UN SIMBOLO
      let now = new Date().toLocaleString();
      socket.emit("message", { user, now, message: chatBox.value.trim() });
      chatBox.value = "";
    }
  }
});

//SOCKETS
socket.on("log", (log) => {
  log.innerHTML = log;
});

socket.on("log", (data) => {
  let messages = "";
  data.forEach((log) => {
    messages =
      messages +
      `<p> <strong style="color:blue">${log.user}</strong> <span style="color:red">[${log.now}]</span><span style="color:black">:</span> <span style="color:green">${log.message}</span></p></br>`;
  });
  log.innerHTML = messages;
});
