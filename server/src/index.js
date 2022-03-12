import express from 'express';
import http from 'http';
import {Server as Socket} from 'socket.io';
import {SECONDS_PER_MESSAGE} from './constants.js';
import Round from "./round.js";
import {Asset, BASE_FEE, Operation, Server, TransactionBuilder} from "stellar-sdk";

import {config} from "dotenv";

config();

const app = express();
app.use(express.json());

const server = http.createServer(app);
const round = new Round();

const io = new Socket(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

app.post('/round', (req, res) => {
    if (round.isPlaying) {
        throw new Error('Round is still active');
    }
    round.isOpen = true;
    res.send({success: true});
});

app.put('/round', async (req, res) => {
    if (!round.isOpen) {
        throw new Error('Round is not active');
    }

    const server = new Server(process.env.STELLAR_NETWORK);
    const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;

    const body = req.body;
    const {pubKey} = body;

    console.log(pubKey);

    const participantAsset = new Asset("PARTICIPANT", gameMasterPublicKey);

    const playerAccount = await server.loadAccount(pubKey);
    const transaction = new TransactionBuilder(playerAccount, {
        networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
        fee: BASE_FEE
    }).addOperation(Operation.payment({
        source: pubKey,
        amount: "100",
        destination: gameMasterPublicKey,
        asset: Asset.native()
    })).addOperation(Operation.changeTrust({
        source: pubKey,
        asset: participantAsset
    })).addOperation(Operation.payment({
        source: gameMasterPublicKey,
        destination: pubKey,
        asset: participantAsset,
        amount: "1",
    }))
        .setTimeout(300).build();

    res.send(transaction.toXDR());
});


io.on('connection', () => {
    console.log('a user connected');
});


setInterval(() => io.emit('message', 'This is supposed to be a pixel'), SECONDS_PER_MESSAGE);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
