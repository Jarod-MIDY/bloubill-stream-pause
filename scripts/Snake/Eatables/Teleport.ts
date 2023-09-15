import { Eatable } from "../Eatable";
import { Snake } from "../Snake";

export class Teleport extends Eatable {

    defaultColor():string {
        return "purple";
    }

    doEffect(snake: Snake) {
        this.grid.clearCell(snake.params.cells[0])
        snake.params.cells = [];
        snake.params.position = this.grid.generateRandomPoint();
        this.grid.fillCell(snake.params.position)
        return 0;
    }
    
    getLogName(): string {
        return "snake_teleport";
    }
}