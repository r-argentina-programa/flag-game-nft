import Round from "../entity/round.js";
import Player from "../entity/player.js";
import {RoundService} from "../service/roundService.js";

const roundService = new RoundService();
const round = new Round(120 * 80, 100);

function getSanitizedRound() {
    const roundClone = {...round};
    delete roundClone.flag;
    return roundClone;
}

export function setupRoutes(app) {
    app.get('/round', (req, res) => {
        console.log('The flag for this round is ', round.flag);
        res.send({round: getSanitizedRound()});
    });

    app.post('/round', async (req, res) => {
        try {
            await roundService.open(round);
            res.send({round: getSanitizedRound()});
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });

    app.put('/round', (req, res) => {
        try {
            roundService.start(round);
            res.send({round: getSanitizedRound()});
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });

    app.delete('/round', (req, res) => {
        try {
            roundService.close(round);
            res.send({round: getSanitizedRound()});
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });

    app.get('/round/player/:playerId', async (req, res) => {
        try {
            const {playerId} = req.params;
            const player = roundService.findPlayer(round, playerId);
            if (player) {
                res.send(player);
            } else {
                const offer = await roundService.getJoinOffer(round, playerId);
                res.send({joinOfferXdr: offer.toXDR()});
            }
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });

    app.put('/round/player/:playerId', async (req, res) => {
        try {
            const {playerId} = req.params;
            const {joinXdr} = req.body;
            const player = await roundService.handleJoinRequest(round, playerId, joinXdr);
            res.send(player);
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });

    app.post('/round/player/:playerId', async (req, res) => {
        try {
            const {playerId} = req.params;
            const {flag} = req.body;

            const player = await roundService.handleAnswer(round, playerId, flag);
            if (player.status === Player.STATUSES.WON) {
                const tx = await roundService.getPayWinnerTransaction(round, player);
                res.send({player, prizeXdr: tx.toXDR()})
            } else {
                res.send({player});
            }

        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });
}
