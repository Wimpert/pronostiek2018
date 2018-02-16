import {Tournament} from "../models/tournament/Tournament";
import {Team} from "../models/tournament/Team";
import {Group} from "../models/tournament/Group";
import {Match} from "../models/tournament/Match";
import {HOME_TEAM_WINS, OUT_TEAM_WINS} from "../models/Constants";

export function getTournament() : Tournament {

    console.log("***** Tournament generation Starting ****");

    let tournament : Tournament = new Tournament();

    let a = ["Russia", "Saudi Arabia", "Egypt", "Uruguay"];
    let teamsA: Team[] = [];
    a.forEach((name) => {
        teamsA.push(new Team(name));
    })

    let groupA = new Group("Group A", teamsA);
    tournament.groups.push(groupA)

    let b = ["Portugal", "Spain", "Morocco", "Iran"];
    let teamsb: Team[] = [];
    b.forEach((name) => {
        teamsb.push(new Team(name));
    })

    let groupb = new Group("Group B", teamsb);

    tournament.groups.push(groupb);

    console.log("***** Tournament generation Complete ****");

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
       if(teamNames.indexOf(match.homeTeam.name) != -1 && teamNames.indexOf(match.outTeam.name) != -1){
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

export function proccesMatches(group: Group) :void {

    //group.getAllMatchesPlayed() = true;

    group.teams.forEach((team) => {
        team.reset();
    });

    group.matches.forEach((match) => {
        if(match.outTeamScore != undefined && match.homeTeamScore != undefined){
            //this means match is played, so let do what we need to do:
            let matchOutCome = match.getOutCome();
            let homeTeam = group.getTeam(match.homeTeam.name);
            let outTeam = group.getTeam(match.outTeam.name);
            if(matchOutCome == HOME_TEAM_WINS){
                homeTeam.points += 3;
                homeTeam.matchesWon++;
                outTeam.matchesLost++;
            } else if(matchOutCome == OUT_TEAM_WINS){
                outTeam.points += 3;
                outTeam.matchesWon++;
                homeTeam.matchesLost++;
            } else {
                homeTeam.points += 1;
                outTeam.points += 1;
                outTeam.matchesDrawed++;
                homeTeam.matchesDrawed++;
            }
            outTeam.goalsScored += match.outTeamScore;
            outTeam.goalsConcieved += match.homeTeamScore;
            homeTeam.goalsScored += match.homeTeamScore;
            homeTeam.goalsConcieved += match.outTeamScore;
        } else {
            group.allMatchesPlayed = false;
        }

    });

    //if all played matches are done, we put the points:
    group.teams.forEach((team)=>{
        team.points = team.matchesWon*3 + team.matchesDrawed;
    });
}

export function orderTeams(group : Group, complete? : boolean) : void {
    //reset some stuff:
    group.groupNeedsDraw = false;
    group.equalTeams = new Array<Team[]>();
    group.teams.sort( (teama, teamb) => {
        var returnValue =  compareTeams(teama, teamb);
        if(returnValue == 0){
            // this means team a and team b are concidered equal:
            group.addToEqualTeams([teama, teamb]);
            //console.log(this.equalTeams);
        }
        return returnValue;
    });

    //check if there are equalteams, and do whats needed:
    if(group.equalTeams.length > 0){
        if(group.equalTeams[0].length == 4){
            //this means all 4 of them were equal, so there is nothing more to do:
            group.groupNeedsDraw = true;
        } else {
            //we need to make a subgroup and do the ordering again:
            for ( var equalTeamsSubGroup of group.equalTeams){
                if(complete == undefined || complete){
                    console.log("Before ");
                    group.printGroupStanding();
                    group.printGroupMatches()
                }
               var subgroup = getSubGroup(equalTeamsSubGroup, group);
                subgroup.processMatches();

                //watch out here for infinite loops!!!
                if (complete == undefined || complete) {
                    orderTeams(subgroup,false);
                }
                //after this subgroups have been ordered, so now we order them in
                //subgroup.printGroupStanding();
                orderAccordingToSubGroups(group, subgroup);
                //group.printGroupStanding();
            }

        }
    }
    if(complete == undefined || complete){
        console.log("Final print");
        group.printGroupStanding();
        group.printGroupMatches()
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
    returnVal.teams = []
    for (var subGroupTeam  of subGroup.teams){
        var teamToAdd = Object.create(originalGroup.getTeam(subGroupTeam.name));
        returnVal.teams.push(teamToAdd);
    }
    return returnVal;

}

