import { Grid } from "../Shared/Game/Grid";
import { GridPoint } from "../Shared/Game/GridPointType";
import { Team } from "../Shared/Team";

export class Coin {

    position: GridPoint;
    grid: Grid;
    context: CanvasRenderingContext2D;
    team : Team;

    constructor(position: GridPoint, grid: Grid, context: CanvasRenderingContext2D, team: Team) {
        this.position = position;
        this.grid = grid;
        this.team = team;
        this.context = context;
        this.grid.fillCell(position)
    }

    setPosition(position: GridPoint): void {
        this.grid.clearCell(this.position)
        this.position = position;
        this.grid.fillCell(this.position)
    }

    getPosition(): GridPoint {
        return this.position;
    }

    draw() {
        this.context.fillStyle = this.team.color;
        this.context.beginPath();
        this.context.arc(
            (this.position.x + 0.5) * this.grid.getCellWidth(), 
            (this.position.y + 0.5) * this.grid.getCellWidth(), 
            50, 0, 2 * Math.PI
            );
        this.context.fill();
    }
}