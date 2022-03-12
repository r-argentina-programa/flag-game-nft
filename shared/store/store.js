import { writable } from "svelte/store";

export const winner = writable(false);
export const prize = writable("");
export const flagName = writable("");
export const flagImage = writable("");
export const userNFTs = writable([]);
