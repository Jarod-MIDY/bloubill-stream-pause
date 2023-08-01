import { GameInterface } from "../Shared/GameInterface";
import { GameStorage } from "../Shared/GameStorage";
import { Grid } from "../Shared/Grid";
import { GridPoint } from "../Shared/GridPointType";
import { Eatable } from "./Eatable";
import { Snake } from "./Snake";
import { Params } from "./SnakeParamsType";
import { getRandomInt } from "../Shared/utils";
import { GameUI } from "../Shared/GameUI";
import { CommandList } from "./CommandList";
import { GameTimer } from "../Shared/GameTimer";

export class Game implements GameInterface {
  // Typescript fourni des enums si jamais :) https://www.typescriptlang.org/docs/handbook/enums.html#handbook-content
  allowedColors: string[] = [
    "pink",
    "orange",
    "yellow",
    "purple",
    "blue",
    "purple",
    "green",
    "brown",
  ];
  allowedMessages: string[] = ["haut", "bas", "droite", "gauche", "arriere"];
  score: number = 0;
  highScore: number = 0;
  snakeParams: Params = {
    position: { x: 160, y: 160 },
    dirX: 32,
    dirY: 0,
    cells: [],
    maxCells: 4,
  };
  cheatCommand: string[] = [
    "haut",
    "gauche",
    "bas",
    "droite",
    "haut",
    "gauche",
    "bas",
    "droite",
    "arriere",
  ];
  cheatActivated: boolean = false;
  cheatLoopCount = 0;
  eatables: Array<Eatable> = [];
  grid: Grid;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  storage: GameStorage;
  lastGame: Game;
  snake: Snake;
  gameUI: GameUI;
  commandList: CommandList;
  timer: GameTimer;
  constructor(canvas: HTMLCanvasElement, gameUI: GameUI) {
    this.canvas = canvas;
    this.gameUI = gameUI;
    this.timer = new GameTimer(5000);
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.storage = new GameStorage(this, "game");
    this.commandList = new CommandList();
    this.lastGame = this.storage.load();
    if (this.lastGame.score) {
      this.grid = new Grid(this.lastGame.grid.occupiedCells);
      this.snake = new Snake(canvas, this.lastGame.snake.params, this.grid);
      this.lastGame.eatables.forEach((eatable: Eatable) => {
        this.eatables.push(
          new Eatable(
            canvas,
            this.grid,
            this.gameUI,
            eatable.type,
            true,
            eatable.position
          )
        );
      });
      this.gameUI.addToHighScore(this.lastGame.highScore);
      this.gameUI.addToScore(this.lastGame.score);
      this.score = this.lastGame.score;
      this.highScore = this.lastGame.highScore;
    } else {
      this.grid = new Grid();
      this.eatables.push(new Eatable(canvas, this.grid, this.gameUI, "apple"));
      this.snake = new Snake(canvas, this.getParams(), this.grid);
    }
  }
  readMessage(message: string): void {
    this.commandList.saveCmd(message);
  }
  getSpeed(): number {
    return this.snake.getSpeed();
  }

  getAllowedMessages(): string[] {
    return this.commandList.getAllowedCmds();
  }
  getCheatCommand(): string[] {
    return this.cheatCommand;
  }
  loop() {
    if (this.timer.stopWating() && this.commandList.cmdToExecute.length > 0) {
      this.commandList.cmdToExecute.forEach((cmd) => {
        this.snake.updateDirection(cmd);
        this.snake.move();
      })
      this.storage.save(this);
      this.commandList.cmdToExecute = [];
      this.timer.reset();
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.cheatLoopCount === 100) {
      this.cheatActivated = false;
    }
    if (this.cheatActivated) {
      this.cheatLoopCount++;
      this.snake.draw(
        this.allowedColors[getRandomInt(0, this.allowedColors.length - 1)]
      );
    } else {
      this.snake.draw();
    }
    // Create new object
    if (
      this.score % 2 === 0 &&
      this.eatables.length < Math.ceil(this.score / 2)
    ) {
      this.eatables.push(new Eatable(this.canvas, this.grid, this.gameUI));
      this.storage.save(this);
    }
    if (this.eatables.length > 0) {
      this.eatables.forEach((eatable) => {
        if (this.cheatActivated) {
          eatable.draw(
            this.allowedColors[getRandomInt(0, this.allowedColors.length - 1)]
          );
        } else {
          eatable.draw();
        }
      });
    }
    let snakeCells: GridPoint[] = this.snake.params.cells;
    snakeCells.forEach((cell, index) => {
      // check collision with all cells after this one (modified bubble sort)
      for (let i = index + 1; i < snakeCells.length; i++) {
        // snake collides with object
        this.eatables.forEach((eatable) => {
          if (cell.x === eatable.position.x && cell.y === eatable.position.y) {
            eatable.newRandomPosition();
            this.addPoint(eatable.doEffect(this.snake));
            this.storage.save(this);
          }
        });
        // snake occupies same space as a body part. reset game
        if (i in snakeCells) {
          if (cell.x === snakeCells[i].x && cell.y === snakeCells[i].y) {
            this.reset();
          }
        }
      }
    });
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
    this.eatables = [new Eatable(this.canvas, this.grid, this.gameUI, "apple")];
    this.score = 0;
    this.gameUI.addToScore(this.score);
    this.storage.clear();
  }

  toggleCheat(bool = false) {
    this.cheatActivated = bool;
  }
}
