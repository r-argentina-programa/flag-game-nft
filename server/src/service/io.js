import {SECONDS_PER_MESSAGE} from "../utils/constants.js";
import {Server as Socket} from "socket.io";

export default function setupIo(server) {
    const io = new Socket(server, {
        cors: {
            origin: process.env.FRONTEND_URL
        }
    });

    io.on('connection', () => {
        console.log('a user connected');
    });
    setInterval(() => io.emit('message', 'This is supposed to be a pixel'), SECONDS_PER_MESSAGE);
}
