import { GameLoggInterface } from "./GameLoggInterface";
import { GameUI } from "./GameUI";

export class GameLogger {

    gameUI: GameUI;
    logList: GameLoggInterface;
    
    constructor(gameUI: GameUI, logList: GameLoggInterface) {
        this.gameUI = gameUI;
        this.logList = logList;
    }

    addLog(logName: string) {
        this.gameUI.addLogEvent(this.logList.getLogText(logName))
    }
}