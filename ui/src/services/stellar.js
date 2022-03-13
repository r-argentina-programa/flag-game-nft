import {Server, TransactionBuilder} from "stellar-sdk";

export function signJoinXdr(joinXdr, keyPair) {
    const tx = TransactionBuilder.fromXDR(joinXdr, import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE);
    tx.sign(keyPair);
    return tx.toXDR();
}

export async function submitClaimPrizeXdr(xdr, keyPair) {
    try {
        const server = new Server(import.meta.env.VITE_STELLAR_NETWORK);
        const tx = TransactionBuilder.fromXDR(xdr, import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE);
        tx.sign(keyPair);
        await server.submitTransaction(tx);
    } catch (e) {
        console.log(e);
        throw e;
    }
}
