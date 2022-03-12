export default class Player {
    static STATUSES = {
        JOINED: 'joined',
        PLAYING: 'playing',
        WON: 'won',
        LOST: 'lost'
    };

    publicKey;
    status = 'not_joined';

    constructor(publicKey) {
        this.publicKey = publicKey;
    }

    join() {
        this.status = Player.STATUSES.JOINED;
    }

    play() {
        this.status = Player.STATUSES.PLAYING;
    }

    win() {
        this.status = Player.STATUSES.WON;
    }

    lose() {
        this.status = Player.STATUSES.LOST;
    }
}
