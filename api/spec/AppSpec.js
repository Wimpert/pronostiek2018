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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TournamentUtils_1 = __webpack_require__(2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Tournament_1 = __webpack_require__(3);
const Team_1 = __webpack_require__(4);
const Group_1 = __webpack_require__(5);
const Constants_1 = __webpack_require__(0);
function getTournament() {
    console.log("***** Tournament generation Starting ****");
    let tournament = new Tournament_1.Tournament();
    let a = ["Russia", "Saudi Arabia", "Egypt", "Uruguay"];
    let teamsA = [];
    a.forEach((name) => {
        teamsA.push(new Team_1.Team(name));
    });
    let groupA = new Group_1.Group("Group A", teamsA);
    tournament.groups.push(groupA);
    let b = ["Portugal", "Spain", "Morocco", "Iran"];
    let teamsb = [];
    b.forEach((name) => {
        teamsb.push(new Team_1.Team(name));
    });
    let groupb = new Group_1.Group("Group B", teamsb);
    tournament.groups.push(groupb);
    console.log("***** Tournament generation Complete ****");
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
        if (teamNames.indexOf(match.homeTeam.name) != -1 && teamNames.indexOf(match.outTeam.name) != -1) {
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
            let homeTeam = group.getTeam(match.homeTeam.name);
            let outTeam = group.getTeam(match.outTeam.name);
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
/* 3 */
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
/* 4 */
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
}
exports.Team = Team;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Match_1 = __webpack_require__(6);
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
        this.matches.push(new Match_1.Match(this.teams[0], this.teams[1]));
        this.matches.push(new Match_1.Match(this.teams[2], this.teams[3]));
        this.matches.push(new Match_1.Match(this.teams[0], this.teams[2]));
        this.matches.push(new Match_1.Match(this.teams[3], this.teams[1]));
        this.matches.push(new Match_1.Match(this.teams[3], this.teams[0]));
        this.matches.push(new Match_1.Match(this.teams[1], this.teams[2]));
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
                let homeTeam = this.getTeam(match.homeTeam.name);
                let outTeam = this.getTeam(match.outTeam.name);
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
            console.log(`${match.homeTeam.name} - ${match.outTeam.name} : ${match.homeTeamScore} - ${match.outTeamScore}`);
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
}
exports.Group = Group;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(0);
class Match {
    constructor(homeTeam, outTeam) {
        this.homeTeamScore = undefined;
        this.outTeamScore = undefined;
        this.homeTeam = homeTeam;
        this.outTeam = outTeam;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWFkMjgwODVmZjViNTk1MTBkNjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5zcGVjLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9Ub3VybmFtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvVGVhbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0dyb3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvTWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3RGEsc0JBQWMsR0FBYSxDQUFDLENBQUM7QUFDN0IscUJBQWEsR0FBYSxDQUFDLENBQUM7QUFDNUIscUJBQWEsR0FBWSxDQUFDLENBQUM7Ozs7Ozs7Ozs7QUNEeEMsaURBQTRGO0FBQzVGLDZDQUd1QjtBQUV2QixRQUFRLENBQUMscURBQXFELEVBQUU7SUFFNUQsSUFBSyxVQUFVLEdBQWdCLCtCQUFhLEVBQUUsQ0FBQztJ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QUFrQztJQUNsQyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXZDLENBQUM7QUF0QkQsc0hBc0JDIiwiZmlsZSI6IkFwcFNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYWQyODA4NWZmNWI1OTUxMGQ2NCIsImV4cG9ydCBjb25zdCBIT01FX1RFQU1fV0lOUyA6IG51bWJlciA9ICAxO1xuZXhwb3J0IGNvbnN0IE9VVF9URUFNX1dJTlMgOiBudW1iZXIgPSAgMjtcbmV4cG9ydCBjb25zdCBNQVRDSF9JU19EUkFXIDogbnVtYmVyPSAgMDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbHMvQ29uc3RhbnRzLnRzIiwiaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL21vZGVscy9Ub3VybmFtZW50XCI7XG5pbXBvcnQge2dldE1hdGNoZXNGcm9tVGVhbXMsIGdldFRvdXJuYW1lbnQsIG9yZGVyVGVhbXN9IGZyb20gXCIuLi9zcmMvdXRpbHMvVG91cm5hbWVudFV0aWxzXCI7XG5pbXBvcnQge1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXMsIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXMsIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zLFxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuXG59IGZyb20gXCIuL1NwZWNIZWxwZXJzXCI7XG5cbmRlc2NyaWJlKFwidGhpcyB3aWxsIHRlc3QgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGdyb3VwIG1hdGNoZXM6XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIGl0KFwidG91cm5hbWVudCBzaG91bGQgY29udGFpbiBncm91cDEgQVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS5ncm91cG5hbWUpLnRvRXF1YWwoXCJHcm91cCBBXCIpO1xuICAgIH0pO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcblxuICAgIGxldCBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG5cbiAgICBsZXQgdGVhbUEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1swXTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAzIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLnBvaW50cykudG9FcXVhbCg0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBDIGhhcyAxIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzJdLnBvaW50cykudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBEIGhhcyAyIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzNdLnBvaW50cykudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyBzY29yZWQgMyBnb2Fsc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5nb2Fsc1Njb3JlZCkudG9CZSg2KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyBjb25jaWV2ZWQgNCBnb2Fsc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5nb2Fsc0NvbmNpZXZlZCkudG9CZSg0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAxIGRyYXdlZCBtYXRjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5tYXRjaGVzRHJhd2VkKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDEgd29uIG1hdGNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLm1hdGNoZXNXb24pLnRvQmUoMSk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUoXCJ0aGlzIHdpbGwgdGVzdCB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgZ3JvdXAgbWF0Y2hlczpcIiwgZnVuY3Rpb24oKSB7XG5cblxuICAgIHZhciAgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBBKTtcblxuICAgIGl0KFwiUnVzc2lhIGZpcnN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzBdLm5hbWUpLnRvRXF1YWwoXCJSdXNzaWFcIik7XG4gICAgfSk7XG5cblxuICAgIGl0KFwiRWd5cHQgc2Vjb25kIFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMV0ubmFtZSkudG9FcXVhbChcIkVneXB0XCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJVcnVndWF5IGxhc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzJdLm5hbWUpLnRvRXF1YWwoXCJVcnVndWF5XCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJTYXVkaSBBcmFiaWEgdGhpcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzNdLm5hbWUpLnRvRXF1YWwoXCJTYXVkaSBBcmFiaWFcIik7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJncm91cCBBOiBcIiArIGdyb3VwQSk7XG4gICAgdmFyIGVxdWFsVGVhbXMgPSBncm91cEEuZ2V0RXF1YWxUZWFtcygpO1xuXG4gICAgaXQoXCJFZ3lwdCBhbiBVcnVndWF5IGFyZSBjb25jaWRlcmVkIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgZXhwZWN0KGVxdWFsVGVhbXNbMF0ubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgIGxldCBmaXJzdCA9IGVxdWFsVGVhbXNbMF1bMF0ubmFtZSA9PSBcIkVneXB0XCIgfHwgIGVxdWFsVGVhbXNbMF1bMF0ubmFtZSA9PSBcIlVydWd1YXlcIjtcbiAgICAgICBsZXQgc2Vjb25kID0gZXF1YWxUZWFtc1swXVsxXS5uYW1lID09IFwiRWd5cHRcIiB8fCAgZXF1YWxUZWFtc1swXVsxXS5uYW1lID09IFwiVXJ1Z3VheVwiO1xuICAgICAgIGV4cGVjdChmaXJzdCkudG9CZVRydXRoeSgpO1xuICAgICAgIGV4cGVjdChzZWNvbmQpLnRvQmVUcnV0aHkoKTtcblxuICAgIH0pO1xuXG59KTtcblxuZGVzY3JpYmUoXCJ3ZSB3YW50IHRvIGJlIGFibGUgdG8gc2VsZWN0IGEgc3Vic2V0IG9mIG1hdGNoZXNcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICB2YXIgc3ViTWF0Y2hlcyA9ICBnZXRNYXRjaGVzRnJvbVRlYW1zKFtncm91cEEudGVhbXNbMV0sZ3JvdXBBLnRlYW1zWzJdLGdyb3VwQS50ZWFtc1szXV0sZ3JvdXBBLm1hdGNoZXMpXG5cbiAgICBpdChcIndlIGV4cGVjdCAzIG1hdGNoZXMgdG8gYmUgc2VsZWN0ZWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KHN1Yk1hdGNoZXMubGVuZ3RoKS50b0JlKDMpO1xuICAgIH0pO1xuXG59KTtcblxuXG5kZXNjcmliZShcIklmIDMgVGVhbXMgYXJlIGVxdWFsIHdlIG5lZWQgbWFrZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEEpO1xuXG5cbiAgICBpdChcIndlIGV4cGVjdCAzIHRlYW1zIHRvIGJlIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgIGV4cGVjdChncm91cEEuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgZXhwZWN0KGdyb3VwQS5nZXRFcXVhbFRlYW1zKClbMF0ubGVuZ3RoKS50b0JlKDMpO1xuXG4gICAgfSk7XG5cblxuICAgIGl0KFwiUnVzc2lhIHNob3VsZCBiZSBmaXJzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMF0ubmFtZSkudG9CZShcIlJ1c3NpYVwiKVxuICAgIH0pO1xuXG4gICAgaXQoXCJTYXVkaSBBcmFiaWEgc2hvdWxkIGJlIHNlY29uZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMV0ubmFtZSkudG9CZShcIlNhdWRpIEFyYWJpYVwiKVxuICAgIH0pXG4gICAgaXQoXCJVcnVndWF5IHNob3VsZCBiZSB0aGlyZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMl0ubmFtZSkudG9CZShcIlVydWd1YXlcIilcbiAgICB9KVxuICAgIGl0KFwiRWd5cHQgc2hvdWxkIGJlIGxhc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzNdLm5hbWUpLnRvQmUoXCJFZ3lwdFwiKVxuICAgIH0pXG5cblxuXG59KTtcblxuZGVzY3JpYmUoXCJJZiAyIG9uIDIgVGVhbXMgYXJlIGVxdWFsIHdlIG5lZWQgbWFrZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlMm9uMkVxdWFsVGVhbXNXaXRoRGlmZmVyZW5jZUJldHdlZW4odG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG4gICAgZ3JvdXBCLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEIsIHRydWUpO1xuXG5cbiAgICBpdChcIndlIGV4cGVjdCAyIHRlYW1zIHRvIGJlIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKClbMF0ubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKVsxXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgfSk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3QvaW5kZXguc3BlYy50cyIsImltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL21vZGVscy9Ub3VybmFtZW50XCI7XG5pbXBvcnQge1RlYW19IGZyb20gXCIuLi9tb2RlbHMvVGVhbVwiO1xuaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4uL21vZGVscy9Hcm91cFwiO1xuaW1wb3J0IHtNYXRjaH0gZnJvbSBcIi4uL21vZGVscy9NYXRjaFwiO1xuaW1wb3J0IHtIT01FX1RFQU1fV0lOUywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL21vZGVscy9Db25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdXJuYW1lbnQoKSA6IFRvdXJuYW1lbnQge1xuXG4gICAgY29uc29sZS5sb2coXCIqKioqKiBUb3VybmFtZW50IGdlbmVyYXRpb24gU3RhcnRpbmcgKioqKlwiKTtcblxuICAgIGxldCB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IG5ldyBUb3VybmFtZW50KCk7XG5cbiAgICBsZXQgYSA9IFtcIlJ1c3NpYVwiLCBcIlNhdWRpIEFyYWJpYVwiLCBcIkVneXB0XCIsIFwiVXJ1Z3VheVwiXTtcbiAgICBsZXQgdGVhbXNBOiBUZWFtW10gPSBbXTtcbiAgICBhLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgdGVhbXNBLnB1c2gobmV3IFRlYW0obmFtZSkpO1xuICAgIH0pXG5cbiAgICBsZXQgZ3JvdXBBID0gbmV3IEdyb3VwKFwiR3JvdXAgQVwiLCB0ZWFtc0EpO1xuICAgIHRvdXJuYW1lbnQuZ3JvdXBzLnB1c2goZ3JvdXBBKVxuXG4gICAgbGV0IGIgPSBbXCJQb3J0dWdhbFwiLCBcIlNwYWluXCIsIFwiTW9yb2Njb1wiLCBcIklyYW5cIl07XG4gICAgbGV0IHRlYW1zYjogVGVhbVtdID0gW107XG4gICAgYi5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHRlYW1zYi5wdXNoKG5ldyBUZWFtKG5hbWUpKTtcbiAgICB9KVxuXG4gICAgbGV0IGdyb3VwYiA9IG5ldyBHcm91cChcIkdyb3VwIEJcIiwgdGVhbXNiKTtcblxuICAgIHRvdXJuYW1lbnQuZ3JvdXBzLnB1c2goZ3JvdXBiKTtcblxuICAgIGNvbnNvbGUubG9nKFwiKioqKiogVG91cm5hbWVudCBnZW5lcmF0aW9uIENvbXBsZXRlICoqKipcIik7XG5cbiAgICByZXR1cm4gdG91cm5hbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVUZWFtcyh0ZWFtYTogVGVhbSwgdGVhbWIgOiBUZWFtKSA6IG51bWJlciB7XG5cbiAgICBpZih0ZWFtYS5wb2ludHMgIT0gdGVhbWIucG9pbnRzKXtcbiAgICAgICAgLy9jb21wYXJlIG9uIHBvaW50czpcbiAgICAgICAgcmV0dXJuIHRlYW1iLnBvaW50cyAtIHRlYW1hLnBvaW50cztcbiAgICB9IGVsc2UgaWYodGVhbWEuZ2V0R29hbHNEaWZmZXJlbmNlKCkgIT0gdGVhbWIuZ2V0R29hbHNEaWZmZXJlbmNlKCkpe1xuICAgICAgICAvL2NvbXBhcmUgb24gZ29hbCBkaWZmOlxuICAgICAgICByZXR1cm4gdGVhbWIuZ2V0R29hbHNEaWZmZXJlbmNlKCkgLXRlYW1hLmdldEdvYWxzRGlmZmVyZW5jZSgpO1xuICAgIH0gZWxzZSBpZih0ZWFtYS5nb2Fsc1Njb3JlZCAhPSB0ZWFtYi5nb2Fsc1Njb3JlZCl7XG4gICAgICAgIC8vIG9uIGdvYWxzIHNjb3JlZDpcbiAgICAgICAgcmV0dXJuIHRlYW1iLmdvYWxzU2NvcmVkIC0gdGVhbWEuZ29hbHNTY29yZWQ7XG4gICAgfVxuICAgIHJldHVybiAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGVzRnJvbVRlYW1zKHRlYW1zIDogVGVhbVtdLCBhbGxNYXRjaGVzIDogTWF0Y2hbXSkgOiBNYXRjaFtdIHtcbiAgICB2YXIgdGVhbU5hbWVzICA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgdGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgIHRlYW1OYW1lcy5wdXNoKHRlYW0ubmFtZSk7XG4gICAgfSk7XG5cbiAgICB2YXIgcmV0dXJuVmFsIDogTWF0Y2ggW10gPSBuZXcgQXJyYXk8TWF0Y2g+KCk7XG4gICAgYWxsTWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgIGlmKHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLmhvbWVUZWFtLm5hbWUpICE9IC0xICYmIHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLm91dFRlYW0ubmFtZSkgIT0gLTEpe1xuICAgICAgICAgICAgIHJldHVyblZhbC5wdXNoKE9iamVjdC5jcmVhdGUobWF0Y2gpKTtcbiAgICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ViR3JvdXAodGVhbXMgOiBUZWFtW10sIG9yaWdpbmFsR3JvdXAgOiBHcm91cCkgOiAgR3JvdXAge1xuICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgZ3JvdXAudGVhbXMgPSBbXVxuICAgIGZvcih2YXIgdCBvZiB0ZWFtcykge1xuICAgICAgICAgZ3JvdXAudGVhbXMucHVzaChPYmplY3QuY3JlYXRlKHQpKTtcbiAgICB9XG4gICAgLy8gZ3JvdXAudGVhbXMgPSB0ZWFtcy5zbGljZSgpO1xuICAgICBncm91cC5tYXRjaGVzID0gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyxvcmlnaW5hbEdyb3VwLm1hdGNoZXMgKTtcbiAgICAgZm9yKHZhciB0IG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgIHQucmVzZXQoKTtcbiAgICAgfVxuICAgICByZXR1cm4gZ3JvdXA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jY2VzTWF0Y2hlcyhncm91cDogR3JvdXApIDp2b2lkIHtcblxuICAgIC8vZ3JvdXAuZ2V0QWxsTWF0Y2hlc1BsYXllZCgpID0gdHJ1ZTtcblxuICAgIGdyb3VwLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICAgdGVhbS5yZXNldCgpO1xuICAgIH0pO1xuXG4gICAgZ3JvdXAubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIC8vdGhpcyBtZWFucyBtYXRjaCBpcyBwbGF5ZWQsIHNvIGxldCBkbyB3aGF0IHdlIG5lZWQgdG8gZG86XG4gICAgICAgICAgICBsZXQgbWF0Y2hPdXRDb21lID0gbWF0Y2guZ2V0T3V0Q29tZSgpO1xuICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gZ3JvdXAuZ2V0VGVhbShtYXRjaC5ob21lVGVhbS5uYW1lKTtcbiAgICAgICAgICAgIGxldCBvdXRUZWFtID0gZ3JvdXAuZ2V0VGVhbShtYXRjaC5vdXRUZWFtLm5hbWUpO1xuICAgICAgICAgICAgaWYobWF0Y2hPdXRDb21lID09IEhPTUVfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoT3V0Q29tZSA9PSBPVVRfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICBvdXRUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICBob21lVGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAuYWxsTWF0Y2hlc1BsYXllZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vaWYgYWxsIHBsYXllZCBtYXRjaGVzIGFyZSBkb25lLCB3ZSBwdXQgdGhlIHBvaW50czpcbiAgICBncm91cC50ZWFtcy5mb3JFYWNoKCh0ZWFtKT0+e1xuICAgICAgICB0ZWFtLnBvaW50cyA9IHRlYW0ubWF0Y2hlc1dvbiozICsgdGVhbS5tYXRjaGVzRHJhd2VkO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJUZWFtcyhncm91cCA6IEdyb3VwLCBjb21wbGV0ZT8gOiBib29sZWFuKSA6IHZvaWQge1xuICAgIC8vcmVzZXQgc29tZSBzdHVmZjpcbiAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IGZhbHNlO1xuICAgIGdyb3VwLmVxdWFsVGVhbXMgPSBuZXcgQXJyYXk8VGVhbVtdPigpO1xuICAgIGdyb3VwLnRlYW1zLnNvcnQoICh0ZWFtYSwgdGVhbWIpID0+IHtcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gIGNvbXBhcmVUZWFtcyh0ZWFtYSwgdGVhbWIpO1xuICAgICAgICBpZihyZXR1cm5WYWx1ZSA9PSAwKXtcbiAgICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdGVhbSBhIGFuZCB0ZWFtIGIgYXJlIGNvbmNpZGVyZWQgZXF1YWw6XG4gICAgICAgICAgICBncm91cC5hZGRUb0VxdWFsVGVhbXMoW3RlYW1hLCB0ZWFtYl0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVxdWFsVGVhbXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9KTtcblxuICAgIC8vY2hlY2sgaWYgdGhlcmUgYXJlIGVxdWFsdGVhbXMsIGFuZCBkbyB3aGF0cyBuZWVkZWQ6XG4gICAgaWYoZ3JvdXAuZXF1YWxUZWFtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgaWYoZ3JvdXAuZXF1YWxUZWFtc1swXS5sZW5ndGggPT0gNCl7XG4gICAgICAgICAgICAvL3RoaXMgbWVhbnMgYWxsIDQgb2YgdGhlbSB3ZXJlIGVxdWFsLCBzbyB0aGVyZSBpcyBub3RoaW5nIG1vcmUgdG8gZG86XG4gICAgICAgICAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3dlIG5lZWQgdG8gbWFrZSBhIHN1Ymdyb3VwIGFuZCBkbyB0aGUgb3JkZXJpbmcgYWdhaW46XG4gICAgICAgICAgICBmb3IgKCB2YXIgZXF1YWxUZWFtc1N1Ykdyb3VwIG9mIGdyb3VwLmVxdWFsVGVhbXMpe1xuICAgICAgICAgICAgICAgIGlmKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3JlIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnByaW50R3JvdXBNYXRjaGVzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB2YXIgc3ViZ3JvdXAgPSBnZXRTdWJHcm91cChlcXVhbFRlYW1zU3ViR3JvdXAsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBzdWJncm91cC5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgICAgICAgICAgICAgLy93YXRjaCBvdXQgaGVyZSBmb3IgaW5maW5pdGUgbG9vcHMhISFcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVGVhbXMoc3ViZ3JvdXAsZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2FmdGVyIHRoaXMgc3ViZ3JvdXBzIGhhdmUgYmVlbiBvcmRlcmVkLCBzbyBub3cgd2Ugb3JkZXIgdGhlbSBpblxuICAgICAgICAgICAgICAgIC8vc3ViZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cCwgc3ViZ3JvdXApO1xuICAgICAgICAgICAgICAgIC8vZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZpbmFsIHByaW50XCIpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgZ3JvdXAucHJpbnRHcm91cE1hdGNoZXMoKVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBvcmRlckFjY29yZGluZ1RvU3ViR3JvdXBzKGdyb3VwOiBHcm91cCwgc3ViR3JvdXAgOiBHcm91cCl7XG5cblxuICAgIC8vZmluZCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHRlYW06XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IodmFyIHRlYW0gb2YgZ3JvdXAudGVhbXMpe1xuICAgICAgICBpZihzdWJHcm91cC5jb250YWluc1RlYW1XaXRoTmFtZSh0ZWFtLm5hbWUpKXtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4KytcbiAgICB9XG5cbiAgICAvL2dldCBjb3BpZXMgb2YgdGhlIHRlYW1zXG4gICAgdmFyIHRlYW1zVG9BZGQgPSBnZXRTdWJHcm91cEZyb21PcmlnaW5hbEdyb3VwKGdyb3VwLHN1Ykdyb3VwKTtcblxuICAgIC8vdGhlIGZpcnN0IHRlYW0gaXMgaW4gcG9zaXRpb24gaW5kZXggaW4gdGhlIG9yaWdpbmFsIGdyb3VwXG4gICAgLy9zbyBub3cgc3RhcnQgcmVwbGFjaW5nIGZyb20gdGhlcmU6XG4gICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZC50ZWFtcyl7XG4gICAgICAgIGdyb3VwLnRlYW1zLnNwbGljZShpbmRleCwgMSwgdGVhbVRvQWRkKTtcbiAgICAgICAgaW5kZXgrK1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRTdWJHcm91cEZyb21PcmlnaW5hbEdyb3VwIChvcmlnaW5hbEdyb3VwICA6IEdyb3VwLCBzdWJHcm91cCA6IEdyb3VwICkgOiAgR3JvdXB7XG4gICAgdmFyIHJldHVyblZhbCA6IEdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgcmV0dXJuVmFsLnRlYW1zID0gW11cbiAgICBmb3IgKHZhciBzdWJHcm91cFRlYW0gIG9mIHN1Ykdyb3VwLnRlYW1zKXtcbiAgICAgICAgdmFyIHRlYW1Ub0FkZCA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxHcm91cC5nZXRUZWFtKHN1Ykdyb3VwVGVhbS5uYW1lKSk7XG4gICAgICAgIHJldHVyblZhbC50ZWFtcy5wdXNoKHRlYW1Ub0FkZCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWw7XG5cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsImltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5pbXBvcnQge0tub2Nrb3V0TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5cbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50e1xuXG4gICAgZ3JvdXBzIDogR3JvdXBbXSA9ICBbXTtcbiAgICBrbm9ja091dFJvdW5kcyA6ICBbS25vY2tvdXRNYXRjaFtdXTtcblxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9Ub3VybmFtZW50LnRzIiwiZXhwb3J0IGNsYXNzIFRlYW0ge1xuXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHBvaW50czogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc1dvbjogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc0xvc3Q6IG51bWJlciA9IDA7XG4gICAgbWF0Y2hlc0RyYXdlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc1Njb3JlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc0NvbmNpZXZlZDogbnVtYmVyID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpe1xuICAgICAgICB0aGlzLm5hbWUgPSAgbmFtZTtcbiAgICB9XG5cbiAgICByZXNldCgpIDp2b2lkIHtcbiAgICAgICAgdGhpcy5nb2Fsc1Njb3JlZCA9IDA7XG4gICAgICAgIHRoaXMucG9pbnRzID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzRHJhd2VkID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5nb2Fsc0NvbmNpZXZlZCA9IDA7XG4gICAgICAgIHRoaXMubWF0Y2hlc0RyYXdlZCA9IDA7XG4gICAgfVxuXG4gICAgZ2V0R29hbHNEaWZmZXJlbmNlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2Fsc1Njb3JlZCAtIHRoaXMuZ29hbHNDb25jaWV2ZWQ7XG4gICAgfVxuXG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL1RlYW0udHMiLCJpbXBvcnQge1RlYW19IGZyb20gXCIuL1RlYW1cIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7Y29tcGFyZVRlYW1zLCBnZXRTdWJHcm91cH0gZnJvbSBcIi4uL3V0aWxzL1RvdXJuYW1lbnRVdGlsc1wiO1xuXG5leHBvcnQgIGNsYXNzIEdyb3VwIHtcblxuICAgIGdyb3VwbmFtZSA6IHN0cmluZztcbiAgICB0ZWFtcyA6IFRlYW1bXTtcbiAgICBtYXRjaGVzIDogTWF0Y2hbXTtcbiAgICBhbGxNYXRjaGVzUGxheWVkIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBncm91cE5lZWRzRHJhdyA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgZXF1YWxUZWFtcyA6IFRlYW1bXVtdO1xuXG4gICAgY29uc3RydWN0b3IoZ3JvdXBuYW1lPzpzdHJpbmcsIHRlYW1zPzogVGVhbVtdKXtcbiAgICAgICAgdGhpcy5ncm91cG5hbWUgPWdyb3VwbmFtZTtcbiAgICAgICAgdGhpcy50ZWFtcyA9IHRlYW1zO1xuICAgICAgICBpZih0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE1hdGNoZXMoKSA6ICB2b2lke1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXSwgdGhpcy50ZWFtc1sxXSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1syXSwgdGhpcy50ZWFtc1szXSkpO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLCB0aGlzLnRlYW1zWzJdKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzNdLCB0aGlzLnRlYW1zWzFdKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10sIHRoaXMudGVhbXNbMF0pKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMV0sIHRoaXMudGVhbXNbMl0pKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzTWF0Y2hlcygpIDogdm9pZHtcblxuICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICAgICB0ZWFtLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgaWYobWF0Y2gub3V0VGVhbVNjb3JlICE9IHVuZGVmaW5lZCAmJiBtYXRjaC5ob21lVGVhbVNjb3JlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgLy90aGlzIG1lYW5zIG1hdGNoIGlzIHBsYXllZCwgc28gbGV0IGRvIHdoYXQgd2UgbmVlZCB0byBkbzpcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hPdXRDb21lID0gbWF0Y2guZ2V0T3V0Q29tZSgpO1xuICAgICAgICAgICAgICAgIGxldCBob21lVGVhbSA9IHRoaXMuZ2V0VGVhbShtYXRjaC5ob21lVGVhbS5uYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgb3V0VGVhbSA9IHRoaXMuZ2V0VGVhbShtYXRjaC5vdXRUZWFtLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hPdXRDb21lID09IE9VVF9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSk9PntcbiAgICAgICAgICAgIHRlYW0ucG9pbnRzID0gdGVhbS5tYXRjaGVzV29uKjMgKyB0ZWFtLm1hdGNoZXNEcmF3ZWQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICAvL3RoaXMgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0ZWFtbmFtZSBwYXNzZWQgdG8gdGhlIG1ldGhvZDpcbiAgICBnZXRUZWFtKG5hbWU6c3RyaW5nKSA6IFRlYW17XG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaW50R3JvdXBTdGFuZGluZygpIHtcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0ZWFtLm5hbWV9ICB3OiR7dGVhbS5tYXRjaGVzV29ufSAgZDoke3RlYW0ubWF0Y2hlc0RyYXdlZH0gbDoke3RlYW0ubWF0Y2hlc0xvc3R9IHM6JHt0ZWFtLmdvYWxzU2NvcmVkfSBjOiR7dGVhbS5nb2Fsc0NvbmNpZXZlZH0gUDoke3RlYW0ucG9pbnRzfWApXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBwbGF5ZWQ6IFwiICsgdGhpcy5hbGxNYXRjaGVzUGxheWVkKTtcbiAgICB9XG5cbiAgICBwcmludEdyb3VwTWF0Y2hlcygpe1xuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke21hdGNoLmhvbWVUZWFtLm5hbWV9IC0gJHttYXRjaC5vdXRUZWFtLm5hbWV9IDogJHttYXRjaC5ob21lVGVhbVNjb3JlfSAtICR7bWF0Y2gub3V0VGVhbVNjb3JlfWApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEVxdWFsVGVhbXMoKSA6IFRlYW1bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxUZWFtcyA7XG4gICAgfVxuXG4gICAgZ2V0QWxsTWF0Y2hlc1BsYXllZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQ7XG4gICAgfVxuXG4gICAgIGFkZFRvRXF1YWxUZWFtcyh0ZWFtc1RvQWRkIDogVGVhbVtdKSA6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmdldEVxdWFsVGVhbXMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmlyc3QsIGp1c3QgYWRkIGl0OlxuICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBhZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpcyBvbmUgb2YgdGhlIDIgdGVhbXMgYWxyZWFkeSBpcyBpbiBvbiBvZiB0aGUgYXJyYXlzIHRoYXQgd2FzIGFscmVhZHkgYWRkZWQ6XG4gICAgICAgICAgICBmb3IodmFyIGFscmVhZHlBZGRlZFRlYW1zIG9mIHRoaXMuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBpdCBjb250YWlucyBvbmUgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhPZkV4aXN0aW5nVGVhbSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZCl7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXQgYWxyZWFkeSBpbiB0aGVyZSwganVzdCBhZGQgdGhlIG90aGVyIG9uZSBhcyB3ZWxsIGFuZCB3ZSBhcmUgZG9uZTpcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxyZWFkeUFkZGVkVGVhbXMubGFzdEluZGV4T2YodGVhbVRvQWRkKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRXhpc3RpbmdUZWFtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyAyLCB0aGlzIG1lYW5zIHdlIGRpZCBub3QgZmluZCB0aGUgdGVhbSBpbiBhbHJlYWR5QWRkZWRUZWFtc1xuICAgICAgICAgICAgICAgIGlmKGluZGV4T2ZFeGlzdGluZ1RlYW0gIT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXMgMCBvciAxLCB3ZSBmb3VuZCBpcywgc28gd2UgbmVlZCB0byBhZGQgdGhlIG90aGVyIHRlYW0uXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleE9mVGVhbVRvQWRkID0gaW5kZXhPZkV4aXN0aW5nVGVhbSA9PSAxID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXhPZlRlYW1Ub0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlBZGRlZFRlYW1zLnB1c2godGVhbXNUb0FkZFtpbmRleE9mVGVhbVRvQWRkXSk7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZGRlZCl7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFuIHRlYW1zIGFyZSBlcXVhbCAyIG9uIDJcbiAgICAgICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwdXJlbHkgZm9yIGhlbHBpbmcgbWV0aG9kOlxuICAgICAqL1xuICAgICBjb250YWluc1RlYW1XaXRoTmFtZShuYW1lOlN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgZm9yKHZhciB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL0dyb3VwLnRzIiwiaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi9UZWFtXCI7XG5pbXBvcnQgeyBIT01FX1RFQU1fV0lOUywgTUFUQ0hfSVNfRFJBVywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYXRjaHtcbiAgICBob21lVGVhbSA6IFRlYW07XG4gICAgb3V0VGVhbTogVGVhbTtcbiAgICBob21lVGVhbVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gICAgb3V0VGVhbVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihob21lVGVhbTogVGVhbSwgb3V0VGVhbSA6IFRlYW0pe1xuICAgICAgICB0aGlzLmhvbWVUZWFtID1ob21lVGVhbTtcbiAgICAgICAgdGhpcy5vdXRUZWFtID0gb3V0VGVhbTtcbiAgICB9XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBpZih0aGlzLmhvbWVUZWFtU2NvcmUgPiB0aGlzLm91dFRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm91dFRlYW1TY29yZSA+IHRoaXMuaG9tZVRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gT1VUX1RFQU1fV0lOUztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTUFUQ0hfSVNfRFJBVztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEtub2Nrb3V0TWF0Y2ggZXh0ZW5kcyBNYXRjaCB7XG4gICAgaG9tZVRlYW1QZW5hbHR5U2NvcmUgOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gICAgb3V0VGVhbVBlbmFsdHlTY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcbiAgICAgICAgbGV0IG91dENvbWUgPSAgc3VwZXIuZ2V0T3V0Q29tZSgpO1xuICAgICAgICBpZihvdXRDb21lID09IE1BVENIX0lTX0RSQVcpe1xuICAgICAgICAgICAgLy9UaGlzIG1lYW5zIG1hdGNoIHdhcyB3aXRoIHBlbmFscyAuLi5cbiAgICAgICAgICAgIGlmKHRoaXMuaG9tZVRlYW1QZW5hbHR5U2NvcmUgPiB0aGlzLm91dFRlYW1QZW5hbHR5U2NvcmUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBIT01FX1RFQU1fV0lOU1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1VUX1RFQU1fV0lOU1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRDb21lXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbHMvTWF0Y2gudHMiLCJpbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvbW9kZWxzL1RvdXJuYW1lbnRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudDogVG91cm5hbWVudCkgOnZvaWQge1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDA7XG5cblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6dm9pZHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG5cbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gNDtcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50IDogVG91cm5hbWVudCkgOiB2b2lkIHtcbiAgICAvL3NldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gNDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQi5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gNDtcbiAgICBncm91cEIubWF0Y2hlc1syXS5vdXRUZWFtU2NvcmUgPSAwO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbM10ub3V0VGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQi5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDI7XG5cbiAgICBncm91cEIubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbiAgICBncm91cEIubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAwO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJzb3VyY2VSb290IjoiIn0=