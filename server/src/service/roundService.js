import {StellarService} from "./stellarService.js";
import Player from "../entity/player.js";
import * as socketService from './io.js';

export class RoundService {
    async open(round) {
        const flag = await this.getRandomFlag();
        round.open(flag);
        return round;
    }

    close(round) {
        round.close();
        socketService.sendPixelEnd();
        return round;
    }

    start(round) {
        round.start();
        socketService.sendPixelStart(round.flag)
    }

    findPlayer(round, playerId) {
        return round.players.find(p => p.publicKey = playerId);
    }

    async getJoinOffer(round, playerId) {
        const player = this.findPlayer(round, playerId);
        if (player) {
            throw new Error(`Player ${playerId} has already joined this round`);
        }
        const stellarService = new StellarService();
        return stellarService.getJoinTransaction(playerId);
    }

    async handleJoinRequest(round, playerId, joinXdr) {
        const player = this.findPlayer(round, playerId);
        if (player) {
            throw new Error(`Player ${playerId} has already joined this round`);
        }

        const newPlayer = new Player(playerId);

        if (process.env.DEVELOPMENT_SKIP_JOIN_FEE !== "true") {
            const stellarService = new StellarService();
            await stellarService.submitJoinTransaction(joinXdr);
        }

        round.addPlayer(newPlayer);

        return newPlayer;
    }

    async handleAnswer(round, playerId, flag) {
        if (!round.isPlaying) {
            throw new Error("The round is not being played");
        }
        const player = this.findPlayer(round, playerId);
        if (!player) {
            throw new Error(`Player ${playerId} is not playing`);
        }

        round.evaluatePlayerAnswer(player, flag);

        return player;
    }

    async getPayWinnerTransaction(round, winner) {
        const stellarService = new StellarService();
        return stellarService.getPayWinnerTransaction(round, winner);
    }

    async getRandomFlag() {
        const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;
        const nftIssuerPublicKey = process.env.NFT_ISSUER_PUBLIC_KEY;
        const stellarService = new StellarService();
        const account = await stellarService.getAccount(gameMasterPublicKey);
        const validAssets = account.balances.filter(balance => balance.asset_issuer === nftIssuerPublicKey);
        const randomAsset = validAssets[Math.floor(Math.random() * validAssets.length)];
        return randomAsset.asset_code;
    }
}
