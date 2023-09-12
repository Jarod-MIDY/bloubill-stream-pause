import { GridPoint } from "../Shared/GridPointType";
import { Grid } from "../Shared/Grid";
import { Snake } from "./Snake";
import { Teleport } from "./Eatables/Teleport";
import { SpeedChange } from "./Eatables/SpeedChange";
import { AppleGolden } from "./Eatables/AppleGolden";
import { AppleGreen } from "./Eatables/AppleGreen";
import { Apple } from "./Eatables/Apple";
import { Eatable } from "./Eatable";

export class EatableFactory {

  Eatables = { Teleport, SpeedChange, AppleGolden, AppleGreen }

  context: CanvasRenderingContext2D;
  grid: Grid;
  position: GridPoint = { x: 0, y: 0 };
  snake: Snake;

  constructor(
    context: CanvasRenderingContext2D,
    grid: Grid,
    snake: Snake,
  ) {
    this.context = context;
    this.grid = grid;
    this.snake = snake;
  }

  getNewEatable(type?:string, position?:GridPoint) {
    type = type ? type : Object.keys(this.Eatables)[Math.floor(Math.random()*Object.keys(this.Eatables).length)];
    const Eatable = this.getEatable(type);
    if (position) {
       Eatable.setPosition(position);
    } else {
      Eatable.newRandomPosition();
    }
    return Eatable;
  }

  getEatable(type: string): Eatable {
    if (this.Eatables[type]) {
      return new this.Eatables[type](this.grid, this.context);
    } else {
      return new Apple(this.grid, this.context);
    }
  }
}
