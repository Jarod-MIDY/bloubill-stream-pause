import { Grid } from "../Shared/Game/Grid";
import { GridPoint } from "../Shared/Game/GridPointType";
import { EatablesInterface } from "./Interfaces/EatablesInterface";
import { Snake } from "./Snake";

export class Eatable implements EatablesInterface {

    position: GridPoint;

    grid: Grid;

    context: CanvasRenderingContext2D;

    type:string = this.constructor.name;
    color: string;
    colors: string[] = [
        "pink",
        "navy",
        "deeppink",
        "orange",
        "orangered",
        "chartreuse",
        "yellow",
        "purple",
        "blue",
        "purple",
        "green",
        "brown",
    ]

    constructor(
        grid: Grid,
        context: CanvasRenderingContext2D,
    ){
        this.grid = grid;
        this.context = context;
        this.color = this.defaultColor();
    }

    newRandomPosition() {
        this.grid.clearCell(this.position);
        this.position = this.grid.generateRandomPoint();
    }

    setPosition(position: GridPoint): void {
        this.position = position;
    }

    defaultColor():string {
        return "gray";
    }

    getColor(cheatActivated:boolean):string {
        if (cheatActivated) {
            return this.colors[Math.floor(Math.random()*this.colors.length)]
        }
        return this.color;
    }

    doEffect(snake: Snake): number {
        return 0;
    }


    getLogName(): string {
        return "eatable_default"
    }

    draw(cheatActivated = false) {
        this.context.fillStyle = this.getColor(cheatActivated);
        this.context.fillRect(
        this.position.x * this.grid.getCellWidth(),
        this.position.y * this.grid.getCellWidth(),
        this.grid.getCellWidth() - 1,
        this.grid.getCellWidth() - 1
        );
    }
}