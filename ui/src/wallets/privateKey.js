import {Keypair} from 'stellar-sdk';
import {isConnected, player} from '../stores/main';

export default class PrivateKey {
    async logIn(privateKey) {
        try {
            const publicKey = Keypair.fromSecret(privateKey).publicKey();
            if (publicKey) {
                isConnected.set(true);
                player.update(p => {
                    p.publicKey = publicKey;
                    return p;
                })
                localStorage.setItem('privateKey', privateKey);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
