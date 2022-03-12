import {config} from 'dotenv';
import {flags} from "./flags.js";
import {generateFlagMap} from "./flagsSetup.js";
import {createFlagNft, createGameMasterAccount} from "./stellarSetup.js";
import {Keypair} from "stellar-sdk";

config();

async function init() {
    for (const flag of flags) {
        await generateFlagMap(flag);
    }

    const funderKeyPair = Keypair.fromSecret(
        process.env.FUNDER_SECRET_KEY
    );

    const gameMasterKeyPair = await createGameMasterAccount(funderKeyPair);

    console.log(funderKeyPair.publicKey(), 'funded game master', gameMasterKeyPair.publicKey(), gameMasterKeyPair.secret());
    for (const flag of flags) {
        await createFlagNft(gameMasterKeyPair, flag);
    }
}

init().then(_ => console.log('setup script finished'));
