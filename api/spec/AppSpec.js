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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HOME_TEAM_WINS = 1;
exports.OUT_TEAM_WINS = 2;
exports.MATCH_IS_DRAW = 0;
exports.COOKIE_NAME = "j_uid";


/***/ }),
/* 1 */
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
        this.name = name;
    }
    reset() {
        this.goalsScored = 0;
        this.points = 0;
        this.matchesDrawed = 0;
        this.matchesWon = 0;
        this.matchesWon = 0;
        this.goalsConcieved = 0;
        this.matchesDrawed = 0;
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
        return team;
    }
}
exports.Team = Team;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TournamentUtils_1 = __webpack_require__(3);
const SpecHelpers_1 = __webpack_require__(7);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = __webpack_require__(1);
const Group_1 = __webpack_require__(4);
const Constants_1 = __webpack_require__(0);
const Tournament_1 = __webpack_require__(6);
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
        let group = new Group_1.Group("Group " + groupLetter[index], teams);
        tournament.groups.push(group);
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
function proccesMatches(group) {
    //group.getAllMatchesPlayed() = true;
    group.teams.forEach((team) => {
        team.reset();
    });
    group.matches.forEach((match) => {
        if (match.outTeamScore != undefined && match.homeTeamScore != undefined) {
            //this means match is played, so let do what we need to do:
            let matchOutCome = match.getOutCome();
            let homeTeam = group.getTeam(match.homeTeamName);
            let outTeam = group.getTeam(match.outTeamName);
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
            group.allMatchesPlayed = false;
        }
    });
    //if all played matches are done, we put the points:
    group.teams.forEach((team) => {
        team.points = team.matchesWon * 3 + team.matchesDrawed;
    });
}
exports.proccesMatches = proccesMatches;
function orderTeams(group, complete) {
    //reset some stuff:
    group.groupNeedsDraw = false;
    group.equalTeams = new Array();
    group.teams.sort((teama, teamb) => {
        var returnValue = compareTeams(teama, teamb);
        if (returnValue == 0) {
            // this means team a and team b are concidered equal:
            group.addToEqualTeams([teama, teamb]);
            //console.log(this.equalTeams);
        }
        return returnValue;
    });
    //check if there are equalteams, and do whats needed:
    if (group.equalTeams.length > 0) {
        if (group.equalTeams[0].length == 4) {
            //this means all 4 of them were equal, so there is nothing more to do:
            group.groupNeedsDraw = true;
        }
        else {
            //we need to make a subgroup and do the ordering again:
            for (var equalTeamsSubGroup of group.equalTeams) {
                if (complete == undefined || complete) {
                    console.log("Before ");
                    group.printGroupStanding();
                    group.printGroupMatches();
                }
                var subgroup = getSubGroup(equalTeamsSubGroup, group);
                subgroup.processMatches();
                //watch out here for infinite loops!!!
                if (complete == undefined || complete) {
                    orderTeams(subgroup, false);
                }
                //after this subgroups have been ordered, so now we order them in
                //subgroup.printGroupStanding();
                orderAccordingToSubGroups(group, subgroup);
                //group.printGroupStanding();
            }
        }
    }
    if (complete == undefined || complete) {
        console.log("Final print");
        group.printGroupStanding();
        group.printGroupMatches();
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
        var teamToAdd = Object.create(originalGroup.getTeam(subGroupTeam.name));
        returnVal.teams.push(teamToAdd);
    }
    return returnVal;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = __webpack_require__(1);
const Match_1 = __webpack_require__(5);
const Constants_1 = __webpack_require__(0);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(0);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Tournament {
    constructor() {
        this.groups = [];
    }
}
exports.Tournament = Tournament;


/***/ }),
/* 7 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDdlN2RmMmIyNTdkNGMwZTAwNDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVGVhbS50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2luZGV4LnNwZWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL01hdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEYSxzQkFBYyxHQUFhLENBQUMsQ0FBQztBQUM3QixxQkFBYSxHQUFhLENBQUMsQ0FBQztBQUM1QixxQkFBYSxHQUFZLENBQUMsQ0FBQztBQUUzQixtQkFBVyxHQUFZ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O1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FB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TSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUV2QyxDQUFDO0FBdEJELHNIQXNCQyIsImZpbGUiOiJBcHBTcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDdlN2RmMmIyNTdkNGMwZTAwNDUiLCJleHBvcnQgY29uc3QgSE9NRV9URUFNX1dJTlMgOiBudW1iZXIgPSAgMTtcbmV4cG9ydCBjb25zdCBPVVRfVEVBTV9XSU5TIDogbnVtYmVyID0gIDI7XG5leHBvcnQgY29uc3QgTUFUQ0hfSVNfRFJBVyA6IG51bWJlcj0gIDA7XG5cbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA6IHN0cmluZyA9IFwial91aWRcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL0NvbnN0YW50cy50cyIsImltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUZWFtIHtcblxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcG9pbnRzOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzV29uOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzTG9zdDogbnVtYmVyID0gMDtcbiAgICBtYXRjaGVzRHJhd2VkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzU2NvcmVkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzQ29uY2lldmVkOiBudW1iZXIgPSAwO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgIH1cblxuXG5cbiAgICByZXNldCgpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5nb2Fsc1Njb3JlZCA9IDA7XG4gICAgICAgIHRoaXMucG9pbnRzID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzRHJhd2VkID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5nb2Fsc0NvbmNpZXZlZCA9IDA7XG4gICAgICAgIHRoaXMubWF0Y2hlc0RyYXdlZCA9IDA7XG4gICAgfVxuXG4gICAgZ2V0R29hbHNEaWZmZXJlbmNlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2Fsc1Njb3JlZCAtIHRoaXMuZ29hbHNDb25jaWV2ZWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogVGVhbSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBpbnB1dC5uYW1lO1xuICAgICAgICBjb25zdCB0ZWFtID0gbmV3IFRlYW0obmFtZSk7XG4gICAgICAgIC8qT2JqZWN0LmFzc2lnbihUZWFtLCBpbnB1dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlYW0pOyovXG4gICAgICAgIHRlYW0ucG9pbnRzID0gIE51bWJlcihpbnB1dC5wb2ludHMpO1xuICAgICAgICB0ZWFtLm1hdGNoZXNXb24gPSBOdW1iZXIoaW5wdXQubWF0Y2hlc1dvbik7XG4gICAgICAgIHRlYW0ubWF0Y2hlc0xvc3QgPSBOdW1iZXIoaW5wdXQubWF0Y2hlc0xvc3QpO1xuICAgICAgICB0ZWFtLm1hdGNoZXNEcmF3ZWQgPSBOdW1iZXIoaW5wdXQubWF0Y2hlc0RyYXdlZCk7XG4gICAgICAgIHRlYW0uZ29hbHNTY29yZWQgPSBOdW1iZXIoaW5wdXQuZ29hbHNTY29yZWQpO1xuICAgICAgICB0ZWFtLmdvYWxzQ29uY2lldmVkID0gTnVtYmVyKGlucHV0LmdvYWxzQ29uY2lldmVkKTtcbiAgICAgICAgcmV0dXJuIHRlYW07XG5cbiAgICB9XG5cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVGVhbS50cyIsIlxuaW1wb3J0IHtnZXRNYXRjaGVzRnJvbVRlYW1zLCBnZXRUb3VybmFtZW50LCBvcmRlclRlYW1zfSBmcm9tIFwiLi4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHNcIjtcbmltcG9ydCB7XG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcywgc2V0R3JvdXBNYXRjaFNjb3JlMkZ1bGx5RXF1YWxUZWFtcywgc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXMsXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlMm9uMkVxdWFsVGVhbXNXaXRoRGlmZmVyZW5jZUJldHdlZW5cbn0gZnJvbSBcIi4vU3BlY0hlbHBlcnNcIjtcbmltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudFwiO1xuXG5cbmRlc2NyaWJlKFwidGhpcyB3aWxsIHRlc3QgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGdyb3VwIG1hdGNoZXM6XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIGl0KFwidG91cm5hbWVudCBzaG91bGQgY29udGFpbiBncm91cDEgQVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS5ncm91cG5hbWUpLnRvRXF1YWwoXCJHcm91cCBBXCIpO1xuICAgIH0pO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcblxuICAgIGxldCBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG5cbiAgICBsZXQgdGVhbUEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1swXTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAzIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLnBvaW50cykudG9FcXVhbCg0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBDIGhhcyAxIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzJdLnBvaW50cykudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBEIGhhcyAyIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzNdLnBvaW50cykudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyBzY29yZWQgMyBnb2Fsc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5nb2Fsc1Njb3JlZCkudG9CZSg2KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyBjb25jaWV2ZWQgNCBnb2Fsc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5nb2Fsc0NvbmNpZXZlZCkudG9CZSg0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAxIGRyYXdlZCBtYXRjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5tYXRjaGVzRHJhd2VkKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDEgd29uIG1hdGNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLm1hdGNoZXNXb24pLnRvQmUoMSk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUoXCJ0aGlzIHdpbGwgdGVzdCB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgZ3JvdXAgbWF0Y2hlczpcIiwgZnVuY3Rpb24oKSB7XG5cblxuICAgIHZhciAgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBBKTtcblxuICAgIGl0KFwiUnVzc2lhIGZpcnN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzBdLm5hbWUpLnRvRXF1YWwoXCJSdXNzaWFcIik7XG4gICAgfSk7XG5cblxuICAgIGl0KFwiRWd5cHQgc2Vjb25kIFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMV0ubmFtZSkudG9FcXVhbChcIkVneXB0XCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJVcnVndWF5IGxhc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzJdLm5hbWUpLnRvRXF1YWwoXCJVcnVndWF5XCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJTYXVkaSBBcmFiaWEgdGhpcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzNdLm5hbWUpLnRvRXF1YWwoXCJTYXVkaSBBcmFiaWFcIik7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJncm91cCBBOiBcIiArIGdyb3VwQSk7XG4gICAgdmFyIGVxdWFsVGVhbXMgPSBncm91cEEuZ2V0RXF1YWxUZWFtcygpO1xuXG4gICAgaXQoXCJFZ3lwdCBhbiBVcnVndWF5IGFyZSBjb25jaWRlcmVkIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgZXhwZWN0KGVxdWFsVGVhbXNbMF0ubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgIGxldCBmaXJzdCA9IGVxdWFsVGVhbXNbMF1bMF0ubmFtZSA9PSBcIkVneXB0XCIgfHwgIGVxdWFsVGVhbXNbMF1bMF0ubmFtZSA9PSBcIlVydWd1YXlcIjtcbiAgICAgICBsZXQgc2Vjb25kID0gZXF1YWxUZWFtc1swXVsxXS5uYW1lID09IFwiRWd5cHRcIiB8fCAgZXF1YWxUZWFtc1swXVsxXS5uYW1lID09IFwiVXJ1Z3VheVwiO1xuICAgICAgIGV4cGVjdChmaXJzdCkudG9CZVRydXRoeSgpO1xuICAgICAgIGV4cGVjdChzZWNvbmQpLnRvQmVUcnV0aHkoKTtcblxuICAgIH0pO1xuXG59KTtcblxuZGVzY3JpYmUoXCJ3ZSB3YW50IHRvIGJlIGFibGUgdG8gc2VsZWN0IGEgc3Vic2V0IG9mIG1hdGNoZXNcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICB2YXIgc3ViTWF0Y2hlcyA9ICBnZXRNYXRjaGVzRnJvbVRlYW1zKFtncm91cEEudGVhbXNbMV0sZ3JvdXBBLnRlYW1zWzJdLGdyb3VwQS50ZWFtc1szXV0sZ3JvdXBBLm1hdGNoZXMpXG5cbiAgICBpdChcIndlIGV4cGVjdCAzIG1hdGNoZXMgdG8gYmUgc2VsZWN0ZWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KHN1Yk1hdGNoZXMubGVuZ3RoKS50b0JlKDMpO1xuICAgIH0pO1xuXG59KTtcblxuXG5kZXNjcmliZShcIklmIDMgVGVhbXMgYXJlIGVxdWFsIHdlIG5lZWQgbWFrZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEEpO1xuXG5cbiAgICBpdChcIndlIGV4cGVjdCAzIHRlYW1zIHRvIGJlIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgIGV4cGVjdChncm91cEEuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgZXhwZWN0KGdyb3VwQS5nZXRFcXVhbFRlYW1zKClbMF0ubGVuZ3RoKS50b0JlKDMpO1xuXG4gICAgfSk7XG5cblxuICAgIGl0KFwiUnVzc2lhIHNob3VsZCBiZSBmaXJzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMF0ubmFtZSkudG9CZShcIlJ1c3NpYVwiKVxuICAgIH0pO1xuXG4gICAgaXQoXCJTYXVkaSBBcmFiaWEgc2hvdWxkIGJlIHNlY29uZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMV0ubmFtZSkudG9CZShcIlNhdWRpIEFyYWJpYVwiKVxuICAgIH0pXG4gICAgaXQoXCJVcnVndWF5IHNob3VsZCBiZSB0aGlyZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMl0ubmFtZSkudG9CZShcIlVydWd1YXlcIilcbiAgICB9KVxuICAgIGl0KFwiRWd5cHQgc2hvdWxkIGJlIGxhc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzNdLm5hbWUpLnRvQmUoXCJFZ3lwdFwiKVxuICAgIH0pXG5cblxuXG59KTtcblxuZGVzY3JpYmUoXCJJZiAyIG9uIDIgVGVhbXMgYXJlIGVxdWFsIHdlIG5lZWQgbWFrZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlMm9uMkVxdWFsVGVhbXNXaXRoRGlmZmVyZW5jZUJldHdlZW4odG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG4gICAgZ3JvdXBCLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEIsIHRydWUpO1xuXG5cbiAgICBpdChcIndlIGV4cGVjdCAyIHRlYW1zIHRvIGJlIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKClbMF0ubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKVsxXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgfSk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3QvaW5kZXguc3BlYy50cyIsImltcG9ydCB7UHJvbm9zdGlla30gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1Byb25vc3RpZWtcIjtcbmltcG9ydCB7VGVhbX0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1RlYW1cIjtcbmltcG9ydCB7R3JvdXB9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Hcm91cFwiO1xuaW1wb3J0IHtNYXRjaH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vbW9kZWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91cm5hbWVudCgpIDogVG91cm5hbWVudCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIioqKioqIFByb25vc3RpZWsgZ2VuZXJhdGlvbiBTdGFydGluZyAqKioqXCIpO1xuXG4gICAgbGV0IHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gbmV3IFRvdXJuYW1lbnQoKTtcblxuICAgIGxldCBhbGxUZWFtcyA9ICBbXG4gICAgICAgIFtcIlJ1c3NpYVwiLCBcIlNhdWRpIEFyYWJpYVwiLCBcIkVneXB0XCIsIFwiVXJ1Z3VheVwiXSxcbiAgICAgICAgW1wiUG9ydHVnYWxcIiwgXCJTcGFpblwiLCBcIk1vcm9jY29cIiwgXCJJcmFuXCJdLFxuICAgICAgICBbXCJGcmFuY2VcIiwgXCJBdXN0cmFsaWFcIiwgXCJQZXJ1XCIsIFwiRGVubWFya1wiXSxcbiAgICAgICAgW1wiQXJnZW50aW5hXCIsIFwiSWNlbGFuZFwiLCBcIkNyb2F0aWFcIiwgXCJOaWdlcmlhXCJdLFxuICAgICAgICBbXCJCcmF6aWxcIiwgXCJTd2l0emVybGFuZFwiLCBcIkNvc3RhIFJpY2FcIiwgXCJTZXJiaWFcIl0sXG4gICAgICAgIFtcIkdlcm1hbnlcIiwgXCJNZXhpY29cIiwgXCJTd2VkZW5cIiwgXCJLb3JlYSBSZXB1YmxpY1wiXSxcbiAgICAgICAgW1wiQmVsZ2l1bVwiLCBcIlBhbmFtYVwiLCBcIlR1bmlzaWFcIiwgXCJFbmdsYW5kXCJdLFxuICAgICAgICBbXCJQb2xhbmRcIiwgXCJTZW5lZ2FsXCIsIFwiQ29sb21iaWFcIiwgXCJKYXBhblwiXSxcbiAgICBdO1xuXG4gICAgbGV0IGdyb3VwTGV0dGVyID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIl07XG5cbiAgICBhbGxUZWFtcy5mb3JFYWNoKCAoZ3JvdXBUZWFtc05hbWVzLGluZGV4KSA9PiB7XG4gICAgICAgIGxldCB0ZWFtczogVGVhbVtdID0gW107XG4gICAgICAgIGdyb3VwVGVhbXNOYW1lcy5mb3JFYWNoKHRlYW1OYW1lID0+IHtcbiAgICAgICAgICAgIHRlYW1zLnB1c2gobmV3IFRlYW0odGVhbU5hbWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBncm91cCA9IG5ldyBHcm91cCAoXCJHcm91cCBcIiArIGdyb3VwTGV0dGVyW2luZGV4XSwgdGVhbXMpO1xuICAgICAgICB0b3VybmFtZW50Lmdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG91cm5hbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVUZWFtcyh0ZWFtYTogVGVhbSwgdGVhbWIgOiBUZWFtKSA6IG51bWJlciB7XG5cbiAgICBpZih0ZWFtYS5wb2ludHMgIT0gdGVhbWIucG9pbnRzKXtcbiAgICAgICAgLy9jb21wYXJlIG9uIHBvaW50czpcbiAgICAgICAgcmV0dXJuIHRlYW1iLnBvaW50cyAtIHRlYW1hLnBvaW50cztcbiAgICB9IGVsc2UgaWYodGVhbWEuZ2V0R29hbHNEaWZmZXJlbmNlKCkgIT0gdGVhbWIuZ2V0R29hbHNEaWZmZXJlbmNlKCkpe1xuICAgICAgICAvL2NvbXBhcmUgb24gZ29hbCBkaWZmOlxuICAgICAgICByZXR1cm4gdGVhbWIuZ2V0R29hbHNEaWZmZXJlbmNlKCkgLXRlYW1hLmdldEdvYWxzRGlmZmVyZW5jZSgpO1xuICAgIH0gZWxzZSBpZih0ZWFtYS5nb2Fsc1Njb3JlZCAhPSB0ZWFtYi5nb2Fsc1Njb3JlZCl7XG4gICAgICAgIC8vIG9uIGdvYWxzIHNjb3JlZDpcbiAgICAgICAgcmV0dXJuIHRlYW1iLmdvYWxzU2NvcmVkIC0gdGVhbWEuZ29hbHNTY29yZWQ7XG4gICAgfVxuICAgIHJldHVybiAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGVzRnJvbVRlYW1zKHRlYW1zIDogVGVhbVtdLCBhbGxNYXRjaGVzIDogTWF0Y2hbXSkgOiBNYXRjaFtdIHtcbiAgICB2YXIgdGVhbU5hbWVzICA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgdGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgIHRlYW1OYW1lcy5wdXNoKHRlYW0ubmFtZSk7XG4gICAgfSk7XG5cbiAgICB2YXIgcmV0dXJuVmFsIDogTWF0Y2ggW10gPSBuZXcgQXJyYXk8TWF0Y2g+KCk7XG4gICAgYWxsTWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgIGlmKHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLmhvbWVUZWFtTmFtZSkgIT0gLTEgJiYgdGVhbU5hbWVzLmluZGV4T2YobWF0Y2gub3V0VGVhbU5hbWUpICE9IC0xKXtcbiAgICAgICAgICAgICByZXR1cm5WYWwucHVzaChPYmplY3QuY3JlYXRlKG1hdGNoKSk7XG4gICAgICAgfVxuXG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVyblZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1Ykdyb3VwKHRlYW1zIDogVGVhbVtdLCBvcmlnaW5hbEdyb3VwIDogR3JvdXApIDogIEdyb3VwIHtcbiAgICAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgIGdyb3VwLnRlYW1zID0gW11cbiAgICBmb3IodmFyIHQgb2YgdGVhbXMpIHtcbiAgICAgICAgIGdyb3VwLnRlYW1zLnB1c2goT2JqZWN0LmNyZWF0ZSh0KSk7XG4gICAgfVxuICAgIC8vIGdyb3VwLnRlYW1zID0gdGVhbXMuc2xpY2UoKTtcbiAgICAgZ3JvdXAubWF0Y2hlcyA9IGdldE1hdGNoZXNGcm9tVGVhbXModGVhbXMsb3JpZ2luYWxHcm91cC5tYXRjaGVzICk7XG4gICAgIGZvcih2YXIgdCBvZiBncm91cC50ZWFtcyl7XG4gICAgICAgICB0LnJlc2V0KCk7XG4gICAgIH1cbiAgICAgcmV0dXJuIGdyb3VwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Nlc01hdGNoZXMoZ3JvdXA6IEdyb3VwKSA6dm9pZCB7XG5cbiAgICAvL2dyb3VwLmdldEFsbE1hdGNoZXNQbGF5ZWQoKSA9IHRydWU7XG5cbiAgICBncm91cC50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgIHRlYW0ucmVzZXQoKTtcbiAgICB9KTtcblxuICAgIGdyb3VwLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgaWYobWF0Y2gub3V0VGVhbVNjb3JlICE9IHVuZGVmaW5lZCAmJiBtYXRjaC5ob21lVGVhbVNjb3JlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAvL3RoaXMgbWVhbnMgbWF0Y2ggaXMgcGxheWVkLCBzbyBsZXQgZG8gd2hhdCB3ZSBuZWVkIHRvIGRvOlxuICAgICAgICAgICAgbGV0IG1hdGNoT3V0Q29tZSA9IG1hdGNoLmdldE91dENvbWUoKTtcbiAgICAgICAgICAgIGxldCBob21lVGVhbSA9IGdyb3VwLmdldFRlYW0obWF0Y2guaG9tZVRlYW1OYW1lKTtcbiAgICAgICAgICAgIGxldCBvdXRUZWFtID0gZ3JvdXAuZ2V0VGVhbShtYXRjaC5vdXRUZWFtTmFtZSk7XG4gICAgICAgICAgICBpZihtYXRjaE91dENvbWUgPT0gSE9NRV9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hPdXRDb21lID09IE9VVF9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDM7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbiAgICAgICAgICAgIG91dFRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbiAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICBob21lVGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cC5hbGxNYXRjaGVzUGxheWVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy9pZiBhbGwgcGxheWVkIG1hdGNoZXMgYXJlIGRvbmUsIHdlIHB1dCB0aGUgcG9pbnRzOlxuICAgIGdyb3VwLnRlYW1zLmZvckVhY2goKHRlYW0pPT57XG4gICAgICAgIHRlYW0ucG9pbnRzID0gdGVhbS5tYXRjaGVzV29uKjMgKyB0ZWFtLm1hdGNoZXNEcmF3ZWQ7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlclRlYW1zKGdyb3VwIDogR3JvdXAsIGNvbXBsZXRlPyA6IGJvb2xlYW4pIDogdm9pZCB7XG4gICAgLy9yZXNldCBzb21lIHN0dWZmOlxuICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gZmFsc2U7XG4gICAgZ3JvdXAuZXF1YWxUZWFtcyA9IG5ldyBBcnJheTxUZWFtW10+KCk7XG4gICAgZ3JvdXAudGVhbXMuc29ydCggKHRlYW1hLCB0ZWFtYikgPT4ge1xuICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSAgY29tcGFyZVRlYW1zKHRlYW1hLCB0ZWFtYik7XG4gICAgICAgIGlmKHJldHVyblZhbHVlID09IDApe1xuICAgICAgICAgICAgLy8gdGhpcyBtZWFucyB0ZWFtIGEgYW5kIHRlYW0gYiBhcmUgY29uY2lkZXJlZCBlcXVhbDpcbiAgICAgICAgICAgIGdyb3VwLmFkZFRvRXF1YWxUZWFtcyhbdGVhbWEsIHRlYW1iXSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXF1YWxUZWFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH0pO1xuXG4gICAgLy9jaGVjayBpZiB0aGVyZSBhcmUgZXF1YWx0ZWFtcywgYW5kIGRvIHdoYXRzIG5lZWRlZDpcbiAgICBpZihncm91cC5lcXVhbFRlYW1zLmxlbmd0aCA+IDApe1xuICAgICAgICBpZihncm91cC5lcXVhbFRlYW1zWzBdLmxlbmd0aCA9PSA0KXtcbiAgICAgICAgICAgIC8vdGhpcyBtZWFucyBhbGwgNCBvZiB0aGVtIHdlcmUgZXF1YWwsIHNvIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbzpcbiAgICAgICAgICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vd2UgbmVlZCB0byBtYWtlIGEgc3ViZ3JvdXAgYW5kIGRvIHRoZSBvcmRlcmluZyBhZ2FpbjpcbiAgICAgICAgICAgIGZvciAoIHZhciBlcXVhbFRlYW1zU3ViR3JvdXAgb2YgZ3JvdXAuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgaWYoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWZvcmUgXCIpO1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHJpbnRHcm91cE1hdGNoZXMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHZhciBzdWJncm91cCA9IGdldFN1Ykdyb3VwKGVxdWFsVGVhbXNTdWJHcm91cCwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIHN1Ymdyb3VwLnByb2Nlc3NNYXRjaGVzKCk7XG5cbiAgICAgICAgICAgICAgICAvL3dhdGNoIG91dCBoZXJlIGZvciBpbmZpbml0ZSBsb29wcyEhIVxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJUZWFtcyhzdWJncm91cCxmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vYWZ0ZXIgdGhpcyBzdWJncm91cHMgaGF2ZSBiZWVuIG9yZGVyZWQsIHNvIG5vdyB3ZSBvcmRlciB0aGVtIGluXG4gICAgICAgICAgICAgICAgLy9zdWJncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgICAgICBvcmRlckFjY29yZGluZ1RvU3ViR3JvdXBzKGdyb3VwLCBzdWJncm91cCk7XG4gICAgICAgICAgICAgICAgLy9ncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmluYWwgcHJpbnRcIik7XG4gICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9yZGVyQWNjb3JkaW5nVG9TdWJHcm91cHMoZ3JvdXA6IEdyb3VwLCBzdWJHcm91cCA6IEdyb3VwKXtcblxuXG4gICAgLy9maW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgdGVhbTpcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvcih2YXIgdGVhbSBvZiBncm91cC50ZWFtcyl7XG4gICAgICAgIGlmKHN1Ykdyb3VwLmNvbnRhaW5zVGVhbVdpdGhOYW1lKHRlYW0ubmFtZSkpe1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgrK1xuICAgIH1cblxuICAgIC8vZ2V0IGNvcGllcyBvZiB0aGUgdGVhbXNcbiAgICB2YXIgdGVhbXNUb0FkZCA9IGdldFN1Ykdyb3VwRnJvbU9yaWdpbmFsR3JvdXAoZ3JvdXAsc3ViR3JvdXApO1xuXG4gICAgLy90aGUgZmlyc3QgdGVhbSBpcyBpbiBwb3NpdGlvbiBpbmRleCBpbiB0aGUgb3JpZ2luYWwgZ3JvdXBcbiAgICAvL3NvIG5vdyBzdGFydCByZXBsYWNpbmcgZnJvbSB0aGVyZTpcbiAgICBmb3IodmFyIHRlYW1Ub0FkZCBvZiB0ZWFtc1RvQWRkLnRlYW1zKXtcbiAgICAgICAgZ3JvdXAudGVhbXMuc3BsaWNlKGluZGV4LCAxLCB0ZWFtVG9BZGQpO1xuICAgICAgICBpbmRleCsrXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFN1Ykdyb3VwRnJvbU9yaWdpbmFsR3JvdXAgKG9yaWdpbmFsR3JvdXAgIDogR3JvdXAsIHN1Ykdyb3VwIDogR3JvdXAgKSA6ICBHcm91cHtcbiAgICB2YXIgcmV0dXJuVmFsIDogR3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICByZXR1cm5WYWwudGVhbXMgPSBbXVxuICAgIGZvciAodmFyIHN1Ykdyb3VwVGVhbSAgb2Ygc3ViR3JvdXAudGVhbXMpe1xuICAgICAgICB2YXIgdGVhbVRvQWRkID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbEdyb3VwLmdldFRlYW0oc3ViR3JvdXBUZWFtLm5hbWUpKTtcbiAgICAgICAgcmV0dXJuVmFsLnRlYW1zLnB1c2godGVhbVRvQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbDtcblxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsImltcG9ydCB7VGVhbX0gZnJvbSBcIi4vVGVhbVwiO1xuaW1wb3J0IHtNYXRjaH0gZnJvbSBcIi4vTWF0Y2hcIjtcbmltcG9ydCB7SE9NRV9URUFNX1dJTlMsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0ICBjbGFzcyBHcm91cCB7XG5cbiAgICBncm91cG5hbWUgOiBzdHJpbmc7XG4gICAgdGVhbXMgOiBUZWFtW107XG4gICAgbWF0Y2hlcyA6IE1hdGNoW107XG4gICAgYWxsTWF0Y2hlc1BsYXllZCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgZ3JvdXBOZWVkc0RyYXcgOiBib29sZWFuID0gZmFsc2U7XG4gICAgIGVxdWFsVGVhbXMgOiBUZWFtW11bXTtcblxuICAgIGNvbnN0cnVjdG9yKGdyb3VwbmFtZT86c3RyaW5nLCB0ZWFtcz86IFRlYW1bXSl7XG4gICAgICAgIHRoaXMuZ3JvdXBuYW1lID1ncm91cG5hbWU7XG4gICAgICAgIHRoaXMudGVhbXMgPSB0ZWFtcztcbiAgICAgICAgaWYodGhpcy50ZWFtcyl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRNYXRjaGVzKCkgOiAgdm9pZHtcblxuICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMF0ubmFtZSwgdGhpcy50ZWFtc1sxXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzJdLm5hbWUsIHRoaXMudGVhbXNbM10ubmFtZSkpO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLm5hbWUsIHRoaXMudGVhbXNbMl0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1szXS5uYW1lLCB0aGlzLnRlYW1zWzFdLm5hbWUpKTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1szXS5uYW1lLCB0aGlzLnRlYW1zWzBdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMV0ubmFtZSwgdGhpcy50ZWFtc1syXS5uYW1lKSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc01hdGNoZXMoKSA6IHZvaWR7XG5cbiAgICAgICAgdGhpcy5hbGxNYXRjaGVzUGxheWVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICAgICAgdGVhbS5yZXNldCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGlmKG1hdGNoLm91dFRlYW1TY29yZSAhPSB1bmRlZmluZWQgJiYgbWF0Y2guaG9tZVRlYW1TY29yZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIC8vdGhpcyBtZWFucyBtYXRjaCBpcyBwbGF5ZWQsIHNvIGxldCBkbyB3aGF0IHdlIG5lZWQgdG8gZG86XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoT3V0Q29tZSA9IG1hdGNoLmdldE91dENvbWUoKTtcbiAgICAgICAgICAgICAgICBsZXQgaG9tZVRlYW0gPSB0aGlzLmdldFRlYW0obWF0Y2guaG9tZVRlYW1OYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgb3V0VGVhbSA9IHRoaXMuZ2V0VGVhbShtYXRjaC5vdXRUZWFtTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYobWF0Y2hPdXRDb21lID09IEhPTUVfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihtYXRjaE91dENvbWUgPT0gT1VUX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vaWYgYWxsIHBsYXllZCBtYXRjaGVzIGFyZSBkb25lLCB3ZSBwdXQgdGhlIHBvaW50czpcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKT0+e1xuICAgICAgICAgICAgdGVhbS5wb2ludHMgPSB0ZWFtLm1hdGNoZXNXb24qMyArIHRlYW0ubWF0Y2hlc0RyYXdlZDtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIC8vdGhpcyBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHRlYW1uYW1lIHBhc3NlZCB0byB0aGUgbWV0aG9kOlxuICAgIGdldFRlYW0obmFtZTpzdHJpbmcpIDogVGVhbXtcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIGlmKHRlYW0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpbnRHcm91cFN0YW5kaW5nKCkge1xuICAgICAgICB0aGlzLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RlYW0ubmFtZX0gIHc6JHt0ZWFtLm1hdGNoZXNXb259ICBkOiR7dGVhbS5tYXRjaGVzRHJhd2VkfSBsOiR7dGVhbS5tYXRjaGVzTG9zdH0gczoke3RlYW0uZ29hbHNTY29yZWR9IGM6JHt0ZWFtLmdvYWxzQ29uY2lldmVkfSBQOiR7dGVhbS5wb2ludHN9YClcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxsIHBsYXllZDogXCIgKyB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQpO1xuICAgIH1cblxuICAgIHByaW50R3JvdXBNYXRjaGVzKCl7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bWF0Y2guaG9tZVRlYW1OYW1lfSAtICR7bWF0Y2gub3V0VGVhbU5hbWV9IDogJHttYXRjaC5ob21lVGVhbVNjb3JlfSAtICR7bWF0Y2gub3V0VGVhbVNjb3JlfWApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEVxdWFsVGVhbXMoKSA6IFRlYW1bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxUZWFtcyA7XG4gICAgfVxuXG4gICAgZ2V0QWxsTWF0Y2hlc1BsYXllZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQ7XG4gICAgfVxuXG4gICAgIGFkZFRvRXF1YWxUZWFtcyh0ZWFtc1RvQWRkIDogVGVhbVtdKSA6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmdldEVxdWFsVGVhbXMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmlyc3QsIGp1c3QgYWRkIGl0OlxuICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBhZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpcyBvbmUgb2YgdGhlIDIgdGVhbXMgYWxyZWFkeSBpcyBpbiBvbiBvZiB0aGUgYXJyYXlzIHRoYXQgd2FzIGFscmVhZHkgYWRkZWQ6XG4gICAgICAgICAgICBmb3IodmFyIGFscmVhZHlBZGRlZFRlYW1zIG9mIHRoaXMuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBpdCBjb250YWlucyBvbmUgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhPZkV4aXN0aW5nVGVhbSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZCl7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXQgYWxyZWFkeSBpbiB0aGVyZSwganVzdCBhZGQgdGhlIG90aGVyIG9uZSBhcyB3ZWxsIGFuZCB3ZSBhcmUgZG9uZTpcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxyZWFkeUFkZGVkVGVhbXMubGFzdEluZGV4T2YodGVhbVRvQWRkKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRXhpc3RpbmdUZWFtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyAyLCB0aGlzIG1lYW5zIHdlIGRpZCBub3QgZmluZCB0aGUgdGVhbSBpbiBhbHJlYWR5QWRkZWRUZWFtc1xuICAgICAgICAgICAgICAgIGlmKGluZGV4T2ZFeGlzdGluZ1RlYW0gIT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXMgMCBvciAxLCB3ZSBmb3VuZCBpcywgc28gd2UgbmVlZCB0byBhZGQgdGhlIG90aGVyIHRlYW0uXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleE9mVGVhbVRvQWRkID0gaW5kZXhPZkV4aXN0aW5nVGVhbSA9PSAxID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXhPZlRlYW1Ub0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlBZGRlZFRlYW1zLnB1c2godGVhbXNUb0FkZFtpbmRleE9mVGVhbVRvQWRkXSk7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZGRlZCl7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFuIHRlYW1zIGFyZSBlcXVhbCAyIG9uIDJcbiAgICAgICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwdXJlbHkgZm9yIGhlbHBpbmcgbWV0aG9kOlxuICAgICAqL1xuICAgICBjb250YWluc1RlYW1XaXRoTmFtZShuYW1lOlN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgZm9yKHZhciB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogR3JvdXAge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ3JvdXAsIGlucHV0KTtcblxuICAgICAgICAgICAgbGV0IG5ld1RlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zLmZvckVhY2godGVhbSA9PiB7XG4gICAgICAgICAgICAgICAgIG5ld1RlYW1zLnB1c2goVGVhbS5kZXNlcmlhbGl6ZSh0ZWFtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zID0gbmV3VGVhbXM7XG5cbiAgICAgICAgICAgIGxldCBuZXdNYXRjaGVzOiBNYXRjaFtdID0gW107XG4gICAgICAgICAgICBncm91cC5tYXRjaGVzLmZvckVhY2gobWF0Y2ggID0+IHtcbiAgICAgICAgICAgICAgICBuZXdNYXRjaGVzLnB1c2goTWF0Y2guZGVzZXJpYWxpemUobWF0Y2gpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXAubWF0Y2hlcyA9IG5ld01hdGNoZXM7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG5cbiAgICB9XG59XG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsImltcG9ydCB7VGVhbX0gZnJvbSBcIi4vVGVhbVwiO1xuaW1wb3J0IHsgSE9NRV9URUFNX1dJTlMsIE1BVENIX0lTX0RSQVcsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIE1hdGNoe1xuICAgIGhvbWVUZWFtTmFtZSA6IHN0cmluZztcbiAgICBvdXRUZWFtTmFtZTogc3RyaW5nO1xuICAgIGhvbWVUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKGhvbWVUZWFtTmFtZTogc3RyaW5nLCBvdXRUZWFtTmFtZSA6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuaG9tZVRlYW1OYW1lID0gaG9tZVRlYW1OYW1lO1xuICAgICAgICB0aGlzLm91dFRlYW1OYW1lID0gb3V0VGVhbU5hbWU7XG4gICAgfVxuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcbiAgICAgICAgaWYodGhpcy5ob21lVGVhbVNjb3JlID4gdGhpcy5vdXRUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vdXRUZWFtU2NvcmUgPiB0aGlzLmhvbWVUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIE9VVF9URUFNX1dJTlM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1BVENIX0lTX0RSQVc7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogTWF0Y2gge1xuICAgICAgICBjb25zdCBtID0gbmV3IE1hdGNoKGlucHV0LmhvbWVUZWFtTmFtZSwgaW5wdXQub3V0VGVhbU5hbWUpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG0sIGlucHV0KTtcbiAgICAgICAgcmV0dXJuIG07XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgY2xhc3MgS25vY2tvdXRNYXRjaCBleHRlbmRzIE1hdGNoIHtcbiAgICBob21lVGVhbVBlbmFsdHlTY29yZSA6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtUGVuYWx0eVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBsZXQgb3V0Q29tZSA9ICBzdXBlci5nZXRPdXRDb21lKCk7XG4gICAgICAgIGlmKG91dENvbWUgPT0gTUFUQ0hfSVNfRFJBVyl7XG4gICAgICAgICAgICAvL1RoaXMgbWVhbnMgbWF0Y2ggd2FzIHdpdGggcGVuYWxzIC4uLlxuICAgICAgICAgICAgaWYodGhpcy5ob21lVGVhbVBlbmFsdHlTY29yZSA+IHRoaXMub3V0VGVhbVBlbmFsdHlTY29yZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBPVVRfVEVBTV9XSU5TXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dENvbWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9NYXRjaC50cyIsImltcG9ydCB7S25vY2tvdXRNYXRjaH0gZnJvbSBcIi4vTWF0Y2hcIjtcbmltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50e1xuICAgIGdyb3VwcyA6IEdyb3VwW10gPSAgW107XG4gICAga25vY2tPdXRSb3VuZHMgOiAgW0tub2Nrb3V0TWF0Y2hbXV07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50LnRzIiwiaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudDogVG91cm5hbWVudCkgOnZvaWQge1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDA7XG5cblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6dm9pZHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG5cbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gNDtcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50IDogVG91cm5hbWVudCkgOiB2b2lkIHtcbiAgICAvL3NldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gNDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQi5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gNDtcbiAgICBncm91cEIubWF0Y2hlc1syXS5vdXRUZWFtU2NvcmUgPSAwO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbM10ub3V0VGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQi5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDI7XG5cbiAgICBncm91cEIubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbiAgICBncm91cEIubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAwO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJzb3VyY2VSb290IjoiIn0=