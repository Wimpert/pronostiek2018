import {Tournament} from "../shared/src/models/Tournament";

export function setGroupMatchScores(tournament: Tournament) :void {
    var groupA =  tournament.groups[0];
    groupA.matches[0].outTeamScore = 1;
    groupA.matches[0].homeTeamScore = 3;

    groupA.matches[1].outTeamScore = 0;
    groupA.matches[1].homeTeamScore = 0;


    groupA.matches[2].outTeamScore = 3;
    groupA.matches[2].homeTeamScore = 3;

    groupA.matches[3].outTeamScore = 3;
    groupA.matches[3].homeTeamScore = 3;
}


export function setGroupMatchScore2FullyEqualTeams(tournament : Tournament) :void{
    setGroupMatchScores(tournament);

    var groupA =  tournament.groups[0];

    groupA.matches[4].outTeamScore = 3;
    groupA.matches[4].homeTeamScore = 3;

    groupA.matches[5].outTeamScore = 3;
    groupA.matches[5].homeTeamScore = 3;


}

export function setGroupMatchScore3EqualTeams(tournament : Tournament) : void {
    //setGroupMatchScores(tournament);
    var groupA = tournament.groups[0];

    groupA.matches[0].outTeamScore = 0;
    groupA.matches[0].homeTeamScore = 4;

    groupA.matches[1].outTeamScore = 0;
    groupA.matches[1].homeTeamScore = 1;

    groupA.matches[2].outTeamScore = 1;
    groupA.matches[2].homeTeamScore = 3;

    groupA.matches[3].outTeamScore = 0;
    groupA.matches[3].homeTeamScore = 1;

    groupA.matches[4].outTeamScore = 4;
    groupA.matches[4].homeTeamScore = 1;

    groupA.matches[5].outTeamScore = 0;
    groupA.matches[5].homeTeamScore = 2;
}

export function setGroupMatchScore2on2EqualTeamsWithDifferenceBetween(tournament : Tournament) : void {
    //setGroupMatchScores(tournament);
    var groupB = tournament.groups[1];

    groupB.matches[0].homeTeamScore = 1;
    groupB.matches[0].outTeamScore = 4;

    groupB.matches[1].homeTeamScore = 3;
    groupB.matches[1].outTeamScore = 0;

    groupB.matches[2].homeTeamScore = 4;
    groupB.matches[2].outTeamScore = 0;

    groupB.matches[3].homeTeamScore = 3;
    groupB.matches[3].outTeamScore = 1;

    groupB.matches[4].homeTeamScore = 0;
    groupB.matches[4].outTeamScore = 2;

    groupB.matches[5].homeTeamScore = 2;
    groupB.matches[5].outTeamScore = 0;

}