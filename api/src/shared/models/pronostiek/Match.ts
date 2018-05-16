import {Team} from "./Team";
import { HOME_TEAM_WINS, MATCH_IS_DRAW, OUT_TEAM_WINS} from "../Constants";

export class Match{
    homeTeamName : string;
    outTeamName: string;
    homeTeamScore: number = undefined;
    outTeamScore: number = undefined;

    constructor(homeTeamName: string, outTeamName : string){
        this.homeTeamName = homeTeamName;
        this.outTeamName = outTeamName;
    }

    getOutCome() : number {
        if(this.homeTeamScore > this.outTeamScore){
            return HOME_TEAM_WINS;
        } else if(this.outTeamScore > this.homeTeamScore){
            return OUT_TEAM_WINS;
        }
        return MATCH_IS_DRAW;
    }

    static deserialize(input: any) : Match {
        const m = new Match(input.homeTeamName, input.outTeamName);
        Object.assign(m, input);
        return m;

    }


}

export class KnockoutMatch extends Match {
    
    homeTeamPenaltyScore : number = undefined;
    outTeamPenaltyScore: number = undefined;
    homeTeamWins: boolean = false;
    outTeamWins: boolean = false;

    getOutCome() : number {

        if(this.homeTeamWins){
            return HOME_TEAM_WINS;
        } else if(this.outTeamWins){
            return OUT_TEAM_WINS;
        }
        return MATCH_IS_DRAW;
    }
}