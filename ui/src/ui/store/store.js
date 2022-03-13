import { writable } from 'svelte/store';

export const isOpen = writable(true);
export const isFinished = writable(false);
export const isResultVisible = writable(false);
export const isConnected = writable(false);
export const player = writable(false);
export const publicKey = writable([]);
export const winner = writable(false);
export const prize = writable('');
export const flagName = writable('');
export const flagImage = writable('');
export const userNFTs = writable([]);
