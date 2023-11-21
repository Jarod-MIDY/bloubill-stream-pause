import { GameInterface } from "./GameInterface";

export class GameSave {
    savedAt: number;
    type: string;
    game: GameInterface;

    constructor(type: string, game: GameInterface) {
        this.savedAt = Date.now();
        this.type = type
        this.game = game
    }
}