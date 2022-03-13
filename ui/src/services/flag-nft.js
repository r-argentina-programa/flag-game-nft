import Player from "../entities/player.js";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export async function getRound() {
    const result = await fetch(BASE_URL.concat('/round'));
    return result.json();
}

export async function getPlayer(player) {
    const result = await fetch(`${BASE_URL}/round/player/${player.publicKey}`);
    const response = await result.json();

    if (response.joinOfferXdr) {
        return player;
    } else {
        return new Player(response);
    }
}

export async function getWinners() {
    const result = await fetch(`${BASE_URL}/player/winners`);
    return result.json();
}

export async function getJoinOffer(player) {
    const result = await fetch(`${BASE_URL}/round/player/${player.publicKey}`);
    const response = await result.json();

    if (response.joinOfferXdr) {
        return response.joinOfferXdr;
    } else {
        throw new Error('Player already joined');
    }
}

export async function joinRound(player, signedXdr) {
    const result = await fetch(`${BASE_URL}/round/player/${player.publicKey}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            joinXdr: signedXdr
        })
    });

    const playerData = await result.json();
    return new Player(playerData);
}

export async function submitAnswer(player, flag) {
    const result = await fetch(`${BASE_URL}/round/player/${player.publicKey}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            flag
        })
    });

    const response = await result.json();
    return {
        player: new Player(response.player),
        prizeXdr: response.prizeXdr
    };
}
