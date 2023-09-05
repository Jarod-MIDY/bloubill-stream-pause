import { GridPoint } from "../Shared/GridPointType";
export type Params = {
  position: GridPoint;
  dirX: number;
  dirY: number;
  cells: GridPoint[];
  maxCells: number;
};
