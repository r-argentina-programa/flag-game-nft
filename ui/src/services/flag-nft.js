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
        return response;
    }
}

export async function getWinners() {
    const result = await fetch(`${BASE_URL}/player/winners`);
    return result.json();
}
