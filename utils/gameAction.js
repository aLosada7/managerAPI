class GameAction{
    constructor(time, action, message) {
        this.time = this.fmtMSS(time);
        this.action = action;
        this.message = message;
    }

    fmtMSS(seconds) {
        return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
    }
}

module.exports = GameAction;