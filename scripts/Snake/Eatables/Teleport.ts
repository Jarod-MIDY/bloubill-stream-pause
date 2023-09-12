import { Eatable } from "../Eatable";
import { Snake } from "../Snake";

export class Teleport extends Eatable {

    defaultColor():string {
        return "purple";
    }

    doEffect(snake: Snake) {
        snake.params.cells = [];
        snake.params.position = this.grid.generateRandomPoint();
        return 0;
    }
    
    getLogName(): string {
        return "snake_teleport";
    }
}