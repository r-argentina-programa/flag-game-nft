import {writable} from 'svelte/store';
import {Keypair} from "stellar-sdk";
import Round from "../entities/round.js";
import Player from "../entities/player.js";

const privateKey = localStorage.getItem('privateKey');
const tmpPlayer = new Player();
if(privateKey){
    tmpPlayer.publicKey = Keypair.fromSecret(privateKey).publicKey();
}
// player
export const player = writable(tmpPlayer);
export const isConnected = writable(!!privateKey);
export const publicKey = writable(privateKey ? player.publicKey : '');
export const keyPair = writable(privateKey ? Keypair.fromSecret(privateKey) : null);

// round
export const round = writable(new Round());

export const flagName = writable('');
export const flagImage = writable('');
