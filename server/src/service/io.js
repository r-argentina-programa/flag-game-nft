import { readFileSync } from 'fs';
import {SECONDS_PER_MESSAGE} from "../utils/constants.js";
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

export function sendPixelStart(flag) {
    intervalId = setInterval(() => {
        const pixels = JSON.parse(readFileSync(`../../../shared/data/${flag}.json`));

        const randomIndex1 = Math.floor(Math.random() * pixels.length);
        const randomIndex2 = Math.floor(Math.random() * pixels[randomIndex1].length);
        const randomPixel = pixels[randomIndex1][randomIndex2];
        
        io.emit('RANDOM_PIXEL', randomPixel);
    }, SECONDS_PER_MESSAGE);
}

export function sendPixelEnd() {
    clearInterval(intervalId);
}