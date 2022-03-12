require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL
	}
});
const { SECONDS_PER_MESSAGE } = require('./constants.js');

const PORT = process.env.PORT || 5000;

io.on('connection', () => {
	console.log('a user connected');
});

setInterval(() => io.emit('message', 'This is supposed to be a pixel'), SECONDS_PER_MESSAGE);

server.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
