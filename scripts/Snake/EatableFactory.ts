import { GridPoint } from "../Shared/Game/GridPointType";
import { Grid } from "../Shared/Game/Grid";
import { Teleport } from "./Eatables/Teleport";
import { SpeedChange } from "./Eatables/SpeedChange";
import { AppleGolden } from "./Eatables/AppleGolden";
import { AppleGreen } from "./Eatables/AppleGreen";
import { Apple } from "./Eatables/Apple";
import { Eatable } from "./Eatable";

export type EatableType = {
  [eatable: string]: {
    proba: number;
    type: Eatable
  }
}

export class EatableFactory {
  private eatables = {
    Teleport: {
      proba: 10,
      type: Teleport
    },
    SpeedChange: {
      proba: 30,
      type: SpeedChange
    },
    AppleGolden: {
      proba: 10,
      type: AppleGolden
    },
    AppleGreen: {
      proba: 50,
      type: AppleGreen
    }
  };

  private context: CanvasRenderingContext2D;
  private grid: Grid;
  private position: GridPoint = { x: 0, y: 0 };

  constructor(
    context: CanvasRenderingContext2D,
    grid: Grid,
  ) {
    this.context = context;
    this.grid = grid;
  }

  public selectTypeByProbability() {
    const totalProbability = Object.values(this.eatables).reduce((sum, typeData) => sum + typeData.proba, 0);
    let rand = Math.floor(Math.random() * totalProbability) + 1;
    for (const [typeName, typeData] of Object.entries(this.eatables)) {
        const probability = typeData.proba;
        if (rand <= probability) {
            return typeName;
        }
        rand -= probability;
    }
    return Object.keys(this.eatables)[Object.keys(this.eatables).length - 1];
}


  public getNewEatable(type?:string, position?:GridPoint) {
    if (!type) {
      type = this.selectTypeByProbability();
    }
    const Eatable = this.getEatable(type);
    if (position) {
      Eatable.setPosition(position);
    } else {
      Eatable.newRandomPosition();
    }
    return Eatable;
  }

  public getEatable(type: string): Eatable {
    // console.log('type: ', type);
    // const occurrences: {
    //   [key: string]: number;
    // } = {};
    // let count = 10000;
    // for (let index = 0; index < count; index++) {
    //   let result = this.selectTypeByProbability();
    //   if (!occurrences[result]) occurrences[result] = 0;
    //   occurrences[result]++;
    // }
    // console.log(Object.values(occurrences).map((occurrence) => 100 * occurrence / count));
    if (this.eatables[type]) {
      console.log(this.eatables[type]);
      return new this.eatables[type].type(this.grid, this.context);
    } else {
      return new Apple(this.grid, this.context);
    }
  }
}
