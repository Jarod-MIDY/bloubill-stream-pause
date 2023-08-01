import { GridPoint } from "../Shared/GridPointType";
import { Grid } from "../Shared/Grid";
import { Snake } from "./Snake";
import { getRandomInt } from "../Shared/utils";
import { GameUI } from "../Shared/GameUI";
export class Eatable {
  allowedColors: Array<string> = [
    "pink",
    "orange",
    "yellow",
    "purple",
    "blue",
    "purple",
  ];
  color: string = "";
  context: CanvasRenderingContext2D;
  grid: Grid;
  type: string;
  points: number;
  position: GridPoint = { x: 0, y: 0 };
  gameUI: GameUI;
  constructor(
    canvas: HTMLCanvasElement,
    grid: Grid,
    gameUI: GameUI,
    type: string = "",
    saved: boolean = false,
    position?: GridPoint
  ) {
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.grid = grid;
    this.type = type ? type : this.getType();
    this.points = 0;
    this.gameUI = gameUI;
    this.setColor();
    if (saved) {
      position && this.setPosition(position);
    } else {
      this.newRandomPosition();
    }
  }

  newRandomPosition() {
    this.position = this.grid.generateRandomPoint();
  }
  setPosition(position: GridPoint) {
    this.position = position;
  }
  doEffect(snake: Snake) {
    switch (this.type) {
      case "teleport":
        return this.teleport(snake);
      case "speed_change":
        return this.speedChange(snake);
      case "golden_apple":
        return this.goldenApple(snake);
      case "green_apple":
        return this.greenApple(snake);
      default:
        return this.apple(snake);
    }
  }
  teleport(snake: Snake) {
    snake.params.cells = [];
    this.gameUI.addLogEvent("Oh non ! Un téléporteur !");
    snake.params.position = this.grid.generateRandomPoint();
    snake.params.cells.push(snake.params.position);
    return this.points;
  }
  apple(snake: Snake): number {
    this.points = 1;
    snake.grow(this.points);
    this.gameUI.addLogEvent("Une pomme de plus pour le serpent !");
    return this.points;
  }
  greenApple(snake: Snake): number {
    this.gameUI.addLogEvent("Aie, une pomme empoisonée !");
    this.points = -1;
    snake.grow(this.points);
    return this.points;
  }
  goldenApple(snake: Snake): number {
    console.log("golden apple");
    this.points = getRandomInt(2, 5);
    this.gameUI.addLogEvent(
      "Une super pomme doré ! Celle ci vaut " + this.points + " points !"
    );
    snake.grow(this.points);
    return this.points;
  }
  speedChange(snake: Snake): number {
    let bool = getRandomInt(0, 1);
    snake.setSpeedModifier(bool ? 5 : -5);
    let logText = bool ? "vitesse augmentée" : "vitesse diminuée";
    this.gameUI.addLogEvent(logText);
    return this.points;
  }
  getType(): string {
    let type: number = getRandomInt(0, 3);
    switch (type) {
      case 0:
        return "teleport";
      case 1:
        return "speed_change";
      case 2:
        return "golden_apple";
      default:
        return "green_apple";
    }
  }
  setColor() {
    this.color =
      this.type === "apple"
        ? "red"
        : this.allowedColors[getRandomInt(0, this.allowedColors.length - 1)];
  }
  draw(color = "") {
    this.context.fillStyle = color ? color : this.color;
    this.context.fillRect(
      this.position.x,
      this.position.y,
      this.grid.getSize() - 1,
      this.grid.getSize() - 1
    );
  }
}
