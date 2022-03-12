import {StellarService} from "./stellarService.js";
import Player from "../entity/player.js";

export class RoundService {
    async open(round) {
        const flag = await this.getRandomFlag();
        round.open(flag);
        return round;
    }

    close(round) {
        round.close();
        return round;
    }

    findPlayer(round, playerId) {
        return round.players.find(p => p.publicKey = playerId);
    }

    async getJoinOffer(round, playerId) {
        const player = this.findPlayer(round, playerId);
        if (player) {
            throw new Error(`Player ${playerId} has already joined this round`);
        }
        const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;
        const stellarService = new StellarService();
        return stellarService.getJoinTransaction(gameMasterPublicKey, playerId);
    }

    async join(round, playerId, joinXdr) {
        const player = this.findPlayer(round, playerId);
        if (player) {
            throw new Error(`Player ${playerId} has already joined this round`);
        }

        const newPlayer = new Player(playerId);
        const stellarService = new StellarService();
        await stellarService.submitJoinTransaction(joinXdr);

        round.addPlayer(newPlayer);

        return newPlayer;
    }

    async getRandomFlag() {
        const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;
        const nftIssuerPublicKey = process.env.NFT_ISSUER_PUBLIC_KEY;
        const account = await stellarService.getAccount(gameMasterPublicKey);
        const validAssets = account.balances.filter(balance => balance.asset_issuer === nftIssuerPublicKey);
        const randomAsset = validAssets[Math.floor(Math.random() * validAssets.length)];
        return randomAsset.asset_code;
    }
}
