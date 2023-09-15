import { Snake } from "../Snake";
import { getRandomInt } from "../../Shared/utils";
import { Eatable } from "../Eatable";

export class AppleGolden extends Eatable {

    defaultColor():string {
        return "gold";
    }

    doEffect(snake: Snake) {
            let points = getRandomInt(2, 5);
            snake.grow(points);
            return points;
    }
    
    getLogName(): string {
        return "apple_golden_eaten";
    }
}