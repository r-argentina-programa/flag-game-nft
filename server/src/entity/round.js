import {flags} from '../../../shared/flags.js';

export default class Round {
    constructor() {
        this.isOpen = false;
        this.isPlaying = false;
        this.flag = null;
        this.players = [];
        this.pixels = [];
        this.losers = [];
        this.winner = null;
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
    }

    close() {
        this.reset();
        this.flag = null;
        this.isOpen = false;
        this.isPlaying = false;
    }

    addPlayer(player) {
        player.join();
        this.players.push(player);
    }

    processPlayerAnswer(player, flag) {
        if (flag === this.flag) {
            return this.declareWinner(player);
        }
        this.losers.push(player);
    }

    declareWinner(player) {
        this.winner = player;
        // pay out XLM
        // send io messageS
    }
}
