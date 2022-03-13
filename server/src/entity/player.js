export default class Player {
    static STATUSES = {
        JOINED: 'joined',
        WON: 'won',
        LOST: 'lost',
        UNKNOWN: 'unknown'
    };

    publicKey;
    status = 'not_joined';
    nfts = [];

    constructor(publicKey, status, nfts) {
        this.publicKey = publicKey;
        if (status) {
            this.status = status;
        }

        if(nfts){
            this.nfts = nfts;
        }
    }

    join() {
        this.status = Player.STATUSES.JOINED;
    }

    win() {
        this.status = Player.STATUSES.WON;
    }

    lose() {
        this.status = Player.STATUSES.LOST;
    }
}
