/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(name) {
        this.points = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.matchesDrawed = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
        this.subGroupIndex = 0;
        this.name = name;
    }
    reset() {
        this.points = 0;
        this.matchesDrawed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
        this.subGroupIndex = 0;
    }
    getGoalsDifference() {
        return this.goalsScored - this.goalsConcieved;
    }
    static deserialize(input) {
        const name = input.name;
        const team = new Team(name);
        /*Object.assign(Team, input);
        console.log(team);*/
        team.points = Number(input.points);
        team.matchesWon = Number(input.matchesWon);
        team.matchesLost = Number(input.matchesLost);
        team.matchesDrawed = Number(input.matchesDrawed);
        team.goalsScored = Number(input.goalsScored);
        team.goalsConcieved = Number(input.goalsConcieved);
        team.subGroupIndex = Number(input.subGroupIndex);
        return team;
    }
}
exports.Team = Team;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(2);
class Match {
    constructor(homeTeamName, outTeamName) {
        this.homeTeamScore = undefined;
        this.outTeamScore = undefined;
        this.homeTeamName = homeTeamName;
        this.outTeamName = outTeamName;
    }
    getOutCome() {
        if (this.homeTeamScore > this.outTeamScore) {
            return Constants_1.HOME_TEAM_WINS;
        }
        else if (this.outTeamScore > this.homeTeamScore) {
            return Constants_1.OUT_TEAM_WINS;
        }
        return Constants_1.MATCH_IS_DRAW;
    }
    static deserialize(input) {
        const m = new Match(input.homeTeamName, input.outTeamName);
        Object.assign(m, input);
        return m;
    }
}
exports.Match = Match;
class KnockoutMatch extends Match {
    constructor() {
        super(...arguments);
        this.homeTeamPenaltyScore = undefined;
        this.outTeamPenaltyScore = undefined;
    }
    getOutCome() {
        let outCome = super.getOutCome();
        if (outCome == Constants_1.MATCH_IS_DRAW) {
            //This means match was with penals ...
            if (this.homeTeamPenaltyScore > this.outTeamPenaltyScore) {
                return Constants_1.HOME_TEAM_WINS;
            }
            else {
                return Constants_1.OUT_TEAM_WINS;
            }
        }
        return outCome;
    }
}
exports.KnockoutMatch = KnockoutMatch;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HOME_TEAM_WINS = 1;
exports.OUT_TEAM_WINS = 2;
exports.MATCH_IS_DRAW = 0;
exports.COOKIE_NAME = "j_uid";


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TournamentUtils_1 = __webpack_require__(4);
const SpecHelpers_1 = __webpack_require__(8);
describe("this will test the processing of the group matches:", function () {
    let tournament = TournamentUtils_1.getTournament();
    it("tournament should contain group1 A", function () {
        expect(tournament.groups[0].groupname).toEqual("Group A");
    });
    SpecHelpers_1.setGroupMatchScores(tournament);
    let groupA = tournament.groups[0];
    groupA.processMatches();
    let teamA = tournament.groups[0].teams[0];
    it("team A has 3 points", function () {
        expect(teamA.points).toEqual(4);
    });
    it("team C has 1 points", function () {
        expect(tournament.groups[0].teams[2].points).toEqual(2);
    });
    it("team D has 2 points", function () {
        expect(tournament.groups[0].teams[3].points).toEqual(2);
    });
    it("team A has scored 3 goals", function () {
        expect(teamA.goalsScored).toBe(6);
    });
    it("team A has concieved 4 goals", function () {
        expect(teamA.goalsConcieved).toBe(4);
    });
    it("team A has 1 drawed match", function () {
        expect(teamA.matchesDrawed).toBe(1);
    });
    it("team A has 1 won match", function () {
        expect(teamA.matchesWon).toBe(1);
    });
});
describe("this will test the processing of the group matches:", function () {
    var tournament = TournamentUtils_1.getTournament();
    SpecHelpers_1.setGroupMatchScores(tournament);
    var groupA = tournament.groups[0];
    groupA.processMatches();
    TournamentUtils_1.orderTeams(groupA);
    it("Russia first", function () {
        expect(groupA.teams[0].name).toEqual("Russia");
    });
    it("Egypt second ", function () {
        expect(groupA.teams[1].name).toEqual("Egypt");
    });
    it("Uruguay last", function () {
        expect(groupA.teams[2].name).toEqual("Uruguay");
    });
    it("Saudi Arabia third", function () {
        expect(groupA.teams[3].name).toEqual("Saudi Arabia");
    });
    console.log("group A: " + groupA);
    var equalTeams = groupA.getEqualTeams();
    it("Egypt an Uruguay are concidered equal", function () {
        expect(equalTeams[0].length).toBe(2);
        let first = equalTeams[0][0].name == "Egypt" || equalTeams[0][0].name == "Uruguay";
        let second = equalTeams[0][1].name == "Egypt" || equalTeams[0][1].name == "Uruguay";
        expect(first).toBeTruthy();
        expect(second).toBeTruthy();
    });
});
describe("we want to be able to select a subset of matches", function () {
    var tournament = TournamentUtils_1.getTournament();
    var groupA = tournament.groups[0];
    var subMatches = TournamentUtils_1.getMatchesFromTeams([groupA.teams[1], groupA.teams[2], groupA.teams[3]], groupA.matches);
    it("we expect 3 matches to be selected", function () {
        expect(subMatches.length).toBe(3);
    });
});
describe("If 3 Teams are equal we need make a difference between them", function () {
    var tournament = TournamentUtils_1.getTournament();
    SpecHelpers_1.setGroupMatchScore3EqualTeams(tournament);
    var groupA = tournament.groups[0];
    groupA.processMatches();
    TournamentUtils_1.orderTeams(groupA);
    it("we expect 3 teams to be equal", function () {
        expect(groupA.getEqualTeams().length).toBe(1);
        expect(groupA.getEqualTeams()[0].length).toBe(3);
    });
    it("Russia should be first", function () {
        expect(groupA.teams[0].name).toBe("Russia");
    });
    it("Saudi Arabia should be second", function () {
        expect(groupA.teams[1].name).toBe("Saudi Arabia");
    });
    it("Uruguay should be third", function () {
        expect(groupA.teams[2].name).toBe("Uruguay");
    });
    it("Egypt should be last", function () {
        expect(groupA.teams[3].name).toBe("Egypt");
    });
});
describe("If 2 on 2 Teams are equal we need make a difference between them", function () {
    var tournament = TournamentUtils_1.getTournament();
    SpecHelpers_1.setGroupMatchScore2on2EqualTeamsWithDifferenceBetween(tournament);
    var groupB = tournament.groups[1];
    groupB.processMatches();
    TournamentUtils_1.orderTeams(groupB, true);
    it("we expect 2 teams to be equal", function () {
        expect(groupB.getEqualTeams().length).toBe(2);
        expect(groupB.getEqualTeams()[0].length).toBe(2);
        expect(groupB.getEqualTeams()[1].length).toBe(2);
    });
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = __webpack_require__(0);
const Group_1 = __webpack_require__(5);
const Tournament_1 = __webpack_require__(6);
const KnockOutRound_1 = __webpack_require__(7);
function getTournament() {
    console.log("***** Pronostiek generation Starting ****");
    let tournament = new Tournament_1.Tournament();
    let allTeams = [
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
    allTeams.forEach((groupTeamsNames, index) => {
        let teams = [];
        groupTeamsNames.forEach(teamName => {
            teams.push(new Team_1.Team(teamName));
        });
        let group = new Group_1.Group("Groep " + groupLetter[index], teams);
        tournament.groups.push(group);
    });
    let rounds = [
        { name: "Round of 16", numberOfMatches: 8 },
        { name: "Quarter Final", numberOfMatches: 4 },
        { name: "Semi Final", numberOfMatches: 2 },
        { name: "Final", numberOfMatches: 1 }
    ];
    rounds.forEach((roundData) => {
        let knockOutRound = new KnockOutRound_1.KnockOutRound(roundData.name, roundData.numberOfMatches);
        tournament.rounds.push(knockOutRound);
    });
    return tournament;
}
exports.getTournament = getTournament;
function compareTeams(teama, teamb) {
    if (teama.points != teamb.points) {
        //compare on points:
        return teamb.points - teama.points;
    }
    else if (teama.getGoalsDifference() != teamb.getGoalsDifference()) {
        //compare on goal diff:
        return teamb.getGoalsDifference() - teama.getGoalsDifference();
    }
    else if (teama.goalsScored != teamb.goalsScored) {
        // on goals scored:
        return teamb.goalsScored - teama.goalsScored;
    }
    return 0;
}
exports.compareTeams = compareTeams;
function getMatchesFromTeams(teams, allMatches) {
    var teamNames = new Array();
    teams.forEach((team) => {
        teamNames.push(team.name);
    });
    var returnVal = new Array();
    allMatches.forEach((match) => {
        if (teamNames.indexOf(match.homeTeamName) != -1 && teamNames.indexOf(match.outTeamName) != -1) {
            returnVal.push(Object.create(match));
        }
    });
    return returnVal;
}
exports.getMatchesFromTeams = getMatchesFromTeams;
function getSubGroup(teams, originalGroup) {
    var group = new Group_1.Group();
    group.teams = [];
    for (var t of teams) {
        group.teams.push(Object.create(t));
    }
    // group.teams = teams.slice();
    group.matches = getMatchesFromTeams(teams, originalGroup.matches);
    for (var t of group.teams) {
        t.reset();
    }
    return group;
}
exports.getSubGroup = getSubGroup;
// export function proccesMatches(group: Group) :void {
//     //group.getAllMatchesPlayed() = true;
//     group.teams.forEach((team) => {
//         team.reset();
//     });
//     group.matches.forEach((match) => {
//         if(match.outTeamScore != undefined && match.homeTeamScore != undefined){
//             //this means match is played, so let do what we need to do:
//             let matchOutCome = match.getOutCome();
//             let homeTeam = group.getTeam(match.homeTeamName);
//             let outTeam = group.getTeam(match.outTeamName);
//             if(matchOutCome == HOME_TEAM_WINS){
//                 homeTeam.points += 3;
//                 homeTeam.matchesWon++;
//                 outTeam.matchesLost++;
//             } else if(matchOutCome == OUT_TEAM_WINS){
//                 outTeam.points += 3;
//                 outTeam.matchesWon++;
//                 homeTeam.matchesLost++;
//             } else {
//                 homeTeam.points += 1;
//                 outTeam.points += 1;
//                 outTeam.matchesDrawed++;
//                 homeTeam.matchesDrawed++;
//             }
//             outTeam.goalsScored += match.outTeamScore;
//             outTeam.goalsConcieved += match.homeTeamScore;
//             homeTeam.goalsScored += match.homeTeamScore;
//             homeTeam.goalsConcieved += match.outTeamScore;
//         } else {
//             group.allMatchesPlayed = false;
//         }
//     });
//     //if all played matches are done, we put the points:
//     group.teams.forEach((team)=>{
//         team.points = team.matchesWon*3 + team.matchesDrawed;
//     });
// }
function orderTeams(group, complete) {
    //reset some stuff:
    group.groupNeedsDraw = false;
    group.equalTeams = new Array();
    group.teams.sort((teama, teamb) => {
        var _ = compareTeams(teama, teamb);
        if (_ == 0) {
            // this means team a and team b are concidered equal:
            group.addToEqualTeams([teama, teamb]);
        }
        return _;
    });
    //IF not all matches are played, we can skipp the rest
    if (!group.allMatchesPlayed) {
        return;
    }
    //check if there are equalteams, and do whats needed:
    if (group.equalTeams.length > 0) {
        if (group.equalTeams[0].length == group.teams.length) {
            //this means all  of the teams were equal, so there is nothing more to do:
            group.groupNeedsDraw = true;
        }
        else {
            //we need to make a subgroup and do the ordering again:
            for (var equalTeamsSubGroup of group.equalTeams) {
                if (complete == undefined || complete) {
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
                if (!group.groupNeedsDraw) {
                    orderTeams(subgroup, false);
                }
                if (subgroup.groupNeedsDraw) {
                    group.groupNeedsDraw = true;
                }
                //after this subgroups have been ordered, so now we order them in
                //subgroup.printGroupStanding();
                orderAccordingToSubGroups(group, subgroup);
            }
        }
    }
    if (complete == undefined || complete) {
        /* console.log("Final print");
         group.printGroupStanding();
         group.printGroupMatches()*/
    }
}
exports.orderTeams = orderTeams;
function orderAccordingToSubGroups(group, subGroup) {
    //find the index of the first team:
    var index = 0;
    for (var team of group.teams) {
        if (subGroup.containsTeamWithName(team.name)) {
            break;
        }
        index++;
    }
    //get copies of the teams
    var teamsToAdd = getSubGroupFromOriginalGroup(group, subGroup);
    //the first team is in position index in the original group
    //so now start replacing from there:
    for (var teamToAdd of teamsToAdd.teams) {
        group.teams.splice(index, 1, teamToAdd);
        index++;
    }
}
function getSubGroupFromOriginalGroup(originalGroup, subGroup) {
    var returnVal = new Group_1.Group();
    returnVal.teams = [];
    for (var subGroupTeam of subGroup.teams) {
        var teamToAdd = Object.assign({}, originalGroup.getTeam((subGroupTeam.name)));
        //var teamToAdd = Object.create(originalGroup.getTeam(subGroupTeam.name));
        returnVal.teams.push(teamToAdd);
    }
    return returnVal;
}
function addToNextRound(tournament, groupIndex) {
    var achtsteFinale = tournament.rounds[0];
    if (groupIndex == 0) {
        achtsteFinale.matches[0].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[4].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[8].homeTeamName = tournament.groups[groupIndex].teams[2].name;
        achtsteFinale.matches[12].outTeamName = tournament.groups[groupIndex].teams[3].name;
    }
    else if (groupIndex == 1) {
        achtsteFinale.matches[1].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[5].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[9].homeTeamName = tournament.groups[groupIndex].teams[2].name;
        achtsteFinale.matches[13].outTeamName = tournament.groups[groupIndex].teams[3].name;
    }
    else if (groupIndex == 2) {
        achtsteFinale.matches[2].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[6].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[10].homeTeamName = tournament.groups[groupIndex].teams[2].name;
        achtsteFinale.matches[14].outTeamName = tournament.groups[groupIndex].teams[3].name;
    }
    else if (groupIndex == 3) {
        achtsteFinale.matches[3].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[7].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[11].homeTeamName = tournament.groups[groupIndex].teams[2].name;
        achtsteFinale.matches[15].outTeamName = tournament.groups[groupIndex].teams[3].name;
    }
    else if (groupIndex == 4) {
        achtsteFinale.matches[0].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[4].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[8].outTeamName = tournament.groups[groupIndex].teams[3].name;
        achtsteFinale.matches[12].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    }
    else if (groupIndex == 5) {
        achtsteFinale.matches[1].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[5].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[9].outTeamName = tournament.groups[groupIndex].teams[3].name;
        achtsteFinale.matches[13].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    }
    else if (groupIndex == 6) {
        achtsteFinale.matches[2].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[6].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[10].outTeamName = tournament.groups[groupIndex].teams[3].name;
        achtsteFinale.matches[14].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    }
    else if (groupIndex == 7) {
        achtsteFinale.matches[3].outTeamName = tournament.groups[groupIndex].teams[1].name;
        achtsteFinale.matches[7].homeTeamName = tournament.groups[groupIndex].teams[0].name;
        achtsteFinale.matches[11].outTeamName = tournament.groups[groupIndex].teams[3].name;
        achtsteFinale.matches[15].homeTeamName = tournament.groups[groupIndex].teams[2].name;
    }
}
exports.addToNextRound = addToNextRound;
//   export function processRound(tournament: Tournament,roundIndex: number) {
//       if(roundIndex == tournament.rounds.length){
//           return;
//       }
//       let correction = 0;
//       const round = tournament.rounds[roundIndex];
//       const nextRound = tournament.rounds[roundIndex+1];
//      round.matches.forEach((match:KnockoutMatch, index) => {
//           let winnernumber: number;
//           let loserNumber: number;
//            if(index%2 == 0 ){
//                if(index != 0){
//                   correction++;
//               }
//               if(correction == round.numberOfPlaces/4){
//                   correction = 0;
//               }
//               //console.log("even", index , "correction", correction);
//                winnernumber = match.matchNumber+16 -correction;
//                loserNumber = match.matchNumber+16+round.numberOfPlaces/4 - correction;
//               //console.log(winnernumber, loserNumber);
//           } else {
//               //console.log("odd", index, "correction", correction);
//               winnernumber = match.matchNumber+15 -correction;
//               loserNumber = match.matchNumber+15+round.numberOfPlaces/4 - correction;
//               //console.log(winnernumber, loserNumber);
//           }
//           const winnerMatch = nextRound.matches.find((match) => {
//               return match.matchNumber == winnernumber;
//           });
//           const loserMatch = nextRound.matches.find((match) => {
//               return match.matchNumber == loserNumber;
//           });
//           if(index%2 == 0){
//               winnerMatch.homeTeamName = match.getWinner();
//               loserMatch.homeTeamName = match.getLoser();
//           } else {
//               winnerMatch.outTeamName = match.getWinner();
//               loserMatch.outTeamName = match.getLoser();
//           }
//         });
//       }
// *** Frontend Helper methods: *** //
function replaceBasedOnName(newGroup, groups) {
    let index = findIndexOfGroupBasedOnName(newGroup, groups);
    groups[index] = newGroup;
}
exports.replaceBasedOnName = replaceBasedOnName;
function findIndexOfGroupBasedOnName(groupToFind, groups) {
    for (let i in groups) {
        if (groups[i].groupname == groupToFind.groupname) {
            return i;
        }
    }
}
// *** END *** //


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = __webpack_require__(0);
const Match_1 = __webpack_require__(1);
const Constants_1 = __webpack_require__(2);
class Group {
    constructor(groupname, teams) {
        this.allMatchesPlayed = false;
        this.groupNeedsDraw = false;
        this.groupname = groupname;
        this.teams = teams;
        if (this.teams) {
            this.initMatches();
        }
    }
    initMatches() {
        this.matches = [];
        this.matches.push(new Match_1.Match(this.teams[0].name, this.teams[1].name));
        this.matches.push(new Match_1.Match(this.teams[2].name, this.teams[3].name));
        this.matches.push(new Match_1.Match(this.teams[0].name, this.teams[2].name));
        this.matches.push(new Match_1.Match(this.teams[3].name, this.teams[1].name));
        this.matches.push(new Match_1.Match(this.teams[3].name, this.teams[0].name));
        this.matches.push(new Match_1.Match(this.teams[1].name, this.teams[2].name));
    }
    processMatches() {
        this.allMatchesPlayed = true;
        this.teams.forEach((team) => {
            team.reset();
        });
        this.matches.forEach((match) => {
            if (match.outTeamScore != undefined && match.homeTeamScore != undefined) {
                //this means match is played, so let do what we need to do:
                let matchOutCome = match.getOutCome();
                let homeTeam = this.getTeam(match.homeTeamName);
                let outTeam = this.getTeam(match.outTeamName);
                if (matchOutCome == Constants_1.HOME_TEAM_WINS) {
                    homeTeam.points += 3;
                    homeTeam.matchesWon++;
                    outTeam.matchesLost++;
                }
                else if (matchOutCome == Constants_1.OUT_TEAM_WINS) {
                    outTeam.points += 3;
                    outTeam.matchesWon++;
                    homeTeam.matchesLost++;
                }
                else {
                    homeTeam.points += 1;
                    outTeam.points += 1;
                    outTeam.matchesDrawed++;
                    homeTeam.matchesDrawed++;
                }
                outTeam.goalsScored += match.outTeamScore;
                outTeam.goalsConcieved += match.homeTeamScore;
                homeTeam.goalsScored += match.homeTeamScore;
                homeTeam.goalsConcieved += match.outTeamScore;
            }
            else {
                this.allMatchesPlayed = false;
            }
        });
        //if all played matches are done, we put the points:
        this.teams.forEach((team) => {
            team.points = team.matchesWon * 3 + team.matchesDrawed;
        });
    }
    //this get the corresponding to the teamname passed to the method:
    getTeam(name) {
        for (let team of this.teams) {
            if (team.name == name) {
                return team;
            }
        }
    }
    printGroupStanding() {
        this.teams.forEach((team) => {
            console.log(`${team.name}  w:${team.matchesWon}  d:${team.matchesDrawed} l:${team.matchesLost} s:${team.goalsScored} c:${team.goalsConcieved} P:${team.points}`);
        });
        console.log("All played: " + this.allMatchesPlayed);
    }
    printGroupMatches() {
        this.matches.forEach((match) => {
            console.log(`${match.homeTeamName} - ${match.outTeamName} : ${match.homeTeamScore} - ${match.outTeamScore}`);
        });
    }
    getEqualTeams() {
        return this.equalTeams;
    }
    getAllMatchesPlayed() {
        return this.allMatchesPlayed;
    }
    addToEqualTeams(teamsToAdd) {
        if (this.getEqualTeams().length == 0) {
            // first, just add it:
            this.equalTeams.push(teamsToAdd);
        }
        else {
            var added = false;
            // we need to check is one of the 2 teams already is in on of the arrays that was already added:
            for (var alreadyAddedTeams of this.equalTeams) {
                //check if it contains one of them:
                var indexOfExistingTeam = 0;
                for (var teamToAdd of teamsToAdd) {
                    //if it already in there, just add the other one as well and we are done:
                    if (alreadyAddedTeams.lastIndexOf(teamToAdd) != -1) {
                        break;
                    }
                    indexOfExistingTeam++;
                }
                //if this is 2, this means we did not find the team in alreadyAddedTeams
                if (indexOfExistingTeam != 2) {
                    //if is 0 or 1, we found is, so we need to add the other team.
                    let indexOfTeamToAdd = indexOfExistingTeam == 1 ? 0 : 1;
                    //console.log(indexOfTeamToAdd);
                    alreadyAddedTeams.push(teamsToAdd[indexOfTeamToAdd]);
                    added = true;
                    break;
                }
            }
            if (!added) {
                // this mean teams are equal 2 on 2
                this.equalTeams.push(teamsToAdd);
            }
        }
    }
    /**
     * This is purely for helping method:
     */
    containsTeamWithName(name) {
        for (var team of this.teams) {
            if (team.name == name) {
                return true;
            }
        }
        return false;
    }
    deserialize(input) {
        const group = new Group();
        Object.assign(group, input);
        let newTeams = [];
        group.teams.forEach(team => {
            newTeams.push(Team_1.Team.deserialize(team));
        });
        group.teams = newTeams;
        let newMatches = [];
        group.matches.forEach(match => {
            newMatches.push(Match_1.Match.deserialize(match));
        });
        group.matches = newMatches;
        return group;
    }
}
exports.Group = Group;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Tournament {
    constructor() {
        this.groups = [];
        this.rounds = [];
    }
}
exports.Tournament = Tournament;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Match_1 = __webpack_require__(1);
class KnockOutRound {
    constructor(name, numberOfMatches) {
        this.name = name;
        this.matches = [];
        for (let i = 0; i < numberOfMatches; i++) {
            this.matches.push(new Match_1.KnockoutMatch(undefined, undefined));
        }
    }
}
exports.KnockOutRound = KnockOutRound;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setGroupMatchScores(tournament) {
    var groupA = tournament.groups[0];
    groupA.matches[0].outTeamScore = 1;
    groupA.matches[0].homeTeamScore = 3;
    groupA.matches[1].outTeamScore = 0;
    groupA.matches[1].homeTeamScore = 0;
    groupA.matches[2].outTeamScore = 3;
    groupA.matches[2].homeTeamScore = 3;
    groupA.matches[3].outTeamScore = 3;
    groupA.matches[3].homeTeamScore = 3;
}
exports.setGroupMatchScores = setGroupMatchScores;
function setGroupMatchScore2FullyEqualTeams(tournament) {
    setGroupMatchScores(tournament);
    var groupA = tournament.groups[0];
    groupA.matches[4].outTeamScore = 3;
    groupA.matches[4].homeTeamScore = 3;
    groupA.matches[5].outTeamScore = 3;
    groupA.matches[5].homeTeamScore = 3;
}
exports.setGroupMatchScore2FullyEqualTeams = setGroupMatchScore2FullyEqualTeams;
function setGroupMatchScore3EqualTeams(tournament) {
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
exports.setGroupMatchScore3EqualTeams = setGroupMatchScore3EqualTeams;
function setGroupMatchScore2on2EqualTeamsWithDifferenceBetween(tournament) {
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
exports.setGroupMatchScore2on2EqualTeamsWithDifferenceBetween = setGroupMatchScore2on2EqualTeamsWithDifferenceBetween;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWNmYTI0ODNmMWUyNzZjZjJhYTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9UZWFtLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3Rlc3QvaW5kZXguc3BlYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREE7SUFZSSxZQUFZLElBQVc7UUFUdkIsV0FBTSxHQUFX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QUVsQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUV2QyxDQUFDO0FBdEJELHNIQXNCQyIsImZpbGUiOiJBcHBTcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWNmYTI0ODNmMWUyNzZjZjJhYTMiLCJpbXBvcnQge0dyb3VwfSBmcm9tIFwiLi9Hcm91cFwiO1xuXG5leHBvcnQgY2xhc3MgVGVhbSB7XG5cbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHBvaW50czogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc1dvbjogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc0xvc3Q6IG51bWJlciA9IDA7XG4gICAgbWF0Y2hlc0RyYXdlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc1Njb3JlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc0NvbmNpZXZlZDogbnVtYmVyID0gMDtcbiAgICBzdWJHcm91cEluZGV4OiBudW1iZXIgPSAwO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgIH1cblxuXG5cbiAgICByZXNldCgpIDp2b2lkIHtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IDA7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzRHJhd2VkID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzTG9zdCA9IDA7XG5cbiAgICAgICAgdGhpcy5nb2Fsc1Njb3JlZCA9IDA7XG4gICAgICAgIHRoaXMuZ29hbHNDb25jaWV2ZWQgPSAwO1xuICAgICAgICB0aGlzLnN1Ykdyb3VwSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGdldEdvYWxzRGlmZmVyZW5jZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbHNTY29yZWQgLSB0aGlzLmdvYWxzQ29uY2lldmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IFRlYW0ge1xuICAgICAgICBjb25zdCBuYW1lID0gaW5wdXQubmFtZTtcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBUZWFtKG5hbWUpO1xuICAgICAgICAvKk9iamVjdC5hc3NpZ24oVGVhbSwgaW5wdXQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZWFtKTsqL1xuICAgICAgICB0ZWFtLnBvaW50cyA9ICBOdW1iZXIoaW5wdXQucG9pbnRzKTtcbiAgICAgICAgdGVhbS5tYXRjaGVzV29uID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNXb24pO1xuICAgICAgICB0ZWFtLm1hdGNoZXNMb3N0ID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNMb3N0KTtcbiAgICAgICAgdGVhbS5tYXRjaGVzRHJhd2VkID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNEcmF3ZWQpO1xuICAgICAgICB0ZWFtLmdvYWxzU2NvcmVkID0gTnVtYmVyKGlucHV0LmdvYWxzU2NvcmVkKTtcbiAgICAgICAgdGVhbS5nb2Fsc0NvbmNpZXZlZCA9IE51bWJlcihpbnB1dC5nb2Fsc0NvbmNpZXZlZCk7XG4gICAgICAgIHRlYW0uc3ViR3JvdXBJbmRleCA9IE51bWJlcihpbnB1dC5zdWJHcm91cEluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRlYW07XG5cbiAgICB9XG5cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVGVhbS50cyIsImltcG9ydCB7VGVhbX0gZnJvbSBcIi4vVGVhbVwiO1xuaW1wb3J0IHsgSE9NRV9URUFNX1dJTlMsIE1BVENIX0lTX0RSQVcsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIE1hdGNoe1xuICAgIGhvbWVUZWFtTmFtZSA6IHN0cmluZztcbiAgICBvdXRUZWFtTmFtZTogc3RyaW5nO1xuICAgIGhvbWVUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKGhvbWVUZWFtTmFtZTogc3RyaW5nLCBvdXRUZWFtTmFtZSA6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuaG9tZVRlYW1OYW1lID0gaG9tZVRlYW1OYW1lO1xuICAgICAgICB0aGlzLm91dFRlYW1OYW1lID0gb3V0VGVhbU5hbWU7XG4gICAgfVxuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcbiAgICAgICAgaWYodGhpcy5ob21lVGVhbVNjb3JlID4gdGhpcy5vdXRUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vdXRUZWFtU2NvcmUgPiB0aGlzLmhvbWVUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIE9VVF9URUFNX1dJTlM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1BVENIX0lTX0RSQVc7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogTWF0Y2gge1xuICAgICAgICBjb25zdCBtID0gbmV3IE1hdGNoKGlucHV0LmhvbWVUZWFtTmFtZSwgaW5wdXQub3V0VGVhbU5hbWUpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG0sIGlucHV0KTtcbiAgICAgICAgcmV0dXJuIG07XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgY2xhc3MgS25vY2tvdXRNYXRjaCBleHRlbmRzIE1hdGNoIHtcbiAgICBob21lVGVhbVBlbmFsdHlTY29yZSA6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtUGVuYWx0eVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBsZXQgb3V0Q29tZSA9ICBzdXBlci5nZXRPdXRDb21lKCk7XG4gICAgICAgIGlmKG91dENvbWUgPT0gTUFUQ0hfSVNfRFJBVyl7XG4gICAgICAgICAgICAvL1RoaXMgbWVhbnMgbWF0Y2ggd2FzIHdpdGggcGVuYWxzIC4uLlxuICAgICAgICAgICAgaWYodGhpcy5ob21lVGVhbVBlbmFsdHlTY29yZSA+IHRoaXMub3V0VGVhbVBlbmFsdHlTY29yZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBPVVRfVEVBTV9XSU5TXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dENvbWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9NYXRjaC50cyIsImV4cG9ydCBjb25zdCBIT01FX1RFQU1fV0lOUyA6IG51bWJlciA9ICAxO1xuZXhwb3J0IGNvbnN0IE9VVF9URUFNX1dJTlMgOiBudW1iZXIgPSAgMjtcbmV4cG9ydCBjb25zdCBNQVRDSF9JU19EUkFXIDogbnVtYmVyPSAgMDtcblxuZXhwb3J0IGNvbnN0IENPT0tJRV9OQU1FIDogc3RyaW5nID0gXCJqX3VpZFwiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwiXG5pbXBvcnQge2dldE1hdGNoZXNGcm9tVGVhbXMsIGdldFRvdXJuYW1lbnQsIG9yZGVyVGVhbXN9IGZyb20gXCIuLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlsc1wiO1xuaW1wb3J0IHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzLCBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zLCBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyxcbiAgICBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2VlblxufSBmcm9tIFwiLi9TcGVjSGVscGVyc1wiO1xuaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cblxuZGVzY3JpYmUoXCJ0aGlzIHdpbGwgdGVzdCB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgZ3JvdXAgbWF0Y2hlczpcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgIHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgaXQoXCJ0b3VybmFtZW50IHNob3VsZCBjb250YWluIGdyb3VwMSBBXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLmdyb3VwbmFtZSkudG9FcXVhbChcIkdyb3VwIEFcIik7XG4gICAgfSk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgbGV0IGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcblxuICAgIGxldCB0ZWFtQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzBdO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDMgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodGVhbUEucG9pbnRzKS50b0VxdWFsKDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEMgaGFzIDEgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbMl0ucG9pbnRzKS50b0VxdWFsKDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEQgaGFzIDIgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbM10ucG9pbnRzKS50b0VxdWFsKDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIHNjb3JlZCAzIGdvYWxzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLmdvYWxzU2NvcmVkKS50b0JlKDYpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIGNvbmNpZXZlZCA0IGdvYWxzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLmdvYWxzQ29uY2lldmVkKS50b0JlKDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDEgZHJhd2VkIG1hdGNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLm1hdGNoZXNEcmF3ZWQpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMSB3b24gbWF0Y2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEubWF0Y2hlc1dvbikudG9CZSgxKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZShcInRoaXMgd2lsbCB0ZXN0IHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBncm91cCBtYXRjaGVzOlwiLCBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyICB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEEpO1xuXG4gICAgaXQoXCJSdXNzaWEgZmlyc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMF0ubmFtZSkudG9FcXVhbChcIlJ1c3NpYVwiKTtcbiAgICB9KTtcblxuXG4gICAgaXQoXCJFZ3lwdCBzZWNvbmQgXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1sxXS5uYW1lKS50b0VxdWFsKFwiRWd5cHRcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIlVydWd1YXkgbGFzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMl0ubmFtZSkudG9FcXVhbChcIlVydWd1YXlcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIlNhdWRpIEFyYWJpYSB0aGlyZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbM10ubmFtZSkudG9FcXVhbChcIlNhdWRpIEFyYWJpYVwiKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcImdyb3VwIEE6IFwiICsgZ3JvdXBBKTtcbiAgICB2YXIgZXF1YWxUZWFtcyA9IGdyb3VwQS5nZXRFcXVhbFRlYW1zKCk7XG5cbiAgICBpdChcIkVneXB0IGFuIFVydWd1YXkgYXJlIGNvbmNpZGVyZWQgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICBleHBlY3QoZXF1YWxUZWFtc1swXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgbGV0IGZpcnN0ID0gZXF1YWxUZWFtc1swXVswXS5uYW1lID09IFwiRWd5cHRcIiB8fCAgZXF1YWxUZWFtc1swXVswXS5uYW1lID09IFwiVXJ1Z3VheVwiO1xuICAgICAgIGxldCBzZWNvbmQgPSBlcXVhbFRlYW1zWzBdWzFdLm5hbWUgPT0gXCJFZ3lwdFwiIHx8ICBlcXVhbFRlYW1zWzBdWzFdLm5hbWUgPT0gXCJVcnVndWF5XCI7XG4gICAgICAgZXhwZWN0KGZpcnN0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgZXhwZWN0KHNlY29uZCkudG9CZVRydXRoeSgpO1xuXG4gICAgfSk7XG5cbn0pO1xuXG5kZXNjcmliZShcIndlIHdhbnQgdG8gYmUgYWJsZSB0byBzZWxlY3QgYSBzdWJzZXQgb2YgbWF0Y2hlc1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIHZhciBzdWJNYXRjaGVzID0gIGdldE1hdGNoZXNGcm9tVGVhbXMoW2dyb3VwQS50ZWFtc1sxXSxncm91cEEudGVhbXNbMl0sZ3JvdXBBLnRlYW1zWzNdXSxncm91cEEubWF0Y2hlcylcblxuICAgIGl0KFwid2UgZXhwZWN0IDMgbWF0Y2hlcyB0byBiZSBzZWxlY3RlZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBleHBlY3Qoc3ViTWF0Y2hlcy5sZW5ndGgpLnRvQmUoMyk7XG4gICAgfSk7XG5cbn0pO1xuXG5cbmRlc2NyaWJlKFwiSWYgMyBUZWFtcyBhcmUgZXF1YWwgd2UgbmVlZCBtYWtlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW1cIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyh0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQSk7XG5cblxuICAgIGl0KFwid2UgZXhwZWN0IDMgdGVhbXMgdG8gYmUgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgZXhwZWN0KGdyb3VwQS5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICAgICBleHBlY3QoZ3JvdXBBLmdldEVxdWFsVGVhbXMoKVswXS5sZW5ndGgpLnRvQmUoMyk7XG5cbiAgICB9KTtcblxuXG4gICAgaXQoXCJSdXNzaWEgc2hvdWxkIGJlIGZpcnN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1swXS5uYW1lKS50b0JlKFwiUnVzc2lhXCIpXG4gICAgfSk7XG5cbiAgICBpdChcIlNhdWRpIEFyYWJpYSBzaG91bGQgYmUgc2Vjb25kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1sxXS5uYW1lKS50b0JlKFwiU2F1ZGkgQXJhYmlhXCIpXG4gICAgfSlcbiAgICBpdChcIlVydWd1YXkgc2hvdWxkIGJlIHRoaXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1syXS5uYW1lKS50b0JlKFwiVXJ1Z3VheVwiKVxuICAgIH0pXG4gICAgaXQoXCJFZ3lwdCBzaG91bGQgYmUgbGFzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbM10ubmFtZSkudG9CZShcIkVneXB0XCIpXG4gICAgfSlcblxuXG5cbn0pO1xuXG5kZXNjcmliZShcIklmIDIgb24gMiBUZWFtcyBhcmUgZXF1YWwgd2UgbmVlZCBtYWtlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW1cIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEIgPSB0b3VybmFtZW50Lmdyb3Vwc1sxXTtcbiAgICBncm91cEIucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQiwgdHJ1ZSk7XG5cblxuICAgIGl0KFwid2UgZXhwZWN0IDIgdGVhbXMgdG8gYmUgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKVswXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpWzFdLmxlbmd0aCkudG9CZSgyKTtcbiAgICB9KTtcblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9pbmRleC5zcGVjLnRzIiwiaW1wb3J0IHsgS25vY2tvdXRNYXRjaCB9IGZyb20gJy4vLi4vbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gnO1xuaW1wb3J0IHtQcm9ub3N0aWVrfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvUHJvbm9zdGlla1wiO1xuaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvVGVhbVwiO1xuaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwXCI7XG5pbXBvcnQge01hdGNofSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2hcIjtcbmltcG9ydCB7SE9NRV9URUFNX1dJTlMsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9tb2RlbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5pbXBvcnQge0tub2NrT3V0Um91bmR9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Lbm9ja091dFJvdW5kXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3VybmFtZW50KCkgOiBUb3VybmFtZW50IHtcblxuICAgIGNvbnNvbGUubG9nKFwiKioqKiogUHJvbm9zdGllayBnZW5lcmF0aW9uIFN0YXJ0aW5nICoqKipcIik7XG5cbiAgICBsZXQgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBuZXcgVG91cm5hbWVudCgpO1xuXG4gICAgbGV0IGFsbFRlYW1zID0gIFtcbiAgICAgICAgW1wiUnVzc2lhXCIsIFwiU2F1ZGkgQXJhYmlhXCIsIFwiRWd5cHRcIiwgXCJVcnVndWF5XCJdLFxuICAgICAgICBbXCJQb3J0dWdhbFwiLCBcIlNwYWluXCIsIFwiTW9yb2Njb1wiLCBcIklyYW5cIl0sXG4gICAgICAgIFtcIkZyYW5jZVwiLCBcIkF1c3RyYWxpYVwiLCBcIlBlcnVcIiwgXCJEZW5tYXJrXCJdLFxuICAgICAgICBbXCJBcmdlbnRpbmFcIiwgXCJJY2VsYW5kXCIsIFwiQ3JvYXRpYVwiLCBcIk5pZ2VyaWFcIl0sXG4gICAgICAgIFtcIkJyYXppbFwiLCBcIlN3aXR6ZXJsYW5kXCIsIFwiQ29zdGEgUmljYVwiLCBcIlNlcmJpYVwiXSxcbiAgICAgICAgW1wiR2VybWFueVwiLCBcIk1leGljb1wiLCBcIlN3ZWRlblwiLCBcIktvcmVhIFJlcHVibGljXCJdLFxuICAgICAgICBbXCJCZWxnaXVtXCIsIFwiUGFuYW1hXCIsIFwiVHVuaXNpYVwiLCBcIkVuZ2xhbmRcIl0sXG4gICAgICAgIFtcIlBvbGFuZFwiLCBcIlNlbmVnYWxcIiwgXCJDb2xvbWJpYVwiLCBcIkphcGFuXCJdLFxuICAgIF07XG5cbiAgICBsZXQgZ3JvdXBMZXR0ZXIgPSBbXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCIsIFwiRVwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiXTtcblxuICAgIGFsbFRlYW1zLmZvckVhY2goIChncm91cFRlYW1zTmFtZXMsaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHRlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgZ3JvdXBUZWFtc05hbWVzLmZvckVhY2godGVhbU5hbWUgPT4ge1xuICAgICAgICAgICAgdGVhbXMucHVzaChuZXcgVGVhbSh0ZWFtTmFtZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGdyb3VwID0gbmV3IEdyb3VwIChcIkdyb2VwIFwiICsgZ3JvdXBMZXR0ZXJbaW5kZXhdLCB0ZWFtcyk7XG4gICAgICAgIHRvdXJuYW1lbnQuZ3JvdXBzLnB1c2goZ3JvdXApO1xuICAgIH0pO1xuXG4gICAgbGV0IHJvdW5kcz1bXG4gICAgICAgIHtuYW1lOlwiUm91bmQgb2YgMTZcIixudW1iZXJPZk1hdGNoZXM6OH0sXG4gICAgICAgIHtuYW1lOlwiUXVhcnRlciBGaW5hbFwiLG51bWJlck9mTWF0Y2hlczo0fSxcbiAgICAgICAge25hbWU6XCJTZW1pIEZpbmFsXCIsbnVtYmVyT2ZNYXRjaGVzOjJ9LFxuICAgICAgICB7bmFtZTpcIkZpbmFsXCIsbnVtYmVyT2ZNYXRjaGVzOjF9XG4gICAgICAgIF07XG5cbiAgICByb3VuZHMuZm9yRWFjaCgocm91bmREYXRhKSA9PiB7XG4gICAgICAgIGxldCBrbm9ja091dFJvdW5kID0gbmV3IEtub2NrT3V0Um91bmQocm91bmREYXRhLm5hbWUsIHJvdW5kRGF0YS5udW1iZXJPZk1hdGNoZXMpO1xuICAgICAgICB0b3VybmFtZW50LnJvdW5kcy5wdXNoKGtub2NrT3V0Um91bmQpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiB0b3VybmFtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVRlYW1zKHRlYW1hOiBUZWFtLCB0ZWFtYiA6IFRlYW0pIDogbnVtYmVyIHtcblxuICAgIGlmKHRlYW1hLnBvaW50cyAhPSB0ZWFtYi5wb2ludHMpe1xuICAgICAgICAvL2NvbXBhcmUgb24gcG9pbnRzOlxuICAgICAgICByZXR1cm4gdGVhbWIucG9pbnRzIC0gdGVhbWEucG9pbnRzO1xuICAgIH0gZWxzZSBpZih0ZWFtYS5nZXRHb2Fsc0RpZmZlcmVuY2UoKSAhPSB0ZWFtYi5nZXRHb2Fsc0RpZmZlcmVuY2UoKSl7XG4gICAgICAgIC8vY29tcGFyZSBvbiBnb2FsIGRpZmY6XG4gICAgICAgIHJldHVybiB0ZWFtYi5nZXRHb2Fsc0RpZmZlcmVuY2UoKSAtdGVhbWEuZ2V0R29hbHNEaWZmZXJlbmNlKCk7XG4gICAgfSBlbHNlIGlmKHRlYW1hLmdvYWxzU2NvcmVkICE9IHRlYW1iLmdvYWxzU2NvcmVkKXtcbiAgICAgICAgLy8gb24gZ29hbHMgc2NvcmVkOlxuICAgICAgICByZXR1cm4gdGVhbWIuZ29hbHNTY29yZWQgLSB0ZWFtYS5nb2Fsc1Njb3JlZDtcbiAgICB9XG4gICAgcmV0dXJuIDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdGNoZXNGcm9tVGVhbXModGVhbXMgOiBUZWFtW10sIGFsbE1hdGNoZXMgOiBNYXRjaFtdKSA6IE1hdGNoW10ge1xuICAgIHZhciB0ZWFtTmFtZXMgID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICB0ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgdGVhbU5hbWVzLnB1c2godGVhbS5uYW1lKTtcbiAgICB9KTtcblxuICAgIHZhciByZXR1cm5WYWwgOiBNYXRjaCBbXSA9IG5ldyBBcnJheTxNYXRjaD4oKTtcbiAgICBhbGxNYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgaWYodGVhbU5hbWVzLmluZGV4T2YobWF0Y2guaG9tZVRlYW1OYW1lKSAhPSAtMSAmJiB0ZWFtTmFtZXMuaW5kZXhPZihtYXRjaC5vdXRUZWFtTmFtZSkgIT0gLTEpe1xuICAgICAgICAgICAgIHJldHVyblZhbC5wdXNoKE9iamVjdC5jcmVhdGUobWF0Y2gpKTtcbiAgICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ViR3JvdXAodGVhbXMgOiBUZWFtW10sIG9yaWdpbmFsR3JvdXAgOiBHcm91cCkgOiAgR3JvdXAge1xuICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgZ3JvdXAudGVhbXMgPSBbXVxuICAgIGZvcih2YXIgdCBvZiB0ZWFtcykge1xuICAgICAgICAgZ3JvdXAudGVhbXMucHVzaChPYmplY3QuY3JlYXRlKHQpKTtcbiAgICB9XG4gICAgLy8gZ3JvdXAudGVhbXMgPSB0ZWFtcy5zbGljZSgpO1xuICAgICBncm91cC5tYXRjaGVzID0gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyxvcmlnaW5hbEdyb3VwLm1hdGNoZXMgKTtcbiAgICAgZm9yKHZhciB0IG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgIHQucmVzZXQoKTtcbiAgICAgfVxuICAgICByZXR1cm4gZ3JvdXA7XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBwcm9jY2VzTWF0Y2hlcyhncm91cDogR3JvdXApIDp2b2lkIHtcblxuLy8gICAgIC8vZ3JvdXAuZ2V0QWxsTWF0Y2hlc1BsYXllZCgpID0gdHJ1ZTtcblxuLy8gICAgIGdyb3VwLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbi8vICAgICAgICAgdGVhbS5yZXNldCgpO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgZ3JvdXAubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuLy8gICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbi8vICAgICAgICAgICAgIC8vdGhpcyBtZWFucyBtYXRjaCBpcyBwbGF5ZWQsIHNvIGxldCBkbyB3aGF0IHdlIG5lZWQgdG8gZG86XG4vLyAgICAgICAgICAgICBsZXQgbWF0Y2hPdXRDb21lID0gbWF0Y2guZ2V0T3V0Q29tZSgpO1xuLy8gICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gZ3JvdXAuZ2V0VGVhbShtYXRjaC5ob21lVGVhbU5hbWUpO1xuLy8gICAgICAgICAgICAgbGV0IG91dFRlYW0gPSBncm91cC5nZXRUZWFtKG1hdGNoLm91dFRlYW1OYW1lKTtcbi8vICAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4vLyAgICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDM7XG4vLyAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc1dvbisrO1xuLy8gICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbi8vICAgICAgICAgICAgIH0gZWxzZSBpZihtYXRjaE91dENvbWUgPT0gT1VUX1RFQU1fV0lOUyl7XG4vLyAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMztcbi8vICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbi8vICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzTG9zdCsrO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbi8vICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAxO1xuLy8gICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuLy8gICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIG91dFRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuLy8gICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuLy8gICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbi8vICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGdyb3VwLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgfSk7XG5cbi8vICAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4vLyAgICAgZ3JvdXAudGVhbXMuZm9yRWFjaCgodGVhbSk9Pntcbi8vICAgICAgICAgdGVhbS5wb2ludHMgPSB0ZWFtLm1hdGNoZXNXb24qMyArIHRlYW0ubWF0Y2hlc0RyYXdlZDtcbi8vICAgICB9KTtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyVGVhbXMoZ3JvdXAgOiBHcm91cCwgY29tcGxldGU/IDogYm9vbGVhbikgOiB2b2lkIHtcbiAgICAvL3Jlc2V0IHNvbWUgc3R1ZmY6XG4gICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSBmYWxzZTtcbiAgICBncm91cC5lcXVhbFRlYW1zID0gbmV3IEFycmF5PFRlYW1bXT4oKTtcbiAgICBncm91cC50ZWFtcy5zb3J0KCAodGVhbWEsIHRlYW1iKSA9PiB7XG4gICAgICAgIHZhciBfID0gIGNvbXBhcmVUZWFtcyh0ZWFtYSwgdGVhbWIpO1xuICAgICAgICBpZiggXyA9PSAwKXtcbiAgICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdGVhbSBhIGFuZCB0ZWFtIGIgYXJlIGNvbmNpZGVyZWQgZXF1YWw6XG4gICAgICAgICAgICBncm91cC5hZGRUb0VxdWFsVGVhbXMoW3RlYW1hLCB0ZWFtYl0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH0pO1xuXG4gICAgLy9JRiBub3QgYWxsIG1hdGNoZXMgYXJlIHBsYXllZCwgd2UgY2FuIHNraXBwIHRoZSByZXN0XG4gICAgaWYoIWdyb3VwLmFsbE1hdGNoZXNQbGF5ZWQpe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vY2hlY2sgaWYgdGhlcmUgYXJlIGVxdWFsdGVhbXMsIGFuZCBkbyB3aGF0cyBuZWVkZWQ6XG4gICAgaWYoZ3JvdXAuZXF1YWxUZWFtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgaWYoZ3JvdXAuZXF1YWxUZWFtc1swXS5sZW5ndGggPT0gZ3JvdXAudGVhbXMubGVuZ3RoKXtcbiAgICAgICAgICAgIC8vdGhpcyBtZWFucyBhbGwgIG9mIHRoZSB0ZWFtcyB3ZXJlIGVxdWFsLCBzbyB0aGVyZSBpcyBub3RoaW5nIG1vcmUgdG8gZG86XG4gICAgICAgICAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3dlIG5lZWQgdG8gbWFrZSBhIHN1Ymdyb3VwIGFuZCBkbyB0aGUgb3JkZXJpbmcgYWdhaW46XG4gICAgICAgICAgICBmb3IgKCB2YXIgZXF1YWxUZWFtc1N1Ykdyb3VwIG9mIGdyb3VwLmVxdWFsVGVhbXMpe1xuICAgICAgICAgICAgICAgIGlmKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgICAgLyogY29uc29sZS5sb2coXCJCZWZvcmUgXCIpO1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHJpbnRHcm91cE1hdGNoZXMoKSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgdmFyIHN1Ymdyb3VwID0gZ2V0U3ViR3JvdXAoZXF1YWxUZWFtc1N1Ykdyb3VwLCBncm91cCk7XG4gICAgICAgICAgICAgICAgc3ViZ3JvdXAucHJvY2Vzc01hdGNoZXMoKTtcblxuICAgICAgICAgICAgICAgIC8vd2F0Y2ggb3V0IGhlcmUgZm9yIGluZmluaXRlIGxvb3BzISEhXG4gICAgICAgICAgICAgICAgLyppZiAoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVGVhbXMoc3ViZ3JvdXAsZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgaWYoIWdyb3VwLmdyb3VwTmVlZHNEcmF3KXtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJUZWFtcyhzdWJncm91cCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN1Ymdyb3VwLmdyb3VwTmVlZHNEcmF3KXtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSAgdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2FmdGVyIHRoaXMgc3ViZ3JvdXBzIGhhdmUgYmVlbiBvcmRlcmVkLCBzbyBub3cgd2Ugb3JkZXIgdGhlbSBpblxuICAgICAgICAgICAgICAgIC8vc3ViZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cCwgc3ViZ3JvdXApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpe1xuICAgICAgIC8qIGNvbnNvbGUubG9nKFwiRmluYWwgcHJpbnRcIik7XG4gICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpKi9cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cDogR3JvdXAsIHN1Ykdyb3VwIDogR3JvdXApe1xuXG5cbiAgICAvL2ZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB0ZWFtOlxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yKHZhciB0ZWFtIG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgaWYoc3ViR3JvdXAuY29udGFpbnNUZWFtV2l0aE5hbWUodGVhbS5uYW1lKSl7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCsrXG4gICAgfVxuXG4gICAgLy9nZXQgY29waWVzIG9mIHRoZSB0ZWFtc1xuICAgIHZhciB0ZWFtc1RvQWRkID0gZ2V0U3ViR3JvdXBGcm9tT3JpZ2luYWxHcm91cChncm91cCxzdWJHcm91cCk7XG5cbiAgICAvL3RoZSBmaXJzdCB0ZWFtIGlzIGluIHBvc2l0aW9uIGluZGV4IGluIHRoZSBvcmlnaW5hbCBncm91cFxuICAgIC8vc28gbm93IHN0YXJ0IHJlcGxhY2luZyBmcm9tIHRoZXJlOlxuICAgIGZvcih2YXIgdGVhbVRvQWRkIG9mIHRlYW1zVG9BZGQudGVhbXMpe1xuICAgICAgICBncm91cC50ZWFtcy5zcGxpY2UoaW5kZXgsIDEsIHRlYW1Ub0FkZCk7XG4gICAgICAgIGluZGV4KytcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0U3ViR3JvdXBGcm9tT3JpZ2luYWxHcm91cCAob3JpZ2luYWxHcm91cCAgOiBHcm91cCwgc3ViR3JvdXAgOiBHcm91cCApIDogIEdyb3Vwe1xuICAgIHZhciByZXR1cm5WYWwgOiBHcm91cCA9IG5ldyBHcm91cCgpO1xuICAgIHJldHVyblZhbC50ZWFtcyA9IFtdO1xuICAgIGZvciAodmFyIHN1Ykdyb3VwVGVhbSAgb2Ygc3ViR3JvdXAudGVhbXMpe1xuICAgICAgICB2YXIgdGVhbVRvQWRkID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWxHcm91cC5nZXRUZWFtKChzdWJHcm91cFRlYW0ubmFtZSkpKTtcbiAgICAgICAgLy92YXIgdGVhbVRvQWRkID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbEdyb3VwLmdldFRlYW0oc3ViR3JvdXBUZWFtLm5hbWUpKTtcbiAgICAgICAgcmV0dXJuVmFsLnRlYW1zLnB1c2godGVhbVRvQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbDtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9OZXh0Um91bmQodG91cm5hbWVudCA6IGFueSxncm91cEluZGV4OiBhbnkpIHtcbiAgICB2YXIgYWNodHN0ZUZpbmFsZSA9IHRvdXJuYW1lbnQucm91bmRzWzBdO1xuICAgICAgaWYgKGdyb3VwSW5kZXggPT0gMCkge1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbMF0uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMF0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzRdLm91dFRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMV0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzhdLmhvbWVUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzJdLm5hbWU7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1sxMl0ub3V0VGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1szXS5uYW1lO1xuICBcbiAgICAgIH0gZWxzZSBpZiAoZ3JvdXBJbmRleCA9PSAxKSB7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1sxXS5ob21lVGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1swXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbNV0ub3V0VGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1sxXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbOV0uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMl0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzEzXS5vdXRUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzNdLm5hbWU7XG4gIFxuICAgICAgfSBlbHNlIGlmIChncm91cEluZGV4ID09IDIpIHtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzJdLmhvbWVUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzBdLm5hbWU7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1s2XS5vdXRUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzFdLm5hbWU7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1sxMF0uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMl0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzE0XS5vdXRUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzNdLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKGdyb3VwSW5kZXggPT0gMykge1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbM10uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMF0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzddLm91dFRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMV0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzExXS5ob21lVGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1syXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbMTVdLm91dFRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbM10ubmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoZ3JvdXBJbmRleCA9PSA0KSB7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1swXS5vdXRUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzFdLm5hbWU7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1s0XS5ob21lVGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1swXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbOF0ub3V0VGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1szXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbMTJdLmhvbWVUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzJdLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKGdyb3VwSW5kZXggPT0gNSkge1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbMV0ub3V0VGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1sxXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbNV0uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMF0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzldLm91dFRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbM10ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzEzXS5ob21lVGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1syXS5uYW1lO1xuICAgICAgfSBlbHNlIGlmIChncm91cEluZGV4ID09IDYpIHtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzJdLm91dFRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMV0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzZdLmhvbWVUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzBdLm5hbWU7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1sxMF0ub3V0VGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1szXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbMTRdLmhvbWVUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzJdLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKGdyb3VwSW5kZXggPT0gNykge1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbM10ub3V0VGVhbU5hbWUgPSB0b3VybmFtZW50Lmdyb3Vwc1tncm91cEluZGV4XS50ZWFtc1sxXS5uYW1lO1xuICAgICAgICBhY2h0c3RlRmluYWxlLm1hdGNoZXNbN10uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMF0ubmFtZTtcbiAgICAgICAgYWNodHN0ZUZpbmFsZS5tYXRjaGVzWzExXS5vdXRUZWFtTmFtZSA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzNdLm5hbWU7XG4gICAgICAgIGFjaHRzdGVGaW5hbGUubWF0Y2hlc1sxNV0uaG9tZVRlYW1OYW1lID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMl0ubmFtZTtcbiAgICAgIH1cbiAgICBcbiAgfVxuICBcbi8vICAgZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NSb3VuZCh0b3VybmFtZW50OiBUb3VybmFtZW50LHJvdW5kSW5kZXg6IG51bWJlcikge1xuLy8gICAgICAgaWYocm91bmRJbmRleCA9PSB0b3VybmFtZW50LnJvdW5kcy5sZW5ndGgpe1xuLy8gICAgICAgICAgIHJldHVybjtcbi8vICAgICAgIH1cbi8vICAgICAgIGxldCBjb3JyZWN0aW9uID0gMDtcbi8vICAgICAgIGNvbnN0IHJvdW5kID0gdG91cm5hbWVudC5yb3VuZHNbcm91bmRJbmRleF07XG4gICAgICBcbi8vICAgICAgIGNvbnN0IG5leHRSb3VuZCA9IHRvdXJuYW1lbnQucm91bmRzW3JvdW5kSW5kZXgrMV07XG4gIFxuLy8gICAgICByb3VuZC5tYXRjaGVzLmZvckVhY2goKG1hdGNoOktub2Nrb3V0TWF0Y2gsIGluZGV4KSA9PiB7XG4vLyAgICAgICAgICAgbGV0IHdpbm5lcm51bWJlcjogbnVtYmVyO1xuLy8gICAgICAgICAgIGxldCBsb3Nlck51bWJlcjogbnVtYmVyO1xuLy8gICAgICAgICAgICBpZihpbmRleCUyID09IDAgKXtcbi8vICAgICAgICAgICAgICAgIGlmKGluZGV4ICE9IDApe1xuLy8gICAgICAgICAgICAgICAgICAgY29ycmVjdGlvbisrO1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgIGlmKGNvcnJlY3Rpb24gPT0gcm91bmQubnVtYmVyT2ZQbGFjZXMvNCl7XG4vLyAgICAgICAgICAgICAgICAgICBjb3JyZWN0aW9uID0gMDtcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZXZlblwiLCBpbmRleCAsIFwiY29ycmVjdGlvblwiLCBjb3JyZWN0aW9uKTtcbi8vICAgICAgICAgICAgICAgIHdpbm5lcm51bWJlciA9IG1hdGNoLm1hdGNoTnVtYmVyKzE2IC1jb3JyZWN0aW9uO1xuLy8gICAgICAgICAgICAgICAgbG9zZXJOdW1iZXIgPSBtYXRjaC5tYXRjaE51bWJlcisxNityb3VuZC5udW1iZXJPZlBsYWNlcy80IC0gY29ycmVjdGlvbjtcbi8vICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh3aW5uZXJudW1iZXIsIGxvc2VyTnVtYmVyKTtcbiAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm9kZFwiLCBpbmRleCwgXCJjb3JyZWN0aW9uXCIsIGNvcnJlY3Rpb24pO1xuLy8gICAgICAgICAgICAgICB3aW5uZXJudW1iZXIgPSBtYXRjaC5tYXRjaE51bWJlcisxNSAtY29ycmVjdGlvbjtcbi8vICAgICAgICAgICAgICAgbG9zZXJOdW1iZXIgPSBtYXRjaC5tYXRjaE51bWJlcisxNStyb3VuZC5udW1iZXJPZlBsYWNlcy80IC0gY29ycmVjdGlvbjtcbi8vICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh3aW5uZXJudW1iZXIsIGxvc2VyTnVtYmVyKTtcbi8vICAgICAgICAgICB9XG4gIFxuLy8gICAgICAgICAgIGNvbnN0IHdpbm5lck1hdGNoID0gbmV4dFJvdW5kLm1hdGNoZXMuZmluZCgobWF0Y2gpID0+IHtcbi8vICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoLm1hdGNoTnVtYmVyID09IHdpbm5lcm51bWJlcjtcbi8vICAgICAgICAgICB9KTtcbiAgXG4vLyAgICAgICAgICAgY29uc3QgbG9zZXJNYXRjaCA9IG5leHRSb3VuZC5tYXRjaGVzLmZpbmQoKG1hdGNoKSA9PiB7XG4vLyAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5tYXRjaE51bWJlciA9PSBsb3Nlck51bWJlcjtcbi8vICAgICAgICAgICB9KTtcbiAgXG4vLyAgICAgICAgICAgaWYoaW5kZXglMiA9PSAwKXtcbi8vICAgICAgICAgICAgICAgd2lubmVyTWF0Y2guaG9tZVRlYW1OYW1lID0gbWF0Y2guZ2V0V2lubmVyKCk7XG4vLyAgICAgICAgICAgICAgIGxvc2VyTWF0Y2guaG9tZVRlYW1OYW1lID0gbWF0Y2guZ2V0TG9zZXIoKTtcbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICB3aW5uZXJNYXRjaC5vdXRUZWFtTmFtZSA9IG1hdGNoLmdldFdpbm5lcigpO1xuLy8gICAgICAgICAgICAgICBsb3Nlck1hdGNoLm91dFRlYW1OYW1lID0gbWF0Y2guZ2V0TG9zZXIoKTtcbi8vICAgICAgICAgICB9XG4gICAgICAgICAgXG4gIFxuLy8gICAgICAgICB9KTtcbi8vICAgICAgIH1cblxuXG4vLyAqKiogRnJvbnRlbmQgSGVscGVyIG1ldGhvZHM6ICoqKiAvL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VCYXNlZE9uTmFtZShuZXdHcm91cCA6IEdyb3VwLCBncm91cHMgOkdyb3VwW10pIDogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gZmluZEluZGV4T2ZHcm91cEJhc2VkT25OYW1lKG5ld0dyb3VwLCBncm91cHMpO1xuICAgIGdyb3Vwc1tpbmRleF0gPSBuZXdHcm91cDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4T2ZHcm91cEJhc2VkT25OYW1lKGdyb3VwVG9GaW5kOkdyb3VwICwgZ3JvdXBzIDogR3JvdXBbXSkgOiBhbnkge1xuXG4gICAgZm9yKGxldCBpIGluIGdyb3Vwcyl7XG4gICAgICAgIGlmKGdyb3Vwc1tpXS5ncm91cG5hbWUgPT0gZ3JvdXBUb0ZpbmQuZ3JvdXBuYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gKioqIEVORCAqKiogLy9cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvdXRpbHMvVG91cm5hbWVudFV0aWxzLnRzIiwiaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi9UZWFtXCI7XG5pbXBvcnQge01hdGNofSBmcm9tIFwiLi9NYXRjaFwiO1xuaW1wb3J0IHtIT01FX1RFQU1fV0lOUywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgIGNsYXNzIEdyb3VwIHtcblxuICAgIGdyb3VwbmFtZSA6IHN0cmluZztcbiAgICB0ZWFtcyA6IFRlYW1bXTtcbiAgICBtYXRjaGVzIDogTWF0Y2hbXTtcbiAgICBhbGxNYXRjaGVzUGxheWVkIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBncm91cE5lZWRzRHJhdyA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgZXF1YWxUZWFtcyA6IFRlYW1bXVtdO1xuXG4gICAgY29uc3RydWN0b3IoZ3JvdXBuYW1lPzpzdHJpbmcsIHRlYW1zPzogVGVhbVtdKXtcbiAgICAgICAgdGhpcy5ncm91cG5hbWUgPWdyb3VwbmFtZTtcbiAgICAgICAgdGhpcy50ZWFtcyA9IHRlYW1zO1xuICAgICAgICBpZih0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE1hdGNoZXMoKSA6ICB2b2lke1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXS5uYW1lLCB0aGlzLnRlYW1zWzFdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMl0ubmFtZSwgdGhpcy50ZWFtc1szXS5uYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMF0ubmFtZSwgdGhpcy50ZWFtc1syXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzNdLm5hbWUsIHRoaXMudGVhbXNbMV0ubmFtZSkpO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzNdLm5hbWUsIHRoaXMudGVhbXNbMF0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1sxXS5uYW1lLCB0aGlzLnRlYW1zWzJdLm5hbWUpKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzTWF0Y2hlcygpIDogdm9pZHtcblxuICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICAgICB0ZWFtLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgaWYobWF0Y2gub3V0VGVhbVNjb3JlICE9IHVuZGVmaW5lZCAmJiBtYXRjaC5ob21lVGVhbVNjb3JlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgLy90aGlzIG1lYW5zIG1hdGNoIGlzIHBsYXllZCwgc28gbGV0IGRvIHdoYXQgd2UgbmVlZCB0byBkbzpcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hPdXRDb21lID0gbWF0Y2guZ2V0T3V0Q29tZSgpO1xuICAgICAgICAgICAgICAgIGxldCBob21lVGVhbSA9IHRoaXMuZ2V0VGVhbShtYXRjaC5ob21lVGVhbU5hbWUpO1xuICAgICAgICAgICAgICAgIGxldCBvdXRUZWFtID0gdGhpcy5nZXRUZWFtKG1hdGNoLm91dFRlYW1OYW1lKTtcbiAgICAgICAgICAgICAgICBpZihtYXRjaE91dENvbWUgPT0gSE9NRV9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoT3V0Q29tZSA9PSBPVVRfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG91dFRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIG91dFRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxNYXRjaGVzUGxheWVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9pZiBhbGwgcGxheWVkIG1hdGNoZXMgYXJlIGRvbmUsIHdlIHB1dCB0aGUgcG9pbnRzOlxuICAgICAgICB0aGlzLnRlYW1zLmZvckVhY2goKHRlYW0pPT57XG4gICAgICAgICAgICB0ZWFtLnBvaW50cyA9IHRlYW0ubWF0Y2hlc1dvbiozICsgdGVhbS5tYXRjaGVzRHJhd2VkO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgLy90aGlzIGdldCB0aGUgY29ycmVzcG9uZGluZyB0byB0aGUgdGVhbW5hbWUgcGFzc2VkIHRvIHRoZSBtZXRob2Q6XG4gICAgZ2V0VGVhbShuYW1lOnN0cmluZykgOiBUZWFte1xuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZWFtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcmludEdyb3VwU3RhbmRpbmcoKSB7XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGVhbS5uYW1lfSAgdzoke3RlYW0ubWF0Y2hlc1dvbn0gIGQ6JHt0ZWFtLm1hdGNoZXNEcmF3ZWR9IGw6JHt0ZWFtLm1hdGNoZXNMb3N0fSBzOiR7dGVhbS5nb2Fsc1Njb3JlZH0gYzoke3RlYW0uZ29hbHNDb25jaWV2ZWR9IFA6JHt0ZWFtLnBvaW50c31gKVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGwgcGxheWVkOiBcIiArIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCk7XG4gICAgfVxuXG4gICAgcHJpbnRHcm91cE1hdGNoZXMoKXtcbiAgICAgICAgdGhpcy5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHttYXRjaC5ob21lVGVhbU5hbWV9IC0gJHttYXRjaC5vdXRUZWFtTmFtZX0gOiAke21hdGNoLmhvbWVUZWFtU2NvcmV9IC0gJHttYXRjaC5vdXRUZWFtU2NvcmV9YCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0RXF1YWxUZWFtcygpIDogVGVhbVtdW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbFRlYW1zIDtcbiAgICB9XG5cbiAgICBnZXRBbGxNYXRjaGVzUGxheWVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsTWF0Y2hlc1BsYXllZDtcbiAgICB9XG5cblxuICAgIGFkZFRvRXF1YWxUZWFtcyh0ZWFtc1RvQWRkIDogVGVhbVtdKSA6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmdldEVxdWFsVGVhbXMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmlyc3QsIGp1c3QgYWRkIGl0OlxuICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBhZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpcyBvbmUgb2YgdGhlIDIgdGVhbXMgYWxyZWFkeSBpcyBpbiBvbiBvZiB0aGUgYXJyYXlzIHRoYXQgd2FzIGFscmVhZHkgYWRkZWQ6XG4gICAgICAgICAgICBmb3IodmFyIGFscmVhZHlBZGRlZFRlYW1zIG9mIHRoaXMuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBpdCBjb250YWlucyBvbmUgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhPZkV4aXN0aW5nVGVhbSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZCl7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXQgYWxyZWFkeSBpbiB0aGVyZSwganVzdCBhZGQgdGhlIG90aGVyIG9uZSBhcyB3ZWxsIGFuZCB3ZSBhcmUgZG9uZTpcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxyZWFkeUFkZGVkVGVhbXMubGFzdEluZGV4T2YodGVhbVRvQWRkKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRXhpc3RpbmdUZWFtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyAyLCB0aGlzIG1lYW5zIHdlIGRpZCBub3QgZmluZCB0aGUgdGVhbSBpbiBhbHJlYWR5QWRkZWRUZWFtc1xuICAgICAgICAgICAgICAgIGlmKGluZGV4T2ZFeGlzdGluZ1RlYW0gIT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXMgMCBvciAxLCB3ZSBmb3VuZCBpcywgc28gd2UgbmVlZCB0byBhZGQgdGhlIG90aGVyIHRlYW0uXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleE9mVGVhbVRvQWRkID0gaW5kZXhPZkV4aXN0aW5nVGVhbSA9PSAxID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXhPZlRlYW1Ub0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlBZGRlZFRlYW1zLnB1c2godGVhbXNUb0FkZFtpbmRleE9mVGVhbVRvQWRkXSk7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZGRlZCl7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFuIHRlYW1zIGFyZSBlcXVhbCAyIG9uIDJcbiAgICAgICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwdXJlbHkgZm9yIGhlbHBpbmcgbWV0aG9kOlxuICAgICAqL1xuICAgICBjb250YWluc1RlYW1XaXRoTmFtZShuYW1lOlN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgZm9yKHZhciB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogR3JvdXAge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ3JvdXAsIGlucHV0KTtcblxuICAgICAgICAgICAgbGV0IG5ld1RlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zLmZvckVhY2godGVhbSA9PiB7XG4gICAgICAgICAgICAgICAgIG5ld1RlYW1zLnB1c2goVGVhbS5kZXNlcmlhbGl6ZSh0ZWFtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zID0gbmV3VGVhbXM7XG5cbiAgICAgICAgICAgIGxldCBuZXdNYXRjaGVzOiBNYXRjaFtdID0gW107XG4gICAgICAgICAgICBncm91cC5tYXRjaGVzLmZvckVhY2gobWF0Y2ggID0+IHtcbiAgICAgICAgICAgICAgICBuZXdNYXRjaGVzLnB1c2goTWF0Y2guZGVzZXJpYWxpemUobWF0Y2gpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXAubWF0Y2hlcyA9IG5ld01hdGNoZXM7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwLnRzIiwiaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4vR3JvdXBcIjtcbmltcG9ydCB7S25vY2tPdXRSb3VuZH0gZnJvbSBcIi4vS25vY2tPdXRSb3VuZFwiO1xuXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudHtcblxuICAgIGdyb3VwcyA6IEdyb3VwW10gPSAgW107XG4gICAgcm91bmRzIDogIEtub2NrT3V0Um91bmRbXSA9IFtdO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50LnRzIiwiaW1wb3J0IHtLbm9ja291dE1hdGNofSBmcm9tIFwiLi9NYXRjaFwiO1xuXG5leHBvcnQgY2xhc3MgS25vY2tPdXRSb3VuZCB7XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbWF0Y2hlczogS25vY2tvdXRNYXRjaFtdO1xuICAgIG51bWJlck9mUGxhY2VzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG51bWJlck9mTWF0Y2hlcyA6IG51bWJlcil7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG51bWJlck9mTWF0Y2hlczsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBLbm9ja291dE1hdGNoKHVuZGVmaW5lZCwgdW5kZWZpbmVkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmQudHMiLCJpbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50OiBUb3VybmFtZW50KSA6dm9pZCB7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAxO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMDtcblxuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDp2b2lke1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDM7XG5cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDogdm9pZCB7XG4gICAgLy9zZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzBdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDQ7XG5cbiAgICBncm91cEEubWF0Y2hlc1sxXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEEubWF0Y2hlc1s0XS5vdXRUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQS5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG5cbiAgICBncm91cEIubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMTtcbiAgICBncm91cEIubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzJdLmhvbWVUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQi5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1szXS5ob21lVGVhbVNjb3JlID0gMztcbiAgICBncm91cEIubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMjtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAyO1xuICAgIGdyb3VwQi5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==