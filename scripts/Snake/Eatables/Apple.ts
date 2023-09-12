import { Eatable } from "../Eatable";
import { Snake } from "../Snake";

export class Apple extends Eatable {

    defaultColor():string {
        return "red";
    }

    doEffect(snake: Snake) {
        snake.grow(1);
        return 1;
    }
    
    getLogName(): string {
        return "apple_eaten";
    }
}