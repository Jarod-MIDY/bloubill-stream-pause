import { GameInterface } from "../Shared/Game/GameInterface";
import { GameStorage } from "../Shared/Game/GameStorage";
import { Grid } from "../Shared/Game/Grid";
import { GameUI } from "../Shared/UI/GameUI";
import { GameTimer } from "../Shared/Game/GameTimer";
import { GameLogger } from "../Shared/Game/GameLogger";
import { CommandList } from "./CommandList";
import { GameLogs } from "./GameLogs";
import { Params } from "../Snake/SnakeParamsType";
import { Team } from "../Shared/Team";
import { Coin } from "./Coin";
import { GridPoint } from "../Shared/Game/GridPointType";
import { UIPoint } from "../Shared/UI/UIPoint";
import { GameSave } from "../Shared/Game/GameSave";

export class Game implements GameInterface {
    cheatActivated: boolean = false;
    cheatLoopCount = 0;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    storage: GameStorage;
    gameLogs: GameLogger;
    gameUI: GameUI;
    timer: GameTimer;
    grid: Grid;
    commandList: CommandList;
    power4Params : Params;
    teams: Team[] = [];
    playingTeam: Team;
    currentCoin: null|Coin = null;
    placedCoins: Coin[] = [];


    constructor(canvas: HTMLCanvasElement, gameUI: GameUI, storage: GameStorage,  forceReset: boolean = false) {
        this.canvas = canvas;
        this.gameUI = gameUI;
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.storage = storage;
        this.grid = new Grid(this.canvas, 7);
        this.commandList = new CommandList();
        this.gameLogs = new GameLogger(this.gameUI, new GameLogs())
        const lastGame = this.storage.load();
        if (!lastGame) {            
            this.teams = [
                new Team('YellowTeam', '#f38d00'),
                new Team('RedTeam', '#cb0000'),
            ];
            this.playingTeam = this.teams[0];
        } else {
            this.loadLastGame(lastGame.game)
        }
        this.timer = new GameTimer(100);
        this.setUI();
    }

    setUI() {
        let UIElements:HTMLElement[] = []
        let wrapper = document.createElement('div')
        this.gameUI.createLeaderboard(true);
        this.teams.forEach((team) => {
            wrapper.appendChild(this.gameUI.newScoreElement('Score : ' + team.name + ' - ', team.name))
        })
        UIElements.push(wrapper);
        this.gameUI.addToGameUI(UIElements)
        this.context.fillStyle = 'pink'
       
    }

    drawP4Grid() {
        this.context.fillStyle = '#0000d9';
        this.context.fillRect(
            0,
            1 * this.grid.getCellWidth(),
            this.grid.getCellWidth() * this.grid.getGridSize(),
            this.grid.getCellWidth() * this.grid.getGridSize() - 1
        );
        for (let i = this.grid.getGridSize() -1; i > 0; i--) {
            for (let j = 0; j < this.grid.getGridSize(); j++) {
                this.context.fillStyle = '#bababa';
                this.context.beginPath();
                this.context.arc(
                    (j + 0.5) * this.grid.getCellWidth(), 
                    (i + 0.5) * this.grid.getCellWidth(), 
                    50, 0, 2 * Math.PI
                    );
                this.context.fill();   
            }
        }
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

    loadLastGame(lastGame: Game) {
        lastGame.teams.forEach(( team ) => {
            let loadedTeam = new Team(team.name,team.color,team.points)
            this.teams.push(loadedTeam)
            if (team.name === lastGame.playingTeam.name) {
                this.playingTeam = loadedTeam;
            }
        })
        if (lastGame.placedCoins.length > 0) {
            lastGame.placedCoins.forEach((coin) => {
                let team = this.teams.filter((team) => coin.team.name === team.getName())
                this.placedCoins.push(new Coin(coin.position, this.grid, this.context, team[0]))
            })
        }
    }

    // vérifie si 4 pieces sont alignées et de la même team (ligne, colonne ou diagonale)
    checkWinner() : null|Team {
        const directions = [
            {x: 0, y: -1}, // haut
            {x: 1, y: -1}, // haut droite
            {x: 1, y:  0}, // droite
            {x: 1 ,y:  1}, // bas droite
        ]

        let win = false
        let winnerTeam: null|Team = null
        this.placedCoins.forEach(coin => {
            if (!win) {
                directions.forEach(dir => {
                    let nbCorrects = 1
                    let currentPos = {
                        x: coin.position.x + dir.x,
                        y: coin.position.y + dir.y
                    }
                    while (
                        nbCorrects <= 4
                        && this.placedCoins.some(c => c.position.x == currentPos.x && c.position.y == currentPos.y && c.team == coin.team)
                    ) {
                        nbCorrects++
                        currentPos.x += dir.x
                        currentPos.y += dir.y
                    }
                    // team win
                    if (nbCorrects >= 4) {
                        win = true
                        winnerTeam = coin.team
                        return
                    }
                }) 
            }
        })
        return winnerTeam
    }
    
    loop() {
        // clear frame
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawP4Grid()
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
                        this.addPoint(this.checkWinner())

                    } else {
                        this.currentCoin.move(cmd);
                    }
                }
            });
            this.commandList.cmdToExecute = [];
            this.storage.save(new GameSave('P4Game',this));
            this.timer.reset();
        }
    }

    place(position: GridPoint) {
        if (!(this.grid.isCellOccupied({x:position.x , y: position.y + 1})) && position.y + 1 < 7) {
            for (let index = 6; index > 0; index--) {
                if (!(this.grid.isCellOccupied({x:position.x, y: index}))) {
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

    addPoint(team: null|Team): void {
        if (team === null) {
            return
        }
        team.addPoint(1);
        this.gameUI.setScore(team.getPoints(), team.name)
        this.setHighScore()
        this.restart(team)
    }

    setHighScore() {
        const winingTeam = this.teams.reduce(function(prev, current) {
            return (prev && prev.getPoints() > current.getPoints()) ? prev : current
        })
        this.gameUI.setHighScore(new UIPoint(winingTeam.name, winingTeam.getPoints()))
    }

    restart(team: Team) {
        this.grid.clearCells();
        this.placedCoins = [];
        if (team === this.playingTeam) {
            this.setNextTeam()
        }
    }

    reset() {
        this.grid.clearCells();
        this.storage.clear();
    }

    toggleCheat(bool = false) {
        this.cheatActivated = bool;
    }

    getCheatCommand(): string[] {
        return this.commandList.cheatCommand;
    }
}
