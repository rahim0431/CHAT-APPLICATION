const socket = io();

function sendMessage() {
  const input = document.getElementById('m');
  if (input.value.trim() !== "") {
    socket.emit('chat message', input.value);
    input.value = '';
  }
}

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('messages').appendChild(li);

  // Auto-scroll to the bottom
  const chatBox = document.getElementById('chat-box');
  chatBox.scrollTop = chatBox.scrollHeight;
});
