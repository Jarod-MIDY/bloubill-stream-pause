export class GameTimer {
    waitingTime: number;
    now: number;
    constructor (
        waitingTime: number
    ) {
        this.waitingTime = waitingTime;
        this.now = Date.now();
    }

    getTimeElapsed(): number {
        return Date.now() - this.now;
    }

    stopWating(): boolean {
        return (this.getTimeElapsed() >= this.waitingTime) ? true : false;
    }

    reset(){
        this.now = Date.now();
    }
}