import {Asset, BASE_FEE, Keypair, Operation, Server, TransactionBuilder} from "stellar-sdk";

export class StellarService {
    getAccount(account) {
        const server = new Server(process.env.STELLAR_NETWORK);
        return server.loadAccount(account);
    }

    async getJoinTransaction(playerPublicKey) {
        const gameMasterPublicKey = process.env.GAME_MASTER_PUBLIC_KEY;
        const server = new Server(process.env.STELLAR_NETWORK);
        const playerAccount = await server.loadAccount(playerPublicKey);
        return new TransactionBuilder(playerAccount, {
            networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE, fee: BASE_FEE
        }).addOperation(Operation.payment({
            source: playerPublicKey, amount: "100", destination: gameMasterPublicKey, asset: Asset.native()
        })).setTimeout(300).build();

    }

    async submitJoinTransaction(xdr) {
        const server = new Server(process.env.STELLAR_NETWORK);
        const tx = TransactionBuilder.fromXDR(xdr, process.env.STELLAR_NETWORK_PASSPHRASE);
        return server.submitTransaction(tx);
    }

    async getPayWinnerTransaction(round, winner) {
        try {
            const server = new Server(process.env.STELLAR_NETWORK);
            const nftAssetCode = round.flag;
            const nftIssuer = process.env.NFT_ISSUER_PUBLIC_KEY;
            const nftAsset = new Asset(nftAssetCode, nftIssuer);
            const gameMasterKeyPair = Keypair.fromSecret(process.env.GAME_MASTER_SECRET_KEY);

            const xlmToPayOut = round.getPrize().toFixed(7);

            console.log(xlmToPayOut);

            const account = await server.loadAccount(winner.publicKey);

            const tx = new TransactionBuilder(account, {
                fee: BASE_FEE, networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE
            })
                .addOperation(Operation.payment({
                    source: gameMasterKeyPair.publicKey(),
                    asset: Asset.native(),
                    amount: xlmToPayOut,
                    destination: winner.publicKey
                }))
                .addOperation(Operation.changeTrust({
                    source: winner.publicKey,
                    asset: nftAsset,
                    limit: "0.0000001"
                }))
                .addOperation(Operation.payment({
                    source: gameMasterKeyPair.publicKey(),
                    asset: nftAsset,
                    amount: "0.0000001",
                    destination: winner.publicKey
                })).setTimeout(300).build();

            tx.sign(gameMasterKeyPair);

            return tx;
        } catch (e) {
            console.error(e.response.data.extras);
            throw e;
        }
    }
}
