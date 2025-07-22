const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let userName = "";

  socket.on('user joined', (name) => {
    userName = name;
    io.emit('user joined', name);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    if (userName) {
      io.emit('user left', userName);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
