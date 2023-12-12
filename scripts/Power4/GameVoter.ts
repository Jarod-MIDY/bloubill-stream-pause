import { VotedCmd } from "../Shared/Voter/VotedCmd";
import { Voter } from "../Shared/Voter/Voter";

export class GameVoter extends Voter  {
    votedCMD: VotedCmd[] = [
        {cmd: '1', nbVote: 0},
        {cmd: '2', nbVote: 0},
        {cmd: '3', nbVote: 0},
        {cmd: '4', nbVote: 0},
        {cmd: '5', nbVote: 0},
        {cmd: '6', nbVote: 0},
        {cmd: '7', nbVote: 0},
    ];
}