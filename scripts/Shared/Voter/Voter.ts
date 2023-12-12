import { Team } from "../Team";
import { GameInterface } from "../Game/GameInterface";
import { VotedCmd } from "./VotedCmd";
import { GameTimer } from "../Game/GameTimer";

export class Voter {

    timer: GameTimer|null = null;
    votingTime: number
    votedCMD: VotedCmd[] = [];
    end: boolean = false;

    constructor(game: GameInterface, votingTime: number) {
        this.votingTime = votingTime
    }

    addVote(cmd:string, userId: string, playingTeam: Team) {
        if (!playingTeam.findMember(userId)) {
            return
        }
        if (!this.timer) {
            console.log('Vote started');
            this.timer = new GameTimer(this.votingTime)
        }
        const votedCMD = this.votedCMD.find((votedCmd) => votedCmd.cmd === cmd)
        if (votedCMD && !this.timer.stopWating()) {
            votedCMD.nbVote += 1
            console.log(userId + 'voted ' + cmd);
        } else {
            this.end = true;
            console.log('Vote has ended');
        }
    }

    getVotedCMD():string {
        const maxVoted = Math.max(...this.votedCMD.map((votedCmd) => votedCmd.nbVote))
        const votedCMD = this.votedCMD.find((votedCmd) => votedCmd.nbVote === maxVoted)
        console.log('Current team voted for ' + votedCMD.cmd);
        return votedCMD.cmd
    }

    getCmds(): string {
        return this.votedCMD.map((votedCmd) => votedCmd.cmd).join("|");
    }

    voteHasEnded(): boolean {
        if (this.timer && this.timer.stopWating()) {
            this.end = true
        }
        return this.end
    }

    reset() {
        this.votedCMD.forEach((votedCmd) => votedCmd.nbVote = 0)
        this.timer = null
        this.end = false;
    }
}