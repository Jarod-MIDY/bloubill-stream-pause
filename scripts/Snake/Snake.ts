import { Grid } from "../Shared/Grid";
import { GridPoint } from "../Shared/GridPointType";
import { Params } from "./SnakeParamsType";
export class Snake {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  speedModifier: number = 0;
  grid: Grid;
  params: Params;

  constructor(canvas: HTMLCanvasElement, params: Params, grid: Grid) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.grid = grid;
    this.params = params;
    for (let index = 0; index < params.maxCells; index++) {
      this.move();
    }
  }

  draw(color: string = "") {
    // draw snake one cell at a time
    this.params.cells.forEach((cell: GridPoint, index: number) => {
      this.context.fillStyle = color ? color : "#0b852b";
      if (index === 0) {
        this.context.fillStyle = color ? color : "#11ba3d";
      }
      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      this.context.fillRect(
        cell.x,
        cell.y,
        this.grid.getSize() - 1,
        this.grid.getSize() - 1
      );
    });
  }
  move() {
    // move snake by it's velocity
    this.params.position.x += this.params.dirX * this.grid.getSize();
    this.params.position.y += this.params.dirY * this.grid.getSize();
    // wrap snake position horizontally on edge of screen
    if (this.params.position.x < 0) {
      this.params.position.x = this.canvas.width - this.grid.getSize();
    } else if (this.params.position.x >= this.canvas.width) {
      this.params.position.x = 0;
    }
    // wrap snake position vertically on edge of screen
    if (this.params.position.y < 0) {
      this.params.position.y = this.canvas.height - this.grid.getSize();
    } else if (this.params.position.y >= this.canvas.height) {
      this.params.position.y = 0;
    }
    // keep track of where snake has been. front of the array is always the head
    this.params.cells.unshift({
      x: this.params.position.x,
      y: this.params.position.y,
    });
    // remove cells as we move away from them
    if (this.params.cells.length > this.params.maxCells) {
      this.params.cells.pop();
    }
  }
  updateDirection(message: string) {
    const allowedDirectionChanges = {
      whenVertical: {
        left: [-1, 0],
        right: [1, 0],
        up: [this.params.dirX, this.params.dirY],
        down: [this.params.dirX, this.params.dirY],
        reverse: [-this.params.dirX, -this.params.dirY],
      },
      whenHorizontal: {
        left: [this.params.dirX, this.params.dirY],
        right: [this.params.dirX, this.params.dirY],
        up: [0, -1],
        down: [0, 1],
        reverse: [-this.params.dirX, -this.params.dirY],
      },
    };

    if (message === "reverse") {
      this.params.cells.reverse();
      this.params.position.x = this.params.cells[0].x;
      this.params.position.y = this.params.cells[0].y;
    }
    const currentDirection =
      this.params.dirX === 0 ? "whenVertical" : "whenHorizontal";
    this.params.dirX = allowedDirectionChanges[currentDirection][message][0];
    this.params.dirY = allowedDirectionChanges[currentDirection][message][1];
  }

  grow(growth: number) {
    this.params.maxCells += growth;
  }

  getSpeed(): number {
    return this.params.maxCells + this.speedModifier;
  }

  setSpeedModifier(speed: number) {
    this.speedModifier = speed;
  }
}
