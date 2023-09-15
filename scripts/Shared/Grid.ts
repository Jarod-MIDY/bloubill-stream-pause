import { GridPoint } from "./GridPointType";
import { getRandomInt } from "./utils";
export class Grid {
  cellWidth: number = 32;
  gridSize: number = 25;
  occupiedCells: GridPoint[] = [];

  constructor(canvas: HTMLCanvasElement, gridSize: number, cells: GridPoint[] = []) {
    this.occupiedCells = cells;
    this.gridSize = gridSize;
    this.cellWidth = Math.min(canvas.width, canvas.height)/this.gridSize;
  }

  fillCell(point: GridPoint) {
    this.occupiedCells.push(point);
  }

  clearCell(point: GridPoint) {
    let pointIndex = this.occupiedCells.indexOf(point);
    if (pointIndex == -1)
      return;

    this.occupiedCells.splice(pointIndex, 1);
  }

  clearCells() {
    this.occupiedCells = [];
  }

  generateRandomPoint(): GridPoint {
    let position: GridPoint = {
      x: getRandomInt(0, this.gridSize - 1),
      y: getRandomInt(0, this.gridSize - 1),
    };
    if (this.occupiedCells.includes(position)) {
      return this.generateRandomPoint();
    } else {
      this.fillCell(position);
      return position;
    }
  }

  getCells(): GridPoint[] {
    return this.occupiedCells;
  }

  getCellWidth(): number {
    return this.cellWidth;
  }
  getGridSize(): number {
    return this.gridSize;
  }
}
