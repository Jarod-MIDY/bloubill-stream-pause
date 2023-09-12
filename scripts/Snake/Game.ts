import { GameInterface } from "../Shared/GameInterface";
import { GameStorage } from "../Shared/GameStorage";
import { Grid } from "../Shared/Grid";
import { EatableFactory } from "./EatableFactory";
import { Snake } from "./Snake";
import { Params } from "./SnakeParamsType";
import { GameUI } from "../Shared/GameUI";
import { CommandList } from "./CommandList";
import { GameTimer } from "../Shared/GameTimer";
import { Eatable } from "./Eatable";
import { GameLogger } from "../Shared/GameLogger";
import { GameLogs } from "./GameLogs";

export class Game implements GameInterface {
  score: number = 0;
  highScore: number = 0;
  snakeParams: Params = {
    position: { x: 160, y: 160 },
    dirX: 1,
    dirY: 0,
    cells: [],
    maxCells: 5,
  };
  cheatActivated: boolean = false;
  cheatLoopCount = 0;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  commandList: CommandList;
  storage: GameStorage;
  gameLogs: GameLogger;
  lastGame: Game;
  gameUI: GameUI;
  timer: GameTimer;
  grid: Grid;
  snake: Snake;
  eatables: Array<Eatable> = [];
  EatableFactory: EatableFactory;

  constructor(canvas: HTMLCanvasElement, gameUI: GameUI) {
    this.canvas = canvas;
    this.gameUI = gameUI;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.storage = new GameStorage(this, "game");
    this.commandList = new CommandList();
    this.lastGame = this.storage.load();
    this.gameLogs = new GameLogger(this.gameUI, new GameLogs())
    if (this.lastGame.score) {
      this.grid = new Grid(this.lastGame.grid.occupiedCells);
      this.snake = new Snake(canvas, this.lastGame.snake.params, this.grid);
      this.EatableFactory = new EatableFactory(this.context, this.grid, this.snake);
      this.lastGame.eatables.forEach((eatable: Eatable) => {
        this.eatables.push(
          this.EatableFactory.getNewEatable(eatable.type, eatable.position)
          );
      });
      this.gameUI.addToHighScore(this.lastGame.highScore);
      this.gameUI.addToScore(this.lastGame.score);
      this.score = this.lastGame.score;
      this.highScore = this.lastGame.highScore;
    } else {
      this.grid = new Grid();
      this.snake = new Snake(canvas, this.getParams(), this.grid);
      this.EatableFactory = new EatableFactory(this.context, this.grid, this.snake);
      this.eatables.push(
        this.EatableFactory.getNewEatable("Apple")
      );
    }
    this.timer = new GameTimer(1000);
  }
  readMessage(message: string): void {
    this.commandList.saveCmd(message);
  }
  getSpeed(): number {
    return this.snake.getSpeed();
  }

  getAllowedMessages(): string {
    return this.commandList.getAllowedCmds();
  }

  loop() {
    if (this.timer.stopWating(this.getSpeed())) {
      this.commandList.cmdToExecute.forEach((cmd) => {
        this.snake.updateDirection(cmd);
        this.snake.move();
      });
      if(!this.commandList.cmdToExecute.length) this.snake.move();
      this.commandList.cmdToExecute = [];
      this.storage.save(this);
      this.timer.reset();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.draw();
      // cheats deactivation
      if (this.cheatLoopCount === 600) {
        this.cheatActivated = false;
        this.cheatLoopCount = 0;
      } else if (this.cheatActivated) {
        this.cheatLoopCount++
      }
      // Create new object
      if (this.score % 2 === 0 && this.eatables.length < Math.ceil(this.score)) {
        this.eatables.push(
          this.EatableFactory.getNewEatable()
        );
        this.storage.save(this);
      }
      if (this.eatables.length > 0) {
        this.eatables.forEach((eatable) => {
          eatable.draw(this.cheatActivated);
        });
      }
      this.manageColision();
    }
  }

  manageColision() {
    let head = this.snake.params.cells[0];
    if(this.snake.params.cells.filter(bodyPart => {
        return head.x == bodyPart.x && head.y == bodyPart.y
      }).length >= 2) {
        this.gameLogs.addLog("game_over")
        this.reset();
        return 
    }
    let collidedEatable = this.eatables.find(eatable => { 
      return head.x == eatable.position.x && head.y == eatable.position.y 
    })
    if (collidedEatable) {
      collidedEatable.newRandomPosition();
      this.addPoint(collidedEatable.doEffect(this.snake));
      this.gameLogs.addLog(collidedEatable.getLogName())
      this.storage.save(this);
    }
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
    if (this.lastGame.snakeParams) {
      return this.lastGame.snakeParams;
    }
    return this.snakeParams;
  }

  reset() {
    this.grid.clearCells();
    this.snake.params = this.snakeParams;
    this.eatables = [this.EatableFactory.getNewEatable("Apple")];
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
