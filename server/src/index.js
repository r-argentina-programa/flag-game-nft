const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { SECONDS_PER_MESSAGE } = require("./constants.js");
const path = require('path');

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'src/app.html'))
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

setInterval(
  () => io.emit("message", "This is supposed to be a pixel"),
  SECONDS_PER_MESSAGE
);

server.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
