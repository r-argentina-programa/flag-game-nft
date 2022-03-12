import {Asset, BASE_FEE, Operation, Server, TransactionBuilder} from "stellar-sdk";

export class StellarService {
    getAccount(account) {
        const server = new Server(process.env.STELLAR_NETWORK);
        return server.loadAccount(account);
    }

    async getJoinTransaction(gameMasterPublicKey, playerPublicKey) {
        const server = new Server(process.env.STELLAR_NETWORK);
        const playerAccount = await server.loadAccount(playerPublicKey);
        return new TransactionBuilder(playerAccount, {
            networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
            fee: BASE_FEE
        }).addOperation(Operation.payment({
            source: playerPublicKey,
            amount: "100",
            destination: gameMasterPublicKey,
            asset: Asset.native()
        })).setTimeout(300).build();

    }

    async submitJoinTransaction(xdr) {
        const server = new Server(process.env.STELLAR_NETWORK);
        const tx = TransactionBuilder.fromXDR(xdr, process.env.STELLAR_NETWORK_PASSPHRASE);
        return server.submitTransaction(tx);
    }
}
