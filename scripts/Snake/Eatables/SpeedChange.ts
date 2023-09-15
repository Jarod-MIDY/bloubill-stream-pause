import { Snake } from "../Snake";
import { getRandomInt } from "../../Shared/utils";
import { Eatable } from "../Eatable";

export class SpeedChange extends Eatable {

    bool: boolean;

    defaultColor():string {
        return "blue";
    }

    doEffect(snake: Snake) {
        this.bool = getRandomInt(0, 1) ? true : false;
        snake.setSpeedModifier(this.bool ? 50 : -25);
        return 0;
    }
    
    getLogName(): string {
        return this.bool ? "speed_change_up" : "speed_change_down";
    }
}