import { HTMLSelectors } from "../Enum/HTMLSelectors";
import { UIPoint } from "./UIPoint";

export class GameUI {
    scoreElements: HTMLElement[] = [];
    highScoreElement: HTMLElement;
    gameLogsElement: HTMLElement;
    leaderboardElement: HTMLElement;
    cmdTextElement: HTMLElement;
    gameUIElement: HTMLElement;
    constructor() {
      this.leaderboardElement = document.querySelector(HTMLSelectors.leaderboard);
      this.cmdTextElement = document.querySelector(HTMLSelectors.cmdText);
      this.gameLogsElement = document.querySelector(HTMLSelectors.gameLogs);
      this.gameUIElement = document.querySelector(HTMLSelectors.gameUI);
    }
    
    createLeaderboard(customLeaderboard: boolean = false) {
      this.highScoreElement = this.newScoreElement('Highscore : ', '', true)
      this.leaderboardElement.appendChild(this.highScoreElement)

      if (!customLeaderboard) {
        this.newScoreElement('Score  : ', 0)
        this.leaderboardElement.appendChild(this.scoreElements[0])
      }
    }

    setScore(point: UIPoint|number, index?: number|string) {
      index = index ?? 0;
      this.scoreElements[index].querySelector('span').innerHTML = point.toString();
    }

    setHighScore(point: UIPoint|number) {
      this.highScoreElement.querySelector('span').innerHTML = point.toString();
    }

    newScoreElement(text: string, index: number|string, isHighScore:boolean = false): HTMLElement {
      let element = document.createElement('p')
      element.classList.add('score-text')
      element.innerHTML = text;
      let child = document.createElement('span')
      child.innerHTML = '0';
      element.appendChild(child)
      if (!isHighScore) {
        this.scoreElements[index] = element;
      }
      return element
    }

    addToLeaderboard(elements: HTMLElement[]) {
      elements.forEach((element) => {
        this.leaderboardElement.appendChild(element)
      })
    }

    addToGameUI(elements: HTMLElement[]) {
      elements.forEach((element) => {
        this.gameUIElement.appendChild(element)
      })
    }

    addLogEvent(message: string) {
      // select Template
      const gameLogMessageTemplate: HTMLTemplateElement = document.querySelector(
        HTMLSelectors.templateGameLogsMSG
      ) as HTMLTemplateElement;
      // Clone Template for display
      const logClone = gameLogMessageTemplate.content.cloneNode(true) as Element;
      // Select msg container
      let msgText: HTMLElement = logClone.querySelector(
        HTMLSelectors.msgText
      ) as HTMLElement;
      // fill msg
      msgText.textContent = message;
      // display
      this.gameLogsElement.prepend(logClone);
    }
}
