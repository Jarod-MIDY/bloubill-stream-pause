import { Eatable } from "../Eatable";
import { Snake } from "../Snake";

export class AppleGreen extends Eatable {
    
    defaultColor():string {
        return "green";
    }

    doEffect(snake: Snake) {
        snake.grow(-1);
        return -1;
    }

    getLogName(): string {
        return "apple_green_eaten";
    }
}