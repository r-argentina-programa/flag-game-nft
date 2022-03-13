export default class Player {
    constructor({publicKey = '', status = 'not_joined', nfts = []} = {}) {
        this.publicKey = publicKey;
        this.status = status;
        this.nfts = nfts;
    }

    get shortPublicKey() {
        return this.publicKey.slice(0, 3).concat('...').concat(this.publicKey.substr(-3));
    }
}
