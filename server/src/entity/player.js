export default class Player {
    constructor(publicKey) {
        this.publicKey = publicKey;
        this.status = 'not_joined';
    }
    
    join() {
        this.status = 'joined';
    }

    play() {
        this.status = 'playing';
    }

    win() {
        this.status = 'won';
    }

    lose() {
        this.status = 'lost';
    }
}
