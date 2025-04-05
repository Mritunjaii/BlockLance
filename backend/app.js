const http = require('http');
const socketio = require('socket.io');
const { setupWebSocket } = require('./websocket');

const app = require('./app');
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Setup WebSocket
setupWebSocket(io);

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});