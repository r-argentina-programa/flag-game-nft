import {config} from 'dotenv';
import {flags} from "../shared/flags.js";
import {generateFlagMap} from "./flagsSetup.js";
import {createAccount, createFlagNft, lockAccount} from "./stellarSetup.js";
import {Keypair} from "stellar-sdk";

config();

async function init() {
    for (const flag of flags) {
        await generateFlagMap(flag);
    }

    const funderKeyPair = Keypair.fromSecret(
        process.env.FUNDER_SECRET_KEY
    );

    const gameMasterKeyPair = await createAccount(funderKeyPair);
    console.log(funderKeyPair.publicKey(), 'funded game master', gameMasterKeyPair.publicKey(), gameMasterKeyPair.secret());
    const nftIssuerKeyPair = await createAccount(funderKeyPair);
    console.log(funderKeyPair.publicKey(), 'funded nft issuer', nftIssuerKeyPair.publicKey());
    for (const flag of flags) {
        await createFlagNft(gameMasterKeyPair, nftIssuerKeyPair, flag);
    }
    console.log('all flags created');
    await lockAccount(nftIssuerKeyPair);
}

init().then(_ => console.log('setup script finished'));
