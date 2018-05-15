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
function addToNextRound(tournament, groupIndex) {
    const achsteFinales = tournament.rounds[0];
    const groupWinner = tournament.groups[groupIndex].teams[0];
    const groupRunnerUp = tournament.groups[groupIndex].teams[1];
    if (groupIndex % 2 == 0) {
        //even index so group winner in home index, runnerup in out index + 1;
        achsteFinales.matches[groupIndex].homeTeamName = groupWinner.name;
        achsteFinales.matches[groupIndex + 1].outTeamName = groupRunnerUp.name;
    }
    else {
        //odd index so group winner in out index+1, runnerup in home index;
        achsteFinales.matches[groupIndex].homeTeamName = groupRunnerUp.name;
        achsteFinales.matches[groupIndex + 1].outTeamName = groupWinner.name;
    }
}
exports.addToNextRound = addToNextRound;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzc2OTRiMGI4MTM2MmQ5ODlmNzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9UZWFtLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3Rlc3QvaW5kZXguc3BlYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREE7SUFZSSxZQUFZLElBQVc7UUFUdkIsV0FBTSxHQUFX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QyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFdkMsQ0FBQztBQXRCRCxzSEFzQkMiLCJmaWxlIjoiQXBwU3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM3Njk0YjBiODEzNjJkOTg5Zjc5IiwiaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4vR3JvdXBcIjtcblxuZXhwb3J0IGNsYXNzIFRlYW0ge1xuXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwb2ludHM6IG51bWJlciA9IDAgO1xuICAgIG1hdGNoZXNXb246IG51bWJlciA9IDAgO1xuICAgIG1hdGNoZXNMb3N0OiBudW1iZXIgPSAwO1xuICAgIG1hdGNoZXNEcmF3ZWQ6IG51bWJlciA9IDA7XG4gICAgZ29hbHNTY29yZWQ6IG51bWJlciA9IDA7XG4gICAgZ29hbHNDb25jaWV2ZWQ6IG51bWJlciA9IDA7XG4gICAgc3ViR3JvdXBJbmRleDogbnVtYmVyID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpe1xuICAgICAgICB0aGlzLm5hbWUgPSAgbmFtZTtcbiAgICB9XG5cblxuXG4gICAgcmVzZXQoKSA6dm9pZCB7XG5cbiAgICAgICAgdGhpcy5wb2ludHMgPSAwO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlc0RyYXdlZCA9IDA7XG4gICAgICAgIHRoaXMubWF0Y2hlc1dvbiA9IDA7XG4gICAgICAgIHRoaXMubWF0Y2hlc0xvc3QgPSAwO1xuXG4gICAgICAgIHRoaXMuZ29hbHNTY29yZWQgPSAwO1xuICAgICAgICB0aGlzLmdvYWxzQ29uY2lldmVkID0gMDtcbiAgICAgICAgdGhpcy5zdWJHcm91cEluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBnZXRHb2Fsc0RpZmZlcmVuY2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdvYWxzU2NvcmVkIC0gdGhpcy5nb2Fsc0NvbmNpZXZlZDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBUZWFtIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGlucHV0Lm5hbWU7XG4gICAgICAgIGNvbnN0IHRlYW0gPSBuZXcgVGVhbShuYW1lKTtcbiAgICAgICAgLypPYmplY3QuYXNzaWduKFRlYW0sIGlucHV0KTtcbiAgICAgICAgY29uc29sZS5sb2codGVhbSk7Ki9cbiAgICAgICAgdGVhbS5wb2ludHMgPSAgTnVtYmVyKGlucHV0LnBvaW50cyk7XG4gICAgICAgIHRlYW0ubWF0Y2hlc1dvbiA9IE51bWJlcihpbnB1dC5tYXRjaGVzV29uKTtcbiAgICAgICAgdGVhbS5tYXRjaGVzTG9zdCA9IE51bWJlcihpbnB1dC5tYXRjaGVzTG9zdCk7XG4gICAgICAgIHRlYW0ubWF0Y2hlc0RyYXdlZCA9IE51bWJlcihpbnB1dC5tYXRjaGVzRHJhd2VkKTtcbiAgICAgICAgdGVhbS5nb2Fsc1Njb3JlZCA9IE51bWJlcihpbnB1dC5nb2Fsc1Njb3JlZCk7XG4gICAgICAgIHRlYW0uZ29hbHNDb25jaWV2ZWQgPSBOdW1iZXIoaW5wdXQuZ29hbHNDb25jaWV2ZWQpO1xuICAgICAgICB0ZWFtLnN1Ykdyb3VwSW5kZXggPSBOdW1iZXIoaW5wdXQuc3ViR3JvdXBJbmRleCk7XG4gICAgICAgIHJldHVybiB0ZWFtO1xuXG4gICAgfVxuXG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RlYW0udHMiLCJpbXBvcnQge1RlYW19IGZyb20gXCIuL1RlYW1cIjtcbmltcG9ydCB7IEhPTUVfVEVBTV9XSU5TLCBNQVRDSF9JU19EUkFXLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYXRjaHtcbiAgICBob21lVGVhbU5hbWUgOiBzdHJpbmc7XG4gICAgb3V0VGVhbU5hbWU6IHN0cmluZztcbiAgICBob21lVGVhbVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gICAgb3V0VGVhbVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihob21lVGVhbU5hbWU6IHN0cmluZywgb3V0VGVhbU5hbWUgOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmhvbWVUZWFtTmFtZSA9IGhvbWVUZWFtTmFtZTtcbiAgICAgICAgdGhpcy5vdXRUZWFtTmFtZSA9IG91dFRlYW1OYW1lO1xuICAgIH1cblxuICAgIGdldE91dENvbWUoKSA6IG51bWJlciB7XG4gICAgICAgIGlmKHRoaXMuaG9tZVRlYW1TY29yZSA+IHRoaXMub3V0VGVhbVNjb3JlKXtcbiAgICAgICAgICAgIHJldHVybiBIT01FX1RFQU1fV0lOUztcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMub3V0VGVhbVNjb3JlID4gdGhpcy5ob21lVGVhbVNjb3JlKXtcbiAgICAgICAgICAgIHJldHVybiBPVVRfVEVBTV9XSU5TO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNQVRDSF9JU19EUkFXO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IE1hdGNoIHtcbiAgICAgICAgY29uc3QgbSA9IG5ldyBNYXRjaChpbnB1dC5ob21lVGVhbU5hbWUsIGlucHV0Lm91dFRlYW1OYW1lKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtLCBpbnB1dCk7XG4gICAgICAgIHJldHVybiBtO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGNsYXNzIEtub2Nrb3V0TWF0Y2ggZXh0ZW5kcyBNYXRjaCB7XG4gICAgaG9tZVRlYW1QZW5hbHR5U2NvcmUgOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gICAgb3V0VGVhbVBlbmFsdHlTY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcbiAgICAgICAgbGV0IG91dENvbWUgPSAgc3VwZXIuZ2V0T3V0Q29tZSgpO1xuICAgICAgICBpZihvdXRDb21lID09IE1BVENIX0lTX0RSQVcpe1xuICAgICAgICAgICAgLy9UaGlzIG1lYW5zIG1hdGNoIHdhcyB3aXRoIHBlbmFscyAuLi5cbiAgICAgICAgICAgIGlmKHRoaXMuaG9tZVRlYW1QZW5hbHR5U2NvcmUgPiB0aGlzLm91dFRlYW1QZW5hbHR5U2NvcmUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBIT01FX1RFQU1fV0lOU1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1VUX1RFQU1fV0lOU1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRDb21lXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gudHMiLCJleHBvcnQgY29uc3QgSE9NRV9URUFNX1dJTlMgOiBudW1iZXIgPSAgMTtcbmV4cG9ydCBjb25zdCBPVVRfVEVBTV9XSU5TIDogbnVtYmVyID0gIDI7XG5leHBvcnQgY29uc3QgTUFUQ0hfSVNfRFJBVyA6IG51bWJlcj0gIDA7XG5cbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA6IHN0cmluZyA9IFwial91aWRcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL0NvbnN0YW50cy50cyIsIlxuaW1wb3J0IHtnZXRNYXRjaGVzRnJvbVRlYW1zLCBnZXRUb3VybmFtZW50LCBvcmRlclRlYW1zfSBmcm9tIFwiLi4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHNcIjtcbmltcG9ydCB7XG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcywgc2V0R3JvdXBNYXRjaFNjb3JlMkZ1bGx5RXF1YWxUZWFtcywgc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXMsXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlMm9uMkVxdWFsVGVhbXNXaXRoRGlmZmVyZW5jZUJldHdlZW5cbn0gZnJvbSBcIi4vU3BlY0hlbHBlcnNcIjtcbmltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudFwiO1xuXG5cbmRlc2NyaWJlKFwidGhpcyB3aWxsIHRlc3QgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGdyb3VwIG1hdGNoZXM6XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIGl0KFwidG91cm5hbWVudCBzaG91bGQgY29udGFpbiBncm91cDEgQVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS5ncm91cG5hbWUpLnRvRXF1YWwoXCJHcm91cCBBXCIpO1xuICAgIH0pO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcblxuICAgIGxldCBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG5cbiAgICBsZXQgdGVhbUEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1swXTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAzIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLnBvaW50cykudG9FcXVhbCg0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBDIGhhcyAxIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzJdLnBvaW50cykudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBEIGhhcyAyIHBvaW50c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzNdLnBvaW50cykudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyBzY29yZWQgMyBnb2Fsc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5nb2Fsc1Njb3JlZCkudG9CZSg2KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyBjb25jaWV2ZWQgNCBnb2Fsc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5nb2Fsc0NvbmNpZXZlZCkudG9CZSg0KTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAxIGRyYXdlZCBtYXRjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5tYXRjaGVzRHJhd2VkKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDEgd29uIG1hdGNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLm1hdGNoZXNXb24pLnRvQmUoMSk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUoXCJ0aGlzIHdpbGwgdGVzdCB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgZ3JvdXAgbWF0Y2hlczpcIiwgZnVuY3Rpb24oKSB7XG5cblxuICAgIHZhciAgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBBKTtcblxuICAgIGl0KFwiUnVzc2lhIGZpcnN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzBdLm5hbWUpLnRvRXF1YWwoXCJSdXNzaWFcIik7XG4gICAgfSk7XG5cblxuICAgIGl0KFwiRWd5cHQgc2Vjb25kIFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMV0ubmFtZSkudG9FcXVhbChcIkVneXB0XCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJVcnVndWF5IGxhc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzJdLm5hbWUpLnRvRXF1YWwoXCJVcnVndWF5XCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJTYXVkaSBBcmFiaWEgdGhpcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzNdLm5hbWUpLnRvRXF1YWwoXCJTYXVkaSBBcmFiaWFcIik7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJncm91cCBBOiBcIiArIGdyb3VwQSk7XG4gICAgdmFyIGVxdWFsVGVhbXMgPSBncm91cEEuZ2V0RXF1YWxUZWFtcygpO1xuXG4gICAgaXQoXCJFZ3lwdCBhbiBVcnVndWF5IGFyZSBjb25jaWRlcmVkIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgZXhwZWN0KGVxdWFsVGVhbXNbMF0ubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgIGxldCBmaXJzdCA9IGVxdWFsVGVhbXNbMF1bMF0ubmFtZSA9PSBcIkVneXB0XCIgfHwgIGVxdWFsVGVhbXNbMF1bMF0ubmFtZSA9PSBcIlVydWd1YXlcIjtcbiAgICAgICBsZXQgc2Vjb25kID0gZXF1YWxUZWFtc1swXVsxXS5uYW1lID09IFwiRWd5cHRcIiB8fCAgZXF1YWxUZWFtc1swXVsxXS5uYW1lID09IFwiVXJ1Z3VheVwiO1xuICAgICAgIGV4cGVjdChmaXJzdCkudG9CZVRydXRoeSgpO1xuICAgICAgIGV4cGVjdChzZWNvbmQpLnRvQmVUcnV0aHkoKTtcblxuICAgIH0pO1xuXG59KTtcblxuZGVzY3JpYmUoXCJ3ZSB3YW50IHRvIGJlIGFibGUgdG8gc2VsZWN0IGEgc3Vic2V0IG9mIG1hdGNoZXNcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICB2YXIgc3ViTWF0Y2hlcyA9ICBnZXRNYXRjaGVzRnJvbVRlYW1zKFtncm91cEEudGVhbXNbMV0sZ3JvdXBBLnRlYW1zWzJdLGdyb3VwQS50ZWFtc1szXV0sZ3JvdXBBLm1hdGNoZXMpXG5cbiAgICBpdChcIndlIGV4cGVjdCAzIG1hdGNoZXMgdG8gYmUgc2VsZWN0ZWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KHN1Yk1hdGNoZXMubGVuZ3RoKS50b0JlKDMpO1xuICAgIH0pO1xuXG59KTtcblxuXG5kZXNjcmliZShcIklmIDMgVGVhbXMgYXJlIGVxdWFsIHdlIG5lZWQgbWFrZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEEpO1xuXG5cbiAgICBpdChcIndlIGV4cGVjdCAzIHRlYW1zIHRvIGJlIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgIGV4cGVjdChncm91cEEuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgZXhwZWN0KGdyb3VwQS5nZXRFcXVhbFRlYW1zKClbMF0ubGVuZ3RoKS50b0JlKDMpO1xuXG4gICAgfSk7XG5cblxuICAgIGl0KFwiUnVzc2lhIHNob3VsZCBiZSBmaXJzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMF0ubmFtZSkudG9CZShcIlJ1c3NpYVwiKVxuICAgIH0pO1xuXG4gICAgaXQoXCJTYXVkaSBBcmFiaWEgc2hvdWxkIGJlIHNlY29uZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMV0ubmFtZSkudG9CZShcIlNhdWRpIEFyYWJpYVwiKVxuICAgIH0pXG4gICAgaXQoXCJVcnVndWF5IHNob3VsZCBiZSB0aGlyZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMl0ubmFtZSkudG9CZShcIlVydWd1YXlcIilcbiAgICB9KVxuICAgIGl0KFwiRWd5cHQgc2hvdWxkIGJlIGxhc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzNdLm5hbWUpLnRvQmUoXCJFZ3lwdFwiKVxuICAgIH0pXG5cblxuXG59KTtcblxuZGVzY3JpYmUoXCJJZiAyIG9uIDIgVGVhbXMgYXJlIGVxdWFsIHdlIG5lZWQgbWFrZSBhIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgc2V0R3JvdXBNYXRjaFNjb3JlMm9uMkVxdWFsVGVhbXNXaXRoRGlmZmVyZW5jZUJldHdlZW4odG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG4gICAgZ3JvdXBCLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEIsIHRydWUpO1xuXG5cbiAgICBpdChcIndlIGV4cGVjdCAyIHRlYW1zIHRvIGJlIGVxdWFsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKClbMF0ubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKVsxXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgfSk7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3QvaW5kZXguc3BlYy50cyIsImltcG9ydCB7IEtub2Nrb3V0TWF0Y2ggfSBmcm9tICcuLy4uL21vZGVscy9wcm9ub3N0aWVrL01hdGNoJztcbmltcG9ydCB7UHJvbm9zdGlla30gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1Byb25vc3RpZWtcIjtcbmltcG9ydCB7VGVhbX0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1RlYW1cIjtcbmltcG9ydCB7R3JvdXB9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Hcm91cFwiO1xuaW1wb3J0IHtNYXRjaH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vbW9kZWxzL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudFwiO1xuaW1wb3J0IHtLbm9ja091dFJvdW5kfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvS25vY2tPdXRSb3VuZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91cm5hbWVudCgpIDogVG91cm5hbWVudCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIioqKioqIFByb25vc3RpZWsgZ2VuZXJhdGlvbiBTdGFydGluZyAqKioqXCIpO1xuXG4gICAgbGV0IHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gbmV3IFRvdXJuYW1lbnQoKTtcblxuICAgIGxldCBhbGxUZWFtcyA9ICBbXG4gICAgICAgIFtcIlJ1c3NpYVwiLCBcIlNhdWRpIEFyYWJpYVwiLCBcIkVneXB0XCIsIFwiVXJ1Z3VheVwiXSxcbiAgICAgICAgW1wiUG9ydHVnYWxcIiwgXCJTcGFpblwiLCBcIk1vcm9jY29cIiwgXCJJcmFuXCJdLFxuICAgICAgICBbXCJGcmFuY2VcIiwgXCJBdXN0cmFsaWFcIiwgXCJQZXJ1XCIsIFwiRGVubWFya1wiXSxcbiAgICAgICAgW1wiQXJnZW50aW5hXCIsIFwiSWNlbGFuZFwiLCBcIkNyb2F0aWFcIiwgXCJOaWdlcmlhXCJdLFxuICAgICAgICBbXCJCcmF6aWxcIiwgXCJTd2l0emVybGFuZFwiLCBcIkNvc3RhIFJpY2FcIiwgXCJTZXJiaWFcIl0sXG4gICAgICAgIFtcIkdlcm1hbnlcIiwgXCJNZXhpY29cIiwgXCJTd2VkZW5cIiwgXCJLb3JlYSBSZXB1YmxpY1wiXSxcbiAgICAgICAgW1wiQmVsZ2l1bVwiLCBcIlBhbmFtYVwiLCBcIlR1bmlzaWFcIiwgXCJFbmdsYW5kXCJdLFxuICAgICAgICBbXCJQb2xhbmRcIiwgXCJTZW5lZ2FsXCIsIFwiQ29sb21iaWFcIiwgXCJKYXBhblwiXSxcbiAgICBdO1xuXG4gICAgbGV0IGdyb3VwTGV0dGVyID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIl07XG5cbiAgICBhbGxUZWFtcy5mb3JFYWNoKCAoZ3JvdXBUZWFtc05hbWVzLGluZGV4KSA9PiB7XG4gICAgICAgIGxldCB0ZWFtczogVGVhbVtdID0gW107XG4gICAgICAgIGdyb3VwVGVhbXNOYW1lcy5mb3JFYWNoKHRlYW1OYW1lID0+IHtcbiAgICAgICAgICAgIHRlYW1zLnB1c2gobmV3IFRlYW0odGVhbU5hbWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBncm91cCA9IG5ldyBHcm91cCAoXCJHcm9lcCBcIiArIGdyb3VwTGV0dGVyW2luZGV4XSwgdGVhbXMpO1xuICAgICAgICB0b3VybmFtZW50Lmdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICB9KTtcblxuICAgIGxldCByb3VuZHM9W1xuICAgICAgICB7bmFtZTpcIlJvdW5kIG9mIDE2XCIsbnVtYmVyT2ZNYXRjaGVzOjh9LFxuICAgICAgICB7bmFtZTpcIlF1YXJ0ZXIgRmluYWxcIixudW1iZXJPZk1hdGNoZXM6NH0sXG4gICAgICAgIHtuYW1lOlwiU2VtaSBGaW5hbFwiLG51bWJlck9mTWF0Y2hlczoyfSxcbiAgICAgICAge25hbWU6XCJGaW5hbFwiLG51bWJlck9mTWF0Y2hlczoxfVxuICAgICAgICBdO1xuXG4gICAgcm91bmRzLmZvckVhY2goKHJvdW5kRGF0YSkgPT4ge1xuICAgICAgICBsZXQga25vY2tPdXRSb3VuZCA9IG5ldyBLbm9ja091dFJvdW5kKHJvdW5kRGF0YS5uYW1lLCByb3VuZERhdGEubnVtYmVyT2ZNYXRjaGVzKTtcbiAgICAgICAgdG91cm5hbWVudC5yb3VuZHMucHVzaChrbm9ja091dFJvdW5kKTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gdG91cm5hbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVUZWFtcyh0ZWFtYTogVGVhbSwgdGVhbWIgOiBUZWFtKSA6IG51bWJlciB7XG5cbiAgICBpZih0ZWFtYS5wb2ludHMgIT0gdGVhbWIucG9pbnRzKXtcbiAgICAgICAgLy9jb21wYXJlIG9uIHBvaW50czpcbiAgICAgICAgcmV0dXJuIHRlYW1iLnBvaW50cyAtIHRlYW1hLnBvaW50cztcbiAgICB9IGVsc2UgaWYodGVhbWEuZ2V0R29hbHNEaWZmZXJlbmNlKCkgIT0gdGVhbWIuZ2V0R29hbHNEaWZmZXJlbmNlKCkpe1xuICAgICAgICAvL2NvbXBhcmUgb24gZ29hbCBkaWZmOlxuICAgICAgICByZXR1cm4gdGVhbWIuZ2V0R29hbHNEaWZmZXJlbmNlKCkgLXRlYW1hLmdldEdvYWxzRGlmZmVyZW5jZSgpO1xuICAgIH0gZWxzZSBpZih0ZWFtYS5nb2Fsc1Njb3JlZCAhPSB0ZWFtYi5nb2Fsc1Njb3JlZCl7XG4gICAgICAgIC8vIG9uIGdvYWxzIHNjb3JlZDpcbiAgICAgICAgcmV0dXJuIHRlYW1iLmdvYWxzU2NvcmVkIC0gdGVhbWEuZ29hbHNTY29yZWQ7XG4gICAgfVxuICAgIHJldHVybiAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRjaGVzRnJvbVRlYW1zKHRlYW1zIDogVGVhbVtdLCBhbGxNYXRjaGVzIDogTWF0Y2hbXSkgOiBNYXRjaFtdIHtcbiAgICB2YXIgdGVhbU5hbWVzICA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgdGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgIHRlYW1OYW1lcy5wdXNoKHRlYW0ubmFtZSk7XG4gICAgfSk7XG5cbiAgICB2YXIgcmV0dXJuVmFsIDogTWF0Y2ggW10gPSBuZXcgQXJyYXk8TWF0Y2g+KCk7XG4gICAgYWxsTWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgIGlmKHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLmhvbWVUZWFtTmFtZSkgIT0gLTEgJiYgdGVhbU5hbWVzLmluZGV4T2YobWF0Y2gub3V0VGVhbU5hbWUpICE9IC0xKXtcbiAgICAgICAgICAgICByZXR1cm5WYWwucHVzaChPYmplY3QuY3JlYXRlKG1hdGNoKSk7XG4gICAgICAgfVxuXG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVyblZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1Ykdyb3VwKHRlYW1zIDogVGVhbVtdLCBvcmlnaW5hbEdyb3VwIDogR3JvdXApIDogIEdyb3VwIHtcbiAgICAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgIGdyb3VwLnRlYW1zID0gW11cbiAgICBmb3IodmFyIHQgb2YgdGVhbXMpIHtcbiAgICAgICAgIGdyb3VwLnRlYW1zLnB1c2goT2JqZWN0LmNyZWF0ZSh0KSk7XG4gICAgfVxuICAgIC8vIGdyb3VwLnRlYW1zID0gdGVhbXMuc2xpY2UoKTtcbiAgICAgZ3JvdXAubWF0Y2hlcyA9IGdldE1hdGNoZXNGcm9tVGVhbXModGVhbXMsb3JpZ2luYWxHcm91cC5tYXRjaGVzICk7XG4gICAgIGZvcih2YXIgdCBvZiBncm91cC50ZWFtcyl7XG4gICAgICAgICB0LnJlc2V0KCk7XG4gICAgIH1cbiAgICAgcmV0dXJuIGdyb3VwO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlclRlYW1zKGdyb3VwIDogR3JvdXAsIGNvbXBsZXRlPyA6IGJvb2xlYW4pIDogdm9pZCB7XG4gICAgLy9yZXNldCBzb21lIHN0dWZmOlxuICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gZmFsc2U7XG4gICAgZ3JvdXAuZXF1YWxUZWFtcyA9IG5ldyBBcnJheTxUZWFtW10+KCk7XG4gICAgZ3JvdXAudGVhbXMuc29ydCggKHRlYW1hLCB0ZWFtYikgPT4ge1xuICAgICAgICB2YXIgXyA9ICBjb21wYXJlVGVhbXModGVhbWEsIHRlYW1iKTtcbiAgICAgICAgaWYoIF8gPT0gMCl7XG4gICAgICAgICAgICAvLyB0aGlzIG1lYW5zIHRlYW0gYSBhbmQgdGVhbSBiIGFyZSBjb25jaWRlcmVkIGVxdWFsOlxuICAgICAgICAgICAgZ3JvdXAuYWRkVG9FcXVhbFRlYW1zKFt0ZWFtYSwgdGVhbWJdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXztcbiAgICB9KTtcblxuICAgIC8vSUYgbm90IGFsbCBtYXRjaGVzIGFyZSBwbGF5ZWQsIHdlIGNhbiBza2lwcCB0aGUgcmVzdFxuICAgIGlmKCFncm91cC5hbGxNYXRjaGVzUGxheWVkKXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL2NoZWNrIGlmIHRoZXJlIGFyZSBlcXVhbHRlYW1zLCBhbmQgZG8gd2hhdHMgbmVlZGVkOlxuICAgIGlmKGdyb3VwLmVxdWFsVGVhbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGlmKGdyb3VwLmVxdWFsVGVhbXNbMF0ubGVuZ3RoID09IGdyb3VwLnRlYW1zLmxlbmd0aCl7XG4gICAgICAgICAgICAvL3RoaXMgbWVhbnMgYWxsICBvZiB0aGUgdGVhbXMgd2VyZSBlcXVhbCwgc28gdGhlcmUgaXMgbm90aGluZyBtb3JlIHRvIGRvOlxuICAgICAgICAgICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy93ZSBuZWVkIHRvIG1ha2UgYSBzdWJncm91cCBhbmQgZG8gdGhlIG9yZGVyaW5nIGFnYWluOlxuICAgICAgICAgICAgZm9yICggdmFyIGVxdWFsVGVhbXNTdWJHcm91cCBvZiBncm91cC5lcXVhbFRlYW1zKXtcbiAgICAgICAgICAgICAgICBpZihjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpe1xuICAgICAgICAgICAgICAgICAgIC8qIGNvbnNvbGUubG9nKFwiQmVmb3JlIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnByaW50R3JvdXBNYXRjaGVzKCkqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHZhciBzdWJncm91cCA9IGdldFN1Ykdyb3VwKGVxdWFsVGVhbXNTdWJHcm91cCwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIHN1Ymdyb3VwLnByb2Nlc3NNYXRjaGVzKCk7XG5cbiAgICAgICAgICAgICAgICAvL3dhdGNoIG91dCBoZXJlIGZvciBpbmZpbml0ZSBsb29wcyEhIVxuICAgICAgICAgICAgICAgIC8qaWYgKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcmRlclRlYW1zKHN1Ymdyb3VwLGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgIGlmKCFncm91cC5ncm91cE5lZWRzRHJhdyl7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVGVhbXMoc3ViZ3JvdXAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdWJncm91cC5ncm91cE5lZWRzRHJhdyl7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9hZnRlciB0aGlzIHN1Ymdyb3VwcyBoYXZlIGJlZW4gb3JkZXJlZCwgc28gbm93IHdlIG9yZGVyIHRoZW0gaW5cbiAgICAgICAgICAgICAgICAvL3N1Ymdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICAgICAgICAgIG9yZGVyQWNjb3JkaW5nVG9TdWJHcm91cHMoZ3JvdXAsIHN1Ymdyb3VwKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKXtcbiAgICAgICAvKiBjb25zb2xlLmxvZyhcIkZpbmFsIHByaW50XCIpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgZ3JvdXAucHJpbnRHcm91cE1hdGNoZXMoKSovXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9yZGVyQWNjb3JkaW5nVG9TdWJHcm91cHMoZ3JvdXA6IEdyb3VwLCBzdWJHcm91cCA6IEdyb3VwKXtcblxuXG4gICAgLy9maW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgdGVhbTpcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvcih2YXIgdGVhbSBvZiBncm91cC50ZWFtcyl7XG4gICAgICAgIGlmKHN1Ykdyb3VwLmNvbnRhaW5zVGVhbVdpdGhOYW1lKHRlYW0ubmFtZSkpe1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgrK1xuICAgIH1cblxuICAgIC8vZ2V0IGNvcGllcyBvZiB0aGUgdGVhbXNcbiAgICB2YXIgdGVhbXNUb0FkZCA9IGdldFN1Ykdyb3VwRnJvbU9yaWdpbmFsR3JvdXAoZ3JvdXAsc3ViR3JvdXApO1xuXG4gICAgLy90aGUgZmlyc3QgdGVhbSBpcyBpbiBwb3NpdGlvbiBpbmRleCBpbiB0aGUgb3JpZ2luYWwgZ3JvdXBcbiAgICAvL3NvIG5vdyBzdGFydCByZXBsYWNpbmcgZnJvbSB0aGVyZTpcbiAgICBmb3IodmFyIHRlYW1Ub0FkZCBvZiB0ZWFtc1RvQWRkLnRlYW1zKXtcbiAgICAgICAgZ3JvdXAudGVhbXMuc3BsaWNlKGluZGV4LCAxLCB0ZWFtVG9BZGQpO1xuICAgICAgICBpbmRleCsrXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFN1Ykdyb3VwRnJvbU9yaWdpbmFsR3JvdXAgKG9yaWdpbmFsR3JvdXAgIDogR3JvdXAsIHN1Ykdyb3VwIDogR3JvdXAgKSA6ICBHcm91cHtcbiAgICB2YXIgcmV0dXJuVmFsIDogR3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICByZXR1cm5WYWwudGVhbXMgPSBbXTtcbiAgICBmb3IgKHZhciBzdWJHcm91cFRlYW0gIG9mIHN1Ykdyb3VwLnRlYW1zKXtcbiAgICAgICAgdmFyIHRlYW1Ub0FkZCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsR3JvdXAuZ2V0VGVhbSgoc3ViR3JvdXBUZWFtLm5hbWUpKSk7XG4gICAgICAgIC8vdmFyIHRlYW1Ub0FkZCA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxHcm91cC5nZXRUZWFtKHN1Ykdyb3VwVGVhbS5uYW1lKSk7XG4gICAgICAgIHJldHVyblZhbC50ZWFtcy5wdXNoKHRlYW1Ub0FkZCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWw7XG5cbn1cblxuXG4vKiBcbldpbm5lciBBIHYuIFJ1bm5lci11cCBCID0gMSAtIDBcbldpbm5lciBCIHYuIFJ1bm5lci11cCBBID0gMiAtIDFcbldpbm5lciBDIHYuIFJ1bm5lci11cCBEID0gMyBcbldpbm5lciBEIHYuIFJ1bm5lci11cCBDID0gNFxuV2lubmVyIEUgdi4gUnVubmVyLXVwIEYgPSA1XG5XaW5uZXIgRiB2LiBSdW5uZXItdXAgRSA9IDZcbldpbm5lciBHIHYuIFJ1bm5lci11cCBIID0gN1xuV2lubmVyIEggdi4gUnVubmVyLXVwIEcgPSA4IFxuKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb05leHRSb3VuZCh0b3VybmFtZW50IDogVG91cm5hbWVudCxncm91cEluZGV4OiBudW1iZXIpIHtcbiAgICBcbiAgICBjb25zdCBhY2hzdGVGaW5hbGVzID0gIHRvdXJuYW1lbnQucm91bmRzWzBdO1xuICAgIGNvbnN0IGdyb3VwV2lubmVyID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMF07XG4gICAgY29uc3QgZ3JvdXBSdW5uZXJVcCA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzFdO1xuXG4gICAgaWYoZ3JvdXBJbmRleCUyID09IDApe1xuICAgICAgICAvL2V2ZW4gaW5kZXggc28gZ3JvdXAgd2lubmVyIGluIGhvbWUgaW5kZXgsIHJ1bm5lcnVwIGluIG91dCBpbmRleCArIDE7XG4gICAgICAgIGFjaHN0ZUZpbmFsZXMubWF0Y2hlc1tncm91cEluZGV4XS5ob21lVGVhbU5hbWUgPSBncm91cFdpbm5lci5uYW1lO1xuICAgICAgICBhY2hzdGVGaW5hbGVzLm1hdGNoZXNbZ3JvdXBJbmRleCsxXS5vdXRUZWFtTmFtZSA9IGdyb3VwUnVubmVyVXAubmFtZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vb2RkIGluZGV4IHNvIGdyb3VwIHdpbm5lciBpbiBvdXQgaW5kZXgrMSwgcnVubmVydXAgaW4gaG9tZSBpbmRleDtcbiAgICAgICAgYWNoc3RlRmluYWxlcy5tYXRjaGVzW2dyb3VwSW5kZXhdLmhvbWVUZWFtTmFtZSA9IGdyb3VwUnVubmVyVXAubmFtZTtcbiAgICAgICAgYWNoc3RlRmluYWxlcy5tYXRjaGVzW2dyb3VwSW5kZXgrMV0ub3V0VGVhbU5hbWUgPSBncm91cFdpbm5lci5uYW1lO1xuICAgIH1cbn1cbiAgXG5cblxuXG4vLyAqKiogRnJvbnRlbmQgSGVscGVyIG1ldGhvZHM6ICoqKiAvL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VCYXNlZE9uTmFtZShuZXdHcm91cCA6IEdyb3VwLCBncm91cHMgOkdyb3VwW10pIDogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gZmluZEluZGV4T2ZHcm91cEJhc2VkT25OYW1lKG5ld0dyb3VwLCBncm91cHMpO1xuICAgIGdyb3Vwc1tpbmRleF0gPSBuZXdHcm91cDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4T2ZHcm91cEJhc2VkT25OYW1lKGdyb3VwVG9GaW5kOkdyb3VwICwgZ3JvdXBzIDogR3JvdXBbXSkgOiBhbnkge1xuXG4gICAgZm9yKGxldCBpIGluIGdyb3Vwcyl7XG4gICAgICAgIGlmKGdyb3Vwc1tpXS5ncm91cG5hbWUgPT0gZ3JvdXBUb0ZpbmQuZ3JvdXBuYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gKioqIEVORCAqKiogLy9cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvdXRpbHMvVG91cm5hbWVudFV0aWxzLnRzIiwiaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi9UZWFtXCI7XG5pbXBvcnQge01hdGNofSBmcm9tIFwiLi9NYXRjaFwiO1xuaW1wb3J0IHtIT01FX1RFQU1fV0lOUywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgIGNsYXNzIEdyb3VwIHtcblxuICAgIGdyb3VwbmFtZSA6IHN0cmluZztcbiAgICB0ZWFtcyA6IFRlYW1bXTtcbiAgICBtYXRjaGVzIDogTWF0Y2hbXTtcbiAgICBhbGxNYXRjaGVzUGxheWVkIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBncm91cE5lZWRzRHJhdyA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgZXF1YWxUZWFtcyA6IFRlYW1bXVtdO1xuXG4gICAgY29uc3RydWN0b3IoZ3JvdXBuYW1lPzpzdHJpbmcsIHRlYW1zPzogVGVhbVtdKXtcbiAgICAgICAgdGhpcy5ncm91cG5hbWUgPWdyb3VwbmFtZTtcbiAgICAgICAgdGhpcy50ZWFtcyA9IHRlYW1zO1xuICAgICAgICBpZih0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1hdGNoZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE1hdGNoZXMoKSA6ICB2b2lke1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXS5uYW1lLCB0aGlzLnRlYW1zWzFdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMl0ubmFtZSwgdGhpcy50ZWFtc1szXS5uYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMF0ubmFtZSwgdGhpcy50ZWFtc1syXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzNdLm5hbWUsIHRoaXMudGVhbXNbMV0ubmFtZSkpO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzNdLm5hbWUsIHRoaXMudGVhbXNbMF0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1sxXS5uYW1lLCB0aGlzLnRlYW1zWzJdLm5hbWUpKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzTWF0Y2hlcygpIDogdm9pZHtcblxuICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICAgICB0ZWFtLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgaWYobWF0Y2gub3V0VGVhbVNjb3JlICE9IHVuZGVmaW5lZCAmJiBtYXRjaC5ob21lVGVhbVNjb3JlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgLy90aGlzIG1lYW5zIG1hdGNoIGlzIHBsYXllZCwgc28gbGV0IGRvIHdoYXQgd2UgbmVlZCB0byBkbzpcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hPdXRDb21lID0gbWF0Y2guZ2V0T3V0Q29tZSgpO1xuICAgICAgICAgICAgICAgIGxldCBob21lVGVhbSA9IHRoaXMuZ2V0VGVhbShtYXRjaC5ob21lVGVhbU5hbWUpO1xuICAgICAgICAgICAgICAgIGxldCBvdXRUZWFtID0gdGhpcy5nZXRUZWFtKG1hdGNoLm91dFRlYW1OYW1lKTtcbiAgICAgICAgICAgICAgICBpZihtYXRjaE91dENvbWUgPT0gSE9NRV9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoT3V0Q29tZSA9PSBPVVRfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG91dFRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIG91dFRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxNYXRjaGVzUGxheWVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9pZiBhbGwgcGxheWVkIG1hdGNoZXMgYXJlIGRvbmUsIHdlIHB1dCB0aGUgcG9pbnRzOlxuICAgICAgICB0aGlzLnRlYW1zLmZvckVhY2goKHRlYW0pPT57XG4gICAgICAgICAgICB0ZWFtLnBvaW50cyA9IHRlYW0ubWF0Y2hlc1dvbiozICsgdGVhbS5tYXRjaGVzRHJhd2VkO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgLy90aGlzIGdldCB0aGUgY29ycmVzcG9uZGluZyB0byB0aGUgdGVhbW5hbWUgcGFzc2VkIHRvIHRoZSBtZXRob2Q6XG4gICAgZ2V0VGVhbShuYW1lOnN0cmluZykgOiBUZWFte1xuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZWFtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcmludEdyb3VwU3RhbmRpbmcoKSB7XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGVhbS5uYW1lfSAgdzoke3RlYW0ubWF0Y2hlc1dvbn0gIGQ6JHt0ZWFtLm1hdGNoZXNEcmF3ZWR9IGw6JHt0ZWFtLm1hdGNoZXNMb3N0fSBzOiR7dGVhbS5nb2Fsc1Njb3JlZH0gYzoke3RlYW0uZ29hbHNDb25jaWV2ZWR9IFA6JHt0ZWFtLnBvaW50c31gKVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGwgcGxheWVkOiBcIiArIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCk7XG4gICAgfVxuXG4gICAgcHJpbnRHcm91cE1hdGNoZXMoKXtcbiAgICAgICAgdGhpcy5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHttYXRjaC5ob21lVGVhbU5hbWV9IC0gJHttYXRjaC5vdXRUZWFtTmFtZX0gOiAke21hdGNoLmhvbWVUZWFtU2NvcmV9IC0gJHttYXRjaC5vdXRUZWFtU2NvcmV9YCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0RXF1YWxUZWFtcygpIDogVGVhbVtdW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbFRlYW1zIDtcbiAgICB9XG5cbiAgICBnZXRBbGxNYXRjaGVzUGxheWVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsTWF0Y2hlc1BsYXllZDtcbiAgICB9XG5cblxuICAgIGFkZFRvRXF1YWxUZWFtcyh0ZWFtc1RvQWRkIDogVGVhbVtdKSA6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmdldEVxdWFsVGVhbXMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmlyc3QsIGp1c3QgYWRkIGl0OlxuICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBhZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpcyBvbmUgb2YgdGhlIDIgdGVhbXMgYWxyZWFkeSBpcyBpbiBvbiBvZiB0aGUgYXJyYXlzIHRoYXQgd2FzIGFscmVhZHkgYWRkZWQ6XG4gICAgICAgICAgICBmb3IodmFyIGFscmVhZHlBZGRlZFRlYW1zIG9mIHRoaXMuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBpdCBjb250YWlucyBvbmUgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhPZkV4aXN0aW5nVGVhbSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZCl7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXQgYWxyZWFkeSBpbiB0aGVyZSwganVzdCBhZGQgdGhlIG90aGVyIG9uZSBhcyB3ZWxsIGFuZCB3ZSBhcmUgZG9uZTpcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxyZWFkeUFkZGVkVGVhbXMubGFzdEluZGV4T2YodGVhbVRvQWRkKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRXhpc3RpbmdUZWFtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyAyLCB0aGlzIG1lYW5zIHdlIGRpZCBub3QgZmluZCB0aGUgdGVhbSBpbiBhbHJlYWR5QWRkZWRUZWFtc1xuICAgICAgICAgICAgICAgIGlmKGluZGV4T2ZFeGlzdGluZ1RlYW0gIT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXMgMCBvciAxLCB3ZSBmb3VuZCBpcywgc28gd2UgbmVlZCB0byBhZGQgdGhlIG90aGVyIHRlYW0uXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleE9mVGVhbVRvQWRkID0gaW5kZXhPZkV4aXN0aW5nVGVhbSA9PSAxID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXhPZlRlYW1Ub0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlBZGRlZFRlYW1zLnB1c2godGVhbXNUb0FkZFtpbmRleE9mVGVhbVRvQWRkXSk7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZGRlZCl7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFuIHRlYW1zIGFyZSBlcXVhbCAyIG9uIDJcbiAgICAgICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwdXJlbHkgZm9yIGhlbHBpbmcgbWV0aG9kOlxuICAgICAqL1xuICAgICBjb250YWluc1RlYW1XaXRoTmFtZShuYW1lOlN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgZm9yKHZhciB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogR3JvdXAge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ3JvdXAsIGlucHV0KTtcblxuICAgICAgICAgICAgbGV0IG5ld1RlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zLmZvckVhY2godGVhbSA9PiB7XG4gICAgICAgICAgICAgICAgIG5ld1RlYW1zLnB1c2goVGVhbS5kZXNlcmlhbGl6ZSh0ZWFtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zID0gbmV3VGVhbXM7XG5cbiAgICAgICAgICAgIGxldCBuZXdNYXRjaGVzOiBNYXRjaFtdID0gW107XG4gICAgICAgICAgICBncm91cC5tYXRjaGVzLmZvckVhY2gobWF0Y2ggID0+IHtcbiAgICAgICAgICAgICAgICBuZXdNYXRjaGVzLnB1c2goTWF0Y2guZGVzZXJpYWxpemUobWF0Y2gpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXAubWF0Y2hlcyA9IG5ld01hdGNoZXM7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwLnRzIiwiaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4vR3JvdXBcIjtcbmltcG9ydCB7S25vY2tPdXRSb3VuZH0gZnJvbSBcIi4vS25vY2tPdXRSb3VuZFwiO1xuXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudHtcblxuICAgIGdyb3VwcyA6IEdyb3VwW10gPSAgW107XG4gICAgcm91bmRzIDogIEtub2NrT3V0Um91bmRbXSA9IFtdO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50LnRzIiwiaW1wb3J0IHtLbm9ja291dE1hdGNofSBmcm9tIFwiLi9NYXRjaFwiO1xuXG5leHBvcnQgY2xhc3MgS25vY2tPdXRSb3VuZCB7XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbWF0Y2hlczogS25vY2tvdXRNYXRjaFtdO1xuICAgIG51bWJlck9mUGxhY2VzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG51bWJlck9mTWF0Y2hlcyA6IG51bWJlcil7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG51bWJlck9mTWF0Y2hlczsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBLbm9ja291dE1hdGNoKHVuZGVmaW5lZCwgdW5kZWZpbmVkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmQudHMiLCJpbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50OiBUb3VybmFtZW50KSA6dm9pZCB7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAxO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMDtcblxuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDp2b2lke1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDM7XG5cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDogdm9pZCB7XG4gICAgLy9zZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzBdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDQ7XG5cbiAgICBncm91cEEubWF0Y2hlc1sxXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEEubWF0Y2hlc1s0XS5vdXRUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQS5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG5cbiAgICBncm91cEIubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMTtcbiAgICBncm91cEIubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzJdLmhvbWVUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQi5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1szXS5ob21lVGVhbVNjb3JlID0gMztcbiAgICBncm91cEIubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMjtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAyO1xuICAgIGdyb3VwQi5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==