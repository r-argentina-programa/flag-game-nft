import {Asset, BASE_FEE, Keypair, Operation, Server, TransactionBuilder} from "stellar-sdk";

export async function createGameMasterAccount(funderKeyPair) {
    const server = new Server(process.env.STELLAR_NETWORK);
    const funderPublicKey = funderKeyPair.publicKey();
    const funderAccount = await server.loadAccount(funderPublicKey);
    const gameMasterKeyPair = Keypair.random();
    const transaction = await new TransactionBuilder(funderAccount, {
        networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
        fee: BASE_FEE
    }).addOperation(Operation.createAccount({
        source: funderPublicKey,
        destination: gameMasterKeyPair.publicKey(),
        startingBalance: "100"
    })).setTimeout(300).build();

    transaction.sign(funderKeyPair);
    await server.submitTransaction(transaction);
    return gameMasterKeyPair;
}

export async function createFlagNft(gameMasterKeyPair, flag) {
    try {
        const server = new Server(process.env.STELLAR_NETWORK);
        const gameMasterPublicKey = gameMasterKeyPair.publicKey();
        const gameMasterAccount = await server.loadAccount(gameMasterPublicKey);
        const nftIssuerKeyPair = Keypair.random();
        const nftIssuerPublicKey = nftIssuerKeyPair.publicKey();
        const nftAsset = new Asset(flag, nftIssuerPublicKey);

        console.log(gameMasterAccount.account_id, 'will fund', nftIssuerKeyPair.publicKey(), 'for', flag);

        const transaction = new TransactionBuilder(gameMasterAccount, {
            networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
            fee: BASE_FEE
        })
            .addOperation(
                Operation.createAccount({
                    source: gameMasterPublicKey,
                    destination: nftIssuerKeyPair.publicKey(),
                    startingBalance: '1'
                })
            )
            .addOperation(
                Operation.changeTrust({
                    source: gameMasterPublicKey,
                    asset: nftAsset,
                    limit: "0.0000001"
                })
            )
            .addOperation(Operation.payment({
                source: nftIssuerPublicKey,
                asset: nftAsset,
                destination: gameMasterPublicKey,
                amount: "0.0000001"
            }))
            .addOperation(Operation.setOptions({
                source: nftIssuerPublicKey,
                masterWeight: 0
            }))
            .setTimeout(300)
            .build();

        transaction.sign(gameMasterKeyPair);
        transaction.sign(nftIssuerKeyPair);
        await server.submitTransaction(transaction);
    } catch (e) {
        console.error('ERROR!', e, e.response && e.response.data);
    }
}
