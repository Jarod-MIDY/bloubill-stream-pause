import { GameInterface } from "../Shared/Game/GameInterface";
import { GameStorage } from "../Shared/Game/GameStorage";
import { Grid } from "../Shared/Game/Grid";
import { EatableFactory } from "./EatableFactory";
import { Snake } from "./Snake";
import { Params } from "./SnakeParamsType";
import { GameUI } from "../Shared/UI/GameUI";
import { CommandList } from "./CommandList";
import { GameTimer } from "../Shared/Game/GameTimer";
import { Eatable } from "./Eatable";
import { GameLogger } from "../Shared/Game/GameLogger";
import { GameLogs } from "./GameLogs";
import { GameSave } from "../Shared/Game/GameSave";
import { Apple } from "./Eatables/Apple";

export class Game implements GameInterface {
  score: number = 0;
  highScore: number = 0;
  snakeParams: Params = {
    position: { x: 5, y: 5 },
    dirX: 1,
    dirY: 0,
    cells: [],
    maxCells: 4,
  };
  cheatActivated: boolean = false;
  cheatLoopCount = 0;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  commandList: CommandList;
  storage: GameStorage;
  gameLogs: GameLogger;
  lastGame: GameSave;
  gameUI: GameUI;
  timer: GameTimer;
  grid: Grid;
  snake: Snake;
  eatables: Array<Eatable> = [];
  EatableFactory: EatableFactory;

  constructor(canvas: HTMLCanvasElement, gameUI: GameUI, storage: GameStorage) {
    this.canvas = canvas;
    this.gameUI = gameUI;
    this.storage = storage;
    this.setUI();
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.commandList = new CommandList();
    this.lastGame = this.storage.load();
    console.log(this.lastGame);
    this.gameLogs = new GameLogger(this.gameUI, new GameLogs())
    this.grid = new Grid(this.canvas, 25);
    this.EatableFactory = new EatableFactory(this.context, this.grid);
    if (this.lastGame && this.lastGame.type === 'SnakeGame') {
      this.loadLastGame(this.lastGame.game as Game);
    } else {
      this.snake = new Snake(this.context, this.snakeParams, this.grid);
      this.eatables.push(this.EatableFactory.getNewEatable("Apple"));
    }
    this.timer = new GameTimer(1000);
  }

  loadLastGame(lastGame: Game) {
      this.snake = new Snake(this.context, lastGame.snake.params, this.grid);
      lastGame.eatables.forEach((eatable: Eatable) => {
        this.eatables.push(this.EatableFactory.getNewEatable(eatable.type, eatable.position));
      });
      this.gameUI.setHighScore(lastGame.highScore);
      this.gameUI.setScore(lastGame.score);
      this.score = lastGame.score;
      this.highScore = lastGame.highScore;
  }

  readMessage(message: string): void {
    this.commandList.addCmdToExecute(message);
  }

  getSpeed(): number {
    return this.snake.getSpeed();
  }

  getAllowedMessages(): string {
    return this.commandList.getAllowedCmds();
  }
  
  setUI() {
    this.gameUI.createLeaderboard();
  }

  loop() {
    // clear frame
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.timer.stopWating(this.getSpeed())) {
      // update snake
      this.commandList.cmdToExecute.forEach((cmd) => {
        this.snake.updateDirection(cmd);
        this.snake.move();
      });
      if(!this.commandList.cmdToExecute.length) this.snake.move();
      this.commandList.cmdToExecute = [];
      this.timer.reset();
      this.manageColision();
      // Create new eatable
      if (this.eatables.length < Math.floor(this.score/2))
      {
        this.eatables.push(this.EatableFactory.getNewEatable());
      }
      this.storage.save(new GameSave('SnakeGame',this));
    }
    // cheats deactivation
    if (this.cheatLoopCount === 600) {
      this.cheatActivated = false;
      this.cheatLoopCount = 0;
    } else if (this.cheatActivated) {
      this.cheatLoopCount++
    }
    // draw snake
    this.snake.draw();
    // draw eatables
    if (this.eatables.length > 0) {
      this.eatables.forEach((eatable) => {
        eatable.draw(this.cheatActivated);
      });
    }
  }

  manageColision() {
    let head = this.snake.params.cells[0];
    if(this.snake.params.cells.findIndex((bodyPart, i) => {
        return i != 0 && head.x == bodyPart.x && head.y == bodyPart.y
      }) !== -1) {
        this.gameLogs.addLog("game_over")
        this.reset();
        return
    }
    let collidedEatable = this.eatables.find(eatable => {
      return head.x == eatable.position.x && head.y == eatable.position.y
    })
    if (collidedEatable) {
      this.addPoint(collidedEatable.doEffect(this.snake));
      this.gameLogs.addLog(collidedEatable.getLogName());
      if (collidedEatable instanceof Apple) {
        collidedEatable.newRandomPosition();
      } else {
        this.grid.clearCell(collidedEatable.position);
        this.eatables.splice(this.eatables.indexOf(collidedEatable), 1);
      }
    }
}

  addPoint(point: number): void {
    this.score += point;
    this.gameUI.setScore(this.score);
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.gameUI.setHighScore(this.highScore);
    }
    if (this.score < 0) {
      this.reset();
    }
  }

  reset() {
    this.grid.clearCells();
    this.snake.params = this.snakeParams;
    this.eatables = [this.EatableFactory.getNewEatable("Apple")];
    this.score = 0;
    this.gameUI.setScore(this.score);
    this.storage.clear();
  }

  toggleCheat(bool = false) {
    this.cheatActivated = bool;
  }

  getCheatCommand(): string[] {
    return this.commandList.cheatCommand;
  }
}
