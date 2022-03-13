import {flags} from '../../../shared/flags.js';
import {BigNumber as B} from "bignumber.js/bignumber.mjs";

export default class Round {
    flagSizeInPixels;
    entryCostInXlm;
    isOpen = false;
    isPlaying = false;
    isClosed = false;
    flag = null;
    players = [];
    pixels = [];
    losers = [];
    winner = null;

    constructor(flagSizeInPixels, entryCostInXlm) {
        this.flagSizeInPixels = flagSizeInPixels;
        this.entryCostInXlm = entryCostInXlm;
    }

    reset() {
        this.players = [];
        this.pixels = [];
        this.losers = [];
        this.winner = null;
    }

    open(flag) {
        if (flags.indexOf(flag) === -1) {
            throw new Error("Invalid flag");
        }
        this.reset();

        this.flag = flag;
        this.isOpen = true;
        this.isPlaying = false;
        this.isClosed = false;
    }

    start() {
        this.isPlaying = true;
        this.isOpen = false;
        this.isClosed = false;
    }

    close() {
        this.reset();
        this.flag = null;
        this.isOpen = false;
        this.isPlaying = false;
        this.isClosed = true;
    }

    addPlayer(player) {
        player.join();
        this.players.push(player);
    }

    evaluatePlayerAnswer(player, flag) {
        if (this.losers.find(p => p.publicKey === player.publicKey)) {
            throw new Error(`Player ${player.publicKey} already lost`);
        }

        if (flag === this.flag) {
            this.declareWinner(player);
            return true;
        }

        player.lose();
        this.losers.push(player);
        return false;
    }

    declareWinner(player) {
        this.isPlaying = true;
        this.isOpen = false;
        this.isClosed = false;
        this.winner = player;
        const playerIndex = this.players.findIndex(p => p.publicKey === this.winner.publicKey);
        this.losers = this.players;
        delete this.losers[playerIndex];
        player.win();
    }

    getPrize() {
        const playerQty = this.players.length;

        return new B(playerQty).multipliedBy(new B(this.entryCostInXlm));
    }
}
