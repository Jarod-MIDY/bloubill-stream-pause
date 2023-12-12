import { GameInterface } from "./Game/GameInterface";
import { GameTeamsInterface } from "./Game/GameTeamsInterface";
import { Team } from "./Team";

export class TeamManager {

    rewardId: string = '1e477436-ce69-4e50-ae6b-38af67b27ab0';

    isTeams: boolean = false;

    teams: Team[] = [];

    game: GameTeamsInterface;

    constructor(game: GameInterface) {
        if (this.gameIsGameTeams(game)) {
            this.game = game;
            this.teams = game.getTeams();
            this.isTeams = true;
        }
    }

    joinTeam(teamName: string, userId: string) {
        const team = this.teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase());
        if (team) {
            this.teams.forEach((team) => {
                if (team.findMember(userId)) {
                    team.removeMember(userId);
                }
            })
            team.addMember(userId);
        } else {
            console.log("Team "+ teamName +" not found");
        }
    }

    getRewardId(): string {
        return this.rewardId;
    }

    gameIsGameTeams(game: any): game is GameTeamsInterface {
        return 'teams' in game;
    }

    gameIsTeams(): boolean {
        return this.isTeams;
    }
}