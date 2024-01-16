import { Eatable } from "../Eatable";
import { Snake } from "../Snake";

export class Apple extends Eatable {

    defaultColor():string {
        return "red";
    }

    getColor(cheatActivated:boolean):string {
        return this.defaultColor();
    }

    doEffect(snake: Snake) {
        snake.grow(1);
        return 1;
    }
    
    getLogName(): string {
        return "apple_eaten";
    }
}