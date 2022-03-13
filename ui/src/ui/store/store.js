import {writable} from 'svelte/store';
import {Keypair} from "stellar-sdk";

const privateKey = localStorage.getItem('privateKey');

export const isOpen = writable(false);
export const isFinished = writable(false);
export const isResultVisible = writable(false);
export const isConnected = writable(!!privateKey);
export const player = writable(false);
export const publicKey = writable(privateKey ? Keypair.fromSecret(privateKey).publicKey() : '');
export const winner = writable(false);
export const prize = writable('');
export const flagName = writable('');
export const flagImage = writable('');
export const userNFTs = writable([]);
