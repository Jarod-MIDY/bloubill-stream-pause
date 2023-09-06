export class GameTimer {
  waitingTime: number;
  now: number;
  constructor(waitingTime: number) {
    this.waitingTime = waitingTime;
    this.now = Date.now();
  }

  getTimeElapsed(): number {
    return Date.now() - this.now;
  }

  stopWating(timeOffset: number = 0): boolean {
    return this.getTimeElapsed() >= this.waitingTime + timeOffset
      ? true
      : false;
  }

  reset() {
    this.now = Date.now();
  }
}
