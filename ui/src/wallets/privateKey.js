import {Keypair} from 'stellar-sdk';
import {isConnected, keyPair, player} from '../stores/main';

export default class PrivateKey {
    async logIn(privateKey) {
        try {
            const kp = Keypair.fromSecret(privateKey);

            if (kp) {
                isConnected.set(true);
                player.update(p => {
                    p.publicKey = kp.publicKey();
                    return p;
                })
                keyPair.set(kp);
                localStorage.setItem('privateKey', privateKey);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
