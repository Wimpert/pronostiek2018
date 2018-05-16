import { Tournament } from './../models/pronostiek/Tournament';
import { KnockoutMatch } from './../models/pronostiek/Match';
import {Pronostiek} from "../models/pronostiek/Pronostiek";
import {Team} from "../models/pronostiek/Team";
import {Group} from "../models/pronostiek/Group";
import {Match} from "../models/pronostiek/Match";
import {HOME_TEAM_WINS, OUT_TEAM_WINS} from "../models/Constants";
import {KnockOutRound} from "../models/pronostiek/KnockOutRound";

export function getTournament() : Tournament {

    console.log("***** Pronostiek generation Starting ****");

    let tournament : Tournament = new Tournament();

    let allTeams =  [
        ["Russia", "Saudi Arabia", "Egypt", "Uruguay"],
        ["Portugal", "Spain", "Morocco", "Iran"],
        ["France", "Australia", "Peru", "Denmark"],
        ["Argentina", "Iceland", "Croatia", "Nigeria"],
        ["Brazil", "Switzerland", "Costa Rica", "Serbia"],
        ["Germany", "Mexico", "Sweden", "Korea Republic"],
        ["Belgium", "Panama", "Tunisia", "England"],
        ["Poland", "Senegal", "Colombia", "Japan"],
    ];

    let groupLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

    allTeams.forEach( (groupTeamsNames,index) => {
        let teams: Team[] = [];
        groupTeamsNames.forEach(teamName => {
            teams.push(new Team(teamName));
        });
        let group = new Group ("Groep " + groupLetter[index], teams);
        tournament.groups.push(group);
    });

    let rounds=[
        {name:"Round of 16",numberOfMatches:8},
        {name:"Quarter Final",numberOfMatches:4},
        {name:"Semi Final",numberOfMatches:2},
        {name:"Final",numberOfMatches:1}
        ];

    rounds.forEach((roundData) => {
        let knockOutRound = new KnockOutRound(roundData.name, roundData.numberOfMatches);
        tournament.rounds.push(knockOutRound);
    });


    // FOR DEV PURPOSES:
    tournament.groups.forEach((group) => {
        group.matches.forEach((match,index) => {
            if(index < 5){
                match.homeTeamScore = Math.round(Math.random()*5);
                match.outTeamScore = Math.round(Math.random()*5);
            }
        });
        group.processMatches();
    });
    // END
    
    return tournament;
}

export function compareTeams(teama: Team, teamb : Team) : number {

    if(teama.points != teamb.points){
        //compare on points:
        return teamb.points - teama.points;
    } else if(teama.getGoalsDifference() != teamb.getGoalsDifference()){
        //compare on goal diff:
        return teamb.getGoalsDifference() -teama.getGoalsDifference();
    } else if(teama.goalsScored != teamb.goalsScored){
        // on goals scored:
        return teamb.goalsScored - teama.goalsScored;
    }
    return 0
}

export function getMatchesFromTeams(teams : Team[], allMatches : Match[]) : Match[] {
    var teamNames  = new Array<string>();
    teams.forEach((team) => {
       teamNames.push(team.name);
    });

    var returnVal : Match [] = new Array<Match>();
    allMatches.forEach((match) => {
       if(teamNames.indexOf(match.homeTeamName) != -1 && teamNames.indexOf(match.outTeamName) != -1){
             returnVal.push(Object.create(match));
       }

    });
    return returnVal;
}

export function getSubGroup(teams : Team[], originalGroup : Group) :  Group {
     var group = new Group();
     group.teams = []
    for(var t of teams) {
         group.teams.push(Object.create(t));
    }
    // group.teams = teams.slice();
     group.matches = getMatchesFromTeams(teams,originalGroup.matches );
     for(var t of group.teams){
         t.reset();
     }
     return group;
}


export function orderTeams(group : Group, complete? : boolean) : void {
    //reset some stuff:
    group.groupNeedsDraw = false;
    group.equalTeams = new Array<Team[]>();
    group.teams.sort( (teama, teamb) => {
        var _ =  compareTeams(teama, teamb);
        if( _ == 0){
            // this means team a and team b are concidered equal:
            group.addToEqualTeams([teama, teamb]);
        }
        return _;
    });

    //IF not all matches are played, we can skipp the rest
    if(!group.allMatchesPlayed){
        return;
    }
    //check if there are equalteams, and do whats needed:
    if(group.equalTeams.length > 0){
        if(group.equalTeams[0].length == group.teams.length){
            //this means all  of the teams were equal, so there is nothing more to do:
            group.groupNeedsDraw = true;
        } else {
            //we need to make a subgroup and do the ordering again:
            for ( var equalTeamsSubGroup of group.equalTeams){
                if(complete == undefined || complete){
                   /* console.log("Before ");
                    group.printGroupStanding();
                    group.printGroupMatches()*/
                }
               var subgroup = getSubGroup(equalTeamsSubGroup, group);
                subgroup.processMatches();

                //watch out here for infinite loops!!!
                /*if (complete == undefined || complete) {
                    orderTeams(subgroup,false);
                }*/

                if(!group.groupNeedsDraw){
                    orderTeams(subgroup, false);
                }

                if(subgroup.groupNeedsDraw){
                    group.groupNeedsDraw =  true;
                }

                //after this subgroups have been ordered, so now we order them in
                //subgroup.printGroupStanding();
                orderAccordingToSubGroups(group, subgroup);

            }

        }
    }
    if(complete == undefined || complete){
       /* console.log("Final print");
        group.printGroupStanding();
        group.printGroupMatches()*/
    }

}

function orderAccordingToSubGroups(group: Group, subGroup : Group){


    //find the index of the first team:
    var index = 0;
    for(var team of group.teams){
        if(subGroup.containsTeamWithName(team.name)){
            break;
        }
        index++
    }

    //get copies of the teams
    var teamsToAdd = getSubGroupFromOriginalGroup(group,subGroup);

    //the first team is in position index in the original group
    //so now start replacing from there:
    for(var teamToAdd of teamsToAdd.teams){
        group.teams.splice(index, 1, teamToAdd);
        index++
    }
}


function getSubGroupFromOriginalGroup (originalGroup  : Group, subGroup : Group ) :  Group{
    var returnVal : Group = new Group();
    returnVal.teams = [];
    for (var subGroupTeam  of subGroup.teams){
        var teamToAdd = Object.assign({}, originalGroup.getTeam((subGroupTeam.name)));
        //var teamToAdd = Object.create(originalGroup.getTeam(subGroupTeam.name));
        returnVal.teams.push(teamToAdd);
    }
    return returnVal;

}


/* 
Winner A v. Runner-up B = 1 - 0
Winner B v. Runner-up A = 2 - 1
Winner C v. Runner-up D = 3 
Winner D v. Runner-up C = 4
Winner E v. Runner-up F = 5
Winner F v. Runner-up E = 6
Winner G v. Runner-up H = 7
Winner H v. Runner-up G = 8 
*/
export function addToNextRound(tournament : Tournament) {
    
    const achsteFinales =  tournament.rounds[0];

    tournament.groups.forEach((group, groupIndex) => {

        if(group.allMatchesPlayed){
            const groupWinner = tournament.groups[groupIndex].teams[0];
            const groupRunnerUp = tournament.groups[groupIndex].teams[1];
        
            if(groupIndex%2 == 0){
                //even index so group winner in home index, runnerup in out index + 1;
                achsteFinales.matches[groupIndex].homeTeamName = groupWinner.name;
                achsteFinales.matches[groupIndex+1].outTeamName = groupRunnerUp.name;
        
            } else {
                //odd index so group winner in out index+1, runnerup in home index;
                achsteFinales.matches[groupIndex].homeTeamName = groupWinner.name;
                achsteFinales.matches[groupIndex-1].outTeamName = groupRunnerUp.name;
            }
        }
    });
}


/*
    Winner 1 v. Winner 3 = A
    Winner 2 v. Winner 4 = B
    Winner 5 v. Winner 7 = C
    Winner 6 v. Winner 8 = D 
*/
export function addToNextKnockoutRound(tournament: Tournament, roundIndex : number, matchIndex: number , winningTeam: string){
    let matchIndexToAddTo; 
    let homeTeam = true
    if(roundIndex == 0){
        if(matchIndex == 0 || matchIndex == 2){
            matchIndexToAddTo = 0
        } else if(matchIndex == 1 || matchIndex == 3){
            matchIndexToAddTo = 1
        } else if(matchIndex == 4 || matchIndex == 6){
            matchIndexToAddTo = 2
        } else if(matchIndex == 5 || matchIndex == 7){
            matchIndexToAddTo = 3
        }  
        if(matchIndex == 2 ||matchIndex == 3 || matchIndex == 6 || matchIndex == 7){
            homeTeam = false;
        }  
    }
    let matchToAddTo = tournament.rounds[roundIndex+1].matches[matchIndex];
    if(homeTeam){
        matchToAddTo.homeTeamName = winningTeam;
    } else {
        matchToAddTo.outTeamName = winningTeam;
    }
}
  



// *** Frontend Helper methods: *** //
export function replaceBasedOnName(newGroup : Group, groups :Group[]) : void {
    let index = findIndexOfGroupBasedOnName(newGroup, groups);
    groups[index] = newGroup;
}

function findIndexOfGroupBasedOnName(groupToFind:Group , groups : Group[]) : any {

    for(let i in groups){
        if(groups[i].groupname == groupToFind.groupname){
            return i;
        }
    }
}
// *** END *** //
