import { Grid } from "../../Shared/Game/Grid";
import { GridPoint } from "../../Shared/Game/GridPointType";
import { Snake } from "../Snake";

export interface EatablesInterface {

    position: GridPoint;
    
    grid: Grid;

    context: CanvasRenderingContext2D;

    type:string;

    setPosition(position: GridPoint): void;

    doEffect(snake: Snake): number;

    getColor(cheatActivated: boolean):string;

    getLogName(): string;
}
