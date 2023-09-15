import { GameLoggInterface } from "../Shared/GameLoggInterface";

export class GameLogs implements GameLoggInterface {

    logs = {
        game_over: "Le snake s'est mordu lui même ! GAME OVER",
        apple_eaten: "Une pomme de plus pour le serpent !",
        apple_golden_eaten: "Une pomme d'or ! Le serpent grandit de X",
        apple_green_eaten: "Oh non ! Une pomme empoisonée ! Le serpent rétrécit de 1",
        speed_change_up: "Le serpent vas plus vite",
        speed_change_down: "Le serpent ralentit",
        snake_teleport: "Oh non ! Un téléporteur"
    }

    getLogText(logName: string): string {
        return this.logs[logName];
    }
}