import { Grid } from "../Shared/Game/Grid";
import { GridPoint } from "../Shared/Game/GridPointType";
import { Params } from "./SnakeParamsType";
export class Snake {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  speedModifier: number = 0;
  grid: Grid;
  params: Params;

  constructor(context: CanvasRenderingContext2D, params: Params, grid: Grid) {
    this.context = context;
    this.grid = grid;
    this.params = params;
    if (this.params.cells.length === 0) {
      for (let index = 0; index < params.maxCells; index++) {
        this.move();
      }
    }
  }

  draw() {
    // draw snake one cell at a time
    this.params.cells.forEach((cell: GridPoint, index: number) => {
      this.context.fillStyle = "#0b852b";
      if (index === 0) {
        this.context.fillStyle = "#11ba3d";
      }
      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      this.context.fillRect(
        cell.x * this.grid.getCellWidth(),
        cell.y * this.grid.getCellWidth(),
        this.grid.getCellWidth() - 1,
        this.grid.getCellWidth() - 1
      );
    });
  }
  move() {
    this.grid.clearCell(this.params.cells[0]);
    // move snake by it's velocity
    this.params.position.x += this.params.dirX;
    this.params.position.y += this.params.dirY;

    // wrap snake position horizontally on edge of screen
    this.params.position.x = (this.params.position.x + this.grid.getGridSize()) % this.grid.getGridSize()

    // wrap snake position vertically on edge of screen
    this.params.position.y = (this.params.position.y + this.grid.getGridSize()) % this.grid.getGridSize()

    // keep track of where snake has been. front of the array is always the head
    this.params.cells.unshift({
      x: this.params.position.x,
      y: this.params.position.y,
    });
    // remove cells as we move away from them
    if (this.params.cells.length > this.params.maxCells) {
      this.params.cells.pop();
    }
    this.grid.fillCell(this.params.cells[0]);
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
