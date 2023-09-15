export class GameUI {
  scoreElement: HTMLElement;
  highScoreElement: HTMLElement;
  gameLogElement: HTMLElement;
  constructor(
    scoreElement: HTMLElement,
    highScoreElement: HTMLElement,
    gameLogElement: HTMLElement
  ) {
    this.scoreElement = scoreElement;
    this.highScoreElement = highScoreElement;
    this.gameLogElement = gameLogElement;
  }

  addToScore(point: number) {
    this.scoreElement.innerHTML = point.toString();
  }

  addToHighScore(point: number) {
    this.highScoreElement.innerHTML = point.toString();
  }

  addLogEvent(message: string) {
    const logWrapper = document.querySelector("#gameLog") as HTMLElement;
    const gameLogMessageTemplate: HTMLTemplateElement = document.querySelector(
      "#gameLog-msg"
    ) as HTMLTemplateElement;
    const logClone = gameLogMessageTemplate.content.cloneNode(true) as Element;
    let msgText: HTMLElement = logClone.querySelector(
      ".msg-text"
    ) as HTMLElement;
    msgText.textContent = message;
    logWrapper.prepend(logClone);
  }
}
