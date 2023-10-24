import { GameInterface } from "../Shared/Game/GameInterface";
import { GameStorage } from "../Shared/Game/GameStorage";
import { Grid } from "../Shared/Game/Grid";
import { GameUI } from "../Shared/Game/GameUI";
import { GameTimer } from "../Shared/Game/GameTimer";
import { GameLogger } from "../Shared/Game/GameLogger";
import { CommandList } from "./CommandList";
import { GameLogs } from "./GameLogs";
import { Params } from "../Snake/SnakeParamsType";
import { Team } from "../Shared/Team";
import { Coin } from "./Coin";
import { GridPoint } from "../Shared/Game/GridPointType";

export class Game implements GameInterface {
    score: number = 0;
    highScore: number = 0;
    cheatActivated: boolean = false;
    cheatLoopCount = 0;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    storage: GameStorage;
    gameLogs: GameLogger;
    lastGame: Game;
    gameUI: GameUI;
    timer: GameTimer;
    grid: Grid;
    commandList: CommandList;
    power4Params : Params;
    teams: Team[];
    playingTeam: Team;
    currentCoin: null|Coin = null;
    placedCoins: Coin[] = [];


    constructor(canvas: HTMLCanvasElement, gameUI: GameUI, forceReset: boolean = false) {
        this.canvas = canvas;
        this.gameUI = gameUI;
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.storage = new GameStorage(this, "game");
        this.commandList = new CommandList();
        this.lastGame = this.storage.load();
        this.gameLogs = new GameLogger(this.gameUI, new GameLogs())
        this.grid = new Grid(this.canvas, 7);
        this.teams = [
            new Team('YellowTeam', 'yellow'),
            new Team('RedTeam', 'red'),
        ];
        this.playingTeam = this.teams[0];
        this.timer = new GameTimer(100);
    }

    readMessage(message: string): void {
        this.commandList.addCmdToExecute(message);
    }

    getSpeed(): number {
        return 0
    }

    getAllowedMessages(): string {
        return this.commandList.getAllowedCmds();
    }

    checkWinner() {
        // vérifie si 4 pieces sont aligner (ligne, colone ou diagonale)
        // appel addPoint si c'est le cas
        // appel reset si c'est le cas
        // sinon rien, la partie continue
    }
    
    loop() {
        // clear frame
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (null === this.currentCoin) {
            this.currentCoin = new Coin({x:0,y:0}, this.grid, this.context, this.playingTeam);
        } else {
            this.currentCoin.draw();
        }
        this.placedCoins.forEach((coin) => {
            coin.draw()
        })
        if (this.timer.stopWating(this.getSpeed())) {
            // update
            this.commandList.cmdToExecute.forEach((cmd) => {
                if (this.currentCoin) {
                    if (cmd === "place") {
                        this.place(this.currentCoin.getPosition())
                        this.checkWinner()
                    } else {
                        console.log(cmd);
                        this.currentCoin.move(cmd);
                    }
                }
            });
            this.commandList.cmdToExecute = [];
            this.storage.save(this);
            this.timer.reset();
        }
    }

    place(position: GridPoint) {
        if (!(this.grid.isCellOccupied({x:position.x , y: position.y + 1}))) {
            for (let index = 6; index > 1; index--) {
                if (!(this.grid.isCellOccupied({x:position.x, y: index}))) {
                    console.log(this.grid.isCellOccupied({x:position.x, y: index}));
                    this.currentCoin.setPosition({x:position.x, y: index})
                    break;
                }
            }
            this.placedCoins.push(this.currentCoin);
            this.currentCoin = null;
            this.setNextTeam();
        }
    }

    setNextTeam() {
        let index = this.teams.indexOf(this.playingTeam);
        this.playingTeam = this.teams[(index + 1) % this.teams.length];
    }

    addPoint(point: number): void {
        this.score += point;
        this.gameUI.addToScore(this.score);
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.gameUI.addToHighScore(this.highScore);
            this.storage.save(this);
        }
        if (this.score < 0) {
            this.reset();
        }
    }

    getParams(): Params {
        if (this.lastGame.power4Params) {
        return this.lastGame.power4Params;
        }
        return this.power4Params;
    }

    reset() {
        this.grid.clearCells();
        this.score = 0;
        this.gameUI.addToScore(this.score);
        this.storage.clear();
    }

    toggleCheat(bool = false) {
        this.cheatActivated = bool;
    }

    getCheatCommand(): string[] {
        return this.commandList.cheatCommand;
    }
}
