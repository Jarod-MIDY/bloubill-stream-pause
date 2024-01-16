import { GameInterface } from "./Game/GameInterface";
import { Game as SnakeGame } from "../Snake/Game";
import { Game as P4Game } from "../Power4/Game";
import { GameUI } from "./UI/GameUI";
import { HTMLSelectors } from "./Enum/HTMLSelectors";
import { GameStorage } from "./Game/GameStorage";
import { GameSave } from "./Game/GameSave";

export class RandomGameSelector {
    
    allowedGames = { SnakeGame };
    
    currentGame: GameInterface;
    canvas: HTMLCanvasElement;
    urlParams: URLSearchParams;
    gameUI: GameUI;
    gameStorage: GameStorage;
    gameType: string;

    constructor(urlParams: URLSearchParams, createNewGame: Boolean = false) {
        this.canvas = document.querySelector(HTMLSelectors.canvas) as HTMLCanvasElement
        this.gameStorage = new GameStorage("game");
        this.gameUI = new GameUI();
        this.urlParams = urlParams
        this.currentGame = (createNewGame) ? this.selectNewGame() : this.loadGame();
        this.gameStorage.save(new GameSave(this.gameType, this.currentGame));
    }

    getCurrentGame() {
        return this.currentGame;
    }

    loadGame(): GameInterface {
        let loadedGame = this.gameStorage.load();
        if (!loadedGame || !loadedGame.type) {
            return this.selectNewGame()
        } else {
            return new this.allowedGames[loadedGame.type](this.canvas, this.gameUI, this.gameStorage);
        }
    }

    selectNewGame(): GameInterface {
        var selectedGame: string = Object.keys(this.allowedGames)[Math.floor(Math.random()*Object.keys(this.allowedGames).length)];
        return new this.allowedGames[selectedGame](this.canvas, this.gameUI, this.gameStorage);
    }
}