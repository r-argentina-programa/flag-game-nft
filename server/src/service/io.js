import {Server as Socket} from "socket.io";

let io;
let intervalId;

export function setupIo(server) {
    io = new Socket(server, {
        cors: {
            origin: process.env.FRONTEND_URL
        }
    });
}

export function sendRound(round) {
    io.emit('ROUND_UPDATE', round);
}

export function sendPixel(pixel) {
    io.emit('RANDOM_PIXEL', pixel);
}
