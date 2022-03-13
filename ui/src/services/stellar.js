import {TransactionBuilder} from "stellar-sdk";

export function signJoinXdr(joinXdr, keyPair) {
    const tx = TransactionBuilder.fromXDR(joinXdr, import.meta.env.VITE_STELLAR_NETWORK_PASSPHRASE);
    tx.sign(keyPair);
    return tx.toXDR();
}
