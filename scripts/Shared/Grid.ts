import { GridPoint } from "./GridPointType";
import { getRandomInt } from "./utils";
export class Grid {
  size: number = 32;

  occupiedCells: GridPoint[] = [];

  constructor(cells: GridPoint[] = []) {
    this.occupiedCells = cells;
  }

  fillCell(point: GridPoint) {
    this.occupiedCells.push(point);
  }

  clearCells() {
    this.occupiedCells = [];
  }

  generateRandomPoint(): GridPoint {
    let position: GridPoint = {
      x: getRandomInt(0, 25) * this.size,
      y: getRandomInt(0, 25) * this.size,
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

  getSize(): number {
    return this.size;
  }
}
