import Round from "../entity/round.js";
import {RoundService} from "../service/roundService.js";

const roundService = new RoundService();
const round = new Round();

export function setupRoutes(app) {
    app.post('/round', async (req, res) => {
        try {
            await roundService.open(round);
            res.send({round});
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });

    app.get('/round', (req, res) => {
        res.send({round});
    });

    app.delete('/round', (req, res) => {
        try {
            roundService.close(round);
            res.send({round});
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

    /*
    * PUT /round/user/PUBLICKEY <-- suscribe a un jugador a una ronda abierta, en el body recibe {xdr: .... } que es el XDR firmado por el jugador para pagar los 100 XLM para jugar
    * POST /round/user/PUBLICKEY <-- envía la respuesta del jugador para esa ronda
    * */

    app.put('/round/player/:playerId', async (req, res) => {
        try {
            const {playerId} = req.params;
            const {joinXdr} = req.body;
            const player = await roundService.join(round, playerId, joinXdr);
            res.send(player);
        } catch (e) {
            console.error(e);
            res.send({error: e.message})
        }
    });
}
