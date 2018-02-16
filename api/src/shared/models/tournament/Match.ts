import {Team} from "./Team";
import { HOME_TEAM_WINS, MATCH_IS_DRAW, OUT_TEAM_WINS} from "../Constants";

export class Match{
    homeTeam : Team;
    outTeam: Team;
    homeTeamScore: number = undefined;
    outTeamScore: number = undefined;

    constructor(homeTeam: Team, outTeam : Team){
        this.homeTeam =homeTeam;
        this.outTeam = outTeam;
    }

    getOutCome() : number {
        if(this.homeTeamScore > this.outTeamScore){
            return HOME_TEAM_WINS;
        } else if(this.outTeamScore > this.homeTeamScore){
            return OUT_TEAM_WINS;
        }
        return MATCH_IS_DRAW;
    }

}

export class KnockoutMatch extends Match {
    homeTeamPenaltyScore : number = undefined;
    outTeamPenaltyScore: number = undefined;

    getOutCome() : number {
        let outCome =  super.getOutCome();
        if(outCome == MATCH_IS_DRAW){
            //This means match was with penals ...
            if(this.homeTeamPenaltyScore > this.outTeamPenaltyScore){
                return HOME_TEAM_WINS
            } else {
                return OUT_TEAM_WINS
            }
        }
        return outCome
    }
}