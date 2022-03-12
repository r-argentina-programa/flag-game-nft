import {Asset, BASE_FEE, Keypair, Operation, Server, TransactionBuilder} from "stellar-sdk";

export async function createAccount(funderKeyPair) {
    const server = new Server(process.env.STELLAR_NETWORK);
    const funderPublicKey = funderKeyPair.publicKey();
    const funderAccount = await server.loadAccount(funderPublicKey);
    const newKeyPair = Keypair.random();
    const transaction = await new TransactionBuilder(funderAccount, {
        networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
        fee: BASE_FEE
    }).addOperation(Operation.createAccount({
        source: funderPublicKey,
        destination: newKeyPair.publicKey(),
        startingBalance: "10"
    })).setTimeout(300).build();

    transaction.sign(funderKeyPair);
    await server.submitTransaction(transaction);
    return newKeyPair;
}

export async function lockAccount(keyPair) {
    const server = new Server(process.env.STELLAR_NETWORK);
    const publicKey = keyPair.publicKey();
    const account = await server.loadAccount(publicKey);

    console.log('locking', publicKey, '...');

    const transaction = new TransactionBuilder(account, {
        networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
        fee: BASE_FEE
    })
        .addOperation(Operation.setOptions({
            source: publicKey,
            masterWeight: 0
        }))
        .setTimeout(300)
        .build();

    transaction.sign(keyPair);
    await server.submitTransaction(transaction);
    console.log('locked', publicKey);
}

export async function createFlagNft(gameMasterKeyPair, nftIssuerKeyPair, flag) {
    try {
        const server = new Server(process.env.STELLAR_NETWORK);
        const gameMasterPublicKey = gameMasterKeyPair.publicKey();
        const gameMasterAccount = await server.loadAccount(gameMasterPublicKey);
        const nftIssuerPublicKey = nftIssuerKeyPair.publicKey();
        const nftAsset = new Asset(flag, nftIssuerPublicKey);

        console.log('creating nft', flag, 'by', nftIssuerPublicKey);

        const transaction = new TransactionBuilder(gameMasterAccount, {
            networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE,
            fee: BASE_FEE
        })
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
            .setTimeout(300)
            .build();

        transaction.sign(gameMasterKeyPair);
        transaction.sign(nftIssuerKeyPair);
        await server.submitTransaction(transaction);
    } catch (e) {
        console.error('ERROR!', e, e.response && e.response.data);
    }
}
