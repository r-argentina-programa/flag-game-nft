import {StellarService} from "./stellarService.js";
import Player from "../entity/player.js";
import * as socketService from './io.js';
import {readFileSync} from "fs";
import {SECONDS_PER_MESSAGE} from "../utils/constants.js";

export class RoundService {
    intervalId;

    async open(round) {
        const flag = await this.getRandomFlag();
        round.open(flag);
        socketService.sendRound(this.getSanitizedRound(round));
        return round;
    }

    close(round) {
        round.close();
        socketService.sendRound(this.getSanitizedRound(round));
        clearInterval(this.intervalId);
        return round;
    }

    start(round) {
        round.start();
        socketService.sendRound(this.getSanitizedRound(round));
        const flagMap = readFileSync(`../shared/data/${round.flag}.json`);
        const randomPixels = JSON.parse(flagMap.toString()).sort(() => Math.random() - 0.5);
        let i = 0;
        this.intervalId = setInterval(() => {
            if (i === round.flagSizeInPixels - 1) {
                clearInterval(this.intervalId);
                return;
            }

            const randomPixel = randomPixels[i++];
            socketService.sendPixel(randomPixel);
            round.pixels.push(randomPixel);
        }, SECONDS_PER_MESSAGE);
    }

    findPlayer(round, playerId) {
        return round.players.find(p => p.publicKey === playerId);
    }

    async getPlayer(playerId) {
        const nftIssuerPublicKey = process.env.NFT_ISSUER_PUBLIC_KEY;
        const stellarService = new StellarService();
        const account = await stellarService.getAccount(playerId);
        const NFTs = account.balances.filter(balance => balance.asset_issuer === nftIssuerPublicKey && Number(balance.balance) > 0).map(balance => balance.asset_code);
        return new Player(playerId, null, NFTs);
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

        const isCorrectAnswer = round.evaluatePlayerAnswer(player, flag);

        if (isCorrectAnswer) {
            clearInterval(this.intervalId);
        }

        return player;
    }

    async getPayWinnerTransaction(round, winner) {
        const stellarService = new StellarService();
        return stellarService.getPayWinnerTransaction(round, winner);
    }

    async findWinners() {
        const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;
        const nftIssuerPublicKey = process.env.NFT_ISSUER_PUBLIC_KEY;
        const stellarService = new StellarService();
        const payments = await stellarService.getPaymentsForAccount(gameMasterPublicKey);
        const paymentsToWinners = payments.records.filter(payment =>
            payment.type === 'payment' && payment.from === gameMasterPublicKey && payment.asset_issuer === nftIssuerPublicKey
        );
        const winners = paymentsToWinners.reduce((winners, payment) => {
            if (winners[payment.to]) {
                winners[payment.to].nfts.push(payment.asset_code);
            } else {
                winners[payment.to] = new Player(payment.to, Player.STATUSES.UNKNOWN, [payment.asset_code]);
            }

            return winners;
        }, {});

        return Object.values(winners);
    }

    async getRandomFlag() {
        const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;
        const nftIssuerPublicKey = process.env.NFT_ISSUER_PUBLIC_KEY;
        const stellarService = new StellarService();
        const account = await stellarService.getAccount(gameMasterPublicKey);
        const validAssets = account.balances.filter(balance => balance.asset_issuer === nftIssuerPublicKey && Number(balance.balance) > 0);
        const randomAsset = validAssets[Math.floor(Math.random() * validAssets.length)];
        return randomAsset.asset_code;
    }

    getSanitizedRound(round) {
        const roundClone = {...round};
        delete roundClone.flag;
        delete roundClone.losers;
        delete roundClone.players;
        return roundClone;
    }
}
