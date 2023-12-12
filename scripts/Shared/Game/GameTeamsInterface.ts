import { Team } from "../Team";

export interface GameTeamsInterface {
    teams: Team[];
    playingTeam: Team;
    getTeams(): Team[];
    getPlayingTeam(): Team;
}