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
    // FOR DEV PURPOSES:
    tournament.groups.forEach((group) => {
        group.matches.forEach((match, index) => {
            if (index < 5) {
                match.homeTeamScore = Math.round(Math.random() * 5);
                match.outTeamScore = Math.round(Math.random() * 5);
            }
        });
        group.processMatches();
    });
    // END
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
function addToNextRound(tournament) {
    const achsteFinales = tournament.rounds[0];
    tournament.groups.forEach((group, groupIndex) => {
        if (group.allMatchesPlayed) {
            const groupWinner = tournament.groups[groupIndex].teams[0];
            const groupRunnerUp = tournament.groups[groupIndex].teams[1];
            if (groupIndex % 2 == 0) {
                //even index so group winner in home index, runnerup in out index + 1;
                achsteFinales.matches[groupIndex].homeTeamName = groupWinner.name;
                achsteFinales.matches[groupIndex + 1].outTeamName = groupRunnerUp.name;
            }
            else {
                //odd index so group winner in out index+1, runnerup in home index;
                achsteFinales.matches[groupIndex].homeTeamName = groupWinner.name;
                achsteFinales.matches[groupIndex - 1].outTeamName = groupRunnerUp.name;
            }
        }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWJiM2ZiMjA4ZmQ4NmM4NTA5NmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9UZWFtLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3Rlc3QvaW5kZXguc3BlYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREE7SUFZSSxZQUFZLElBQVc7UUFUdkIsV0FBTSxHQUFX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LENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXZDLENBQUM7QUF0QkQsc0hBc0JDIiwiZmlsZSI6IkFwcFNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhYmIzZmIyMDhmZDg2Yzg1MDk2ZCIsImltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUZWFtIHtcblxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcG9pbnRzOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzV29uOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzTG9zdDogbnVtYmVyID0gMDtcbiAgICBtYXRjaGVzRHJhd2VkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzU2NvcmVkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzQ29uY2lldmVkOiBudW1iZXIgPSAwO1xuICAgIHN1Ykdyb3VwSW5kZXg6IG51bWJlciA9IDA7XG5cblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKXtcbiAgICAgICAgdGhpcy5uYW1lID0gIG5hbWU7XG4gICAgfVxuXG5cblxuICAgIHJlc2V0KCkgOnZvaWQge1xuXG4gICAgICAgIHRoaXMucG9pbnRzID0gMDtcblxuICAgICAgICB0aGlzLm1hdGNoZXNEcmF3ZWQgPSAwO1xuICAgICAgICB0aGlzLm1hdGNoZXNXb24gPSAwO1xuICAgICAgICB0aGlzLm1hdGNoZXNMb3N0ID0gMDtcblxuICAgICAgICB0aGlzLmdvYWxzU2NvcmVkID0gMDtcbiAgICAgICAgdGhpcy5nb2Fsc0NvbmNpZXZlZCA9IDA7XG4gICAgICAgIHRoaXMuc3ViR3JvdXBJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgZ2V0R29hbHNEaWZmZXJlbmNlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2Fsc1Njb3JlZCAtIHRoaXMuZ29hbHNDb25jaWV2ZWQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogVGVhbSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBpbnB1dC5uYW1lO1xuICAgICAgICBjb25zdCB0ZWFtID0gbmV3IFRlYW0obmFtZSk7XG4gICAgICAgIC8qT2JqZWN0LmFzc2lnbihUZWFtLCBpbnB1dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlYW0pOyovXG4gICAgICAgIHRlYW0ucG9pbnRzID0gIE51bWJlcihpbnB1dC5wb2ludHMpO1xuICAgICAgICB0ZWFtLm1hdGNoZXNXb24gPSBOdW1iZXIoaW5wdXQubWF0Y2hlc1dvbik7XG4gICAgICAgIHRlYW0ubWF0Y2hlc0xvc3QgPSBOdW1iZXIoaW5wdXQubWF0Y2hlc0xvc3QpO1xuICAgICAgICB0ZWFtLm1hdGNoZXNEcmF3ZWQgPSBOdW1iZXIoaW5wdXQubWF0Y2hlc0RyYXdlZCk7XG4gICAgICAgIHRlYW0uZ29hbHNTY29yZWQgPSBOdW1iZXIoaW5wdXQuZ29hbHNTY29yZWQpO1xuICAgICAgICB0ZWFtLmdvYWxzQ29uY2lldmVkID0gTnVtYmVyKGlucHV0LmdvYWxzQ29uY2lldmVkKTtcbiAgICAgICAgdGVhbS5zdWJHcm91cEluZGV4ID0gTnVtYmVyKGlucHV0LnN1Ykdyb3VwSW5kZXgpO1xuICAgICAgICByZXR1cm4gdGVhbTtcblxuICAgIH1cblxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9UZWFtLnRzIiwiaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi9UZWFtXCI7XG5pbXBvcnQgeyBIT01FX1RFQU1fV0lOUywgTUFUQ0hfSVNfRFJBVywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY2xhc3MgTWF0Y2h7XG4gICAgaG9tZVRlYW1OYW1lIDogc3RyaW5nO1xuICAgIG91dFRlYW1OYW1lOiBzdHJpbmc7XG4gICAgaG9tZVRlYW1TY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuICAgIG91dFRlYW1TY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoaG9tZVRlYW1OYW1lOiBzdHJpbmcsIG91dFRlYW1OYW1lIDogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5ob21lVGVhbU5hbWUgPSBob21lVGVhbU5hbWU7XG4gICAgICAgIHRoaXMub3V0VGVhbU5hbWUgPSBvdXRUZWFtTmFtZTtcbiAgICB9XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBpZih0aGlzLmhvbWVUZWFtU2NvcmUgPiB0aGlzLm91dFRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm91dFRlYW1TY29yZSA+IHRoaXMuaG9tZVRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gT1VUX1RFQU1fV0lOUztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTUFUQ0hfSVNfRFJBVztcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBNYXRjaCB7XG4gICAgICAgIGNvbnN0IG0gPSBuZXcgTWF0Y2goaW5wdXQuaG9tZVRlYW1OYW1lLCBpbnB1dC5vdXRUZWFtTmFtZSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obSwgaW5wdXQpO1xuICAgICAgICByZXR1cm4gbTtcblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBjbGFzcyBLbm9ja291dE1hdGNoIGV4dGVuZHMgTWF0Y2gge1xuICAgIFxuICAgIGhvbWVUZWFtUGVuYWx0eVNjb3JlIDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICAgIG91dFRlYW1QZW5hbHR5U2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIGdldE91dENvbWUoKSA6IG51bWJlciB7XG4gICAgICAgIGxldCBvdXRDb21lID0gIHN1cGVyLmdldE91dENvbWUoKTtcbiAgICAgICAgaWYob3V0Q29tZSA9PSBNQVRDSF9JU19EUkFXKXtcbiAgICAgICAgICAgIC8vVGhpcyBtZWFucyBtYXRjaCB3YXMgd2l0aCBwZW5hbHMgLi4uXG4gICAgICAgICAgICBpZih0aGlzLmhvbWVUZWFtUGVuYWx0eVNjb3JlID4gdGhpcy5vdXRUZWFtUGVuYWx0eVNjb3JlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9VVF9URUFNX1dJTlNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0Q29tZVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL01hdGNoLnRzIiwiZXhwb3J0IGNvbnN0IEhPTUVfVEVBTV9XSU5TIDogbnVtYmVyID0gIDE7XG5leHBvcnQgY29uc3QgT1VUX1RFQU1fV0lOUyA6IG51bWJlciA9ICAyO1xuZXhwb3J0IGNvbnN0IE1BVENIX0lTX0RSQVcgOiBudW1iZXI9ICAwO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFX05BTUUgOiBzdHJpbmcgPSBcImpfdWlkXCI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9Db25zdGFudHMudHMiLCJcbmltcG9ydCB7Z2V0TWF0Y2hlc0Zyb21UZWFtcywgZ2V0VG91cm5hbWVudCwgb3JkZXJUZWFtc30gZnJvbSBcIi4uL3NyYy9zaGFyZWQvdXRpbHMvVG91cm5hbWVudFV0aWxzXCI7XG5pbXBvcnQge1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXMsIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXMsIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zLFxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuXG59IGZyb20gXCIuL1NwZWNIZWxwZXJzXCI7XG5pbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5kZXNjcmliZShcInRoaXMgd2lsbCB0ZXN0IHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBncm91cCBtYXRjaGVzOlwiLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBpdChcInRvdXJuYW1lbnQgc2hvdWxkIGNvbnRhaW4gZ3JvdXAxIEFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0uZ3JvdXBuYW1lKS50b0VxdWFsKFwiR3JvdXAgQVwiKTtcbiAgICB9KTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICBsZXQgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgbGV0IHRlYW1BID0gdG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbMF07XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMyBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5wb2ludHMpLnRvRXF1YWwoNCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQyBoYXMgMSBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1syXS5wb2ludHMpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gRCBoYXMgMiBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1szXS5wb2ludHMpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgc2NvcmVkIDMgZ29hbHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEuZ29hbHNTY29yZWQpLnRvQmUoNik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgY29uY2lldmVkIDQgZ29hbHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEuZ29hbHNDb25jaWV2ZWQpLnRvQmUoNCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMSBkcmF3ZWQgbWF0Y2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEubWF0Y2hlc0RyYXdlZCkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAxIHdvbiBtYXRjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5tYXRjaGVzV29uKS50b0JlKDEpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlKFwidGhpcyB3aWxsIHRlc3QgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGdyb3VwIG1hdGNoZXM6XCIsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIgIHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQSk7XG5cbiAgICBpdChcIlJ1c3NpYSBmaXJzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1swXS5uYW1lKS50b0VxdWFsKFwiUnVzc2lhXCIpO1xuICAgIH0pO1xuXG5cbiAgICBpdChcIkVneXB0IHNlY29uZCBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzFdLm5hbWUpLnRvRXF1YWwoXCJFZ3lwdFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiVXJ1Z3VheSBsYXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1syXS5uYW1lKS50b0VxdWFsKFwiVXJ1Z3VheVwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiU2F1ZGkgQXJhYmlhIHRoaXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1szXS5uYW1lKS50b0VxdWFsKFwiU2F1ZGkgQXJhYmlhXCIpO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKFwiZ3JvdXAgQTogXCIgKyBncm91cEEpO1xuICAgIHZhciBlcXVhbFRlYW1zID0gZ3JvdXBBLmdldEVxdWFsVGVhbXMoKTtcblxuICAgIGl0KFwiRWd5cHQgYW4gVXJ1Z3VheSBhcmUgY29uY2lkZXJlZCBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgIGV4cGVjdChlcXVhbFRlYW1zWzBdLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICBsZXQgZmlyc3QgPSBlcXVhbFRlYW1zWzBdWzBdLm5hbWUgPT0gXCJFZ3lwdFwiIHx8ICBlcXVhbFRlYW1zWzBdWzBdLm5hbWUgPT0gXCJVcnVndWF5XCI7XG4gICAgICAgbGV0IHNlY29uZCA9IGVxdWFsVGVhbXNbMF1bMV0ubmFtZSA9PSBcIkVneXB0XCIgfHwgIGVxdWFsVGVhbXNbMF1bMV0ubmFtZSA9PSBcIlVydWd1YXlcIjtcbiAgICAgICBleHBlY3QoZmlyc3QpLnRvQmVUcnV0aHkoKTtcbiAgICAgICBleHBlY3Qoc2Vjb25kKS50b0JlVHJ1dGh5KCk7XG5cbiAgICB9KTtcblxufSk7XG5cbmRlc2NyaWJlKFwid2Ugd2FudCB0byBiZSBhYmxlIHRvIHNlbGVjdCBhIHN1YnNldCBvZiBtYXRjaGVzXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgdmFyIHN1Yk1hdGNoZXMgPSAgZ2V0TWF0Y2hlc0Zyb21UZWFtcyhbZ3JvdXBBLnRlYW1zWzFdLGdyb3VwQS50ZWFtc1syXSxncm91cEEudGVhbXNbM11dLGdyb3VwQS5tYXRjaGVzKVxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMyBtYXRjaGVzIHRvIGJlIHNlbGVjdGVkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGV4cGVjdChzdWJNYXRjaGVzLmxlbmd0aCkudG9CZSgzKTtcbiAgICB9KTtcblxufSk7XG5cblxuZGVzY3JpYmUoXCJJZiAzIFRlYW1zIGFyZSBlcXVhbCB3ZSBuZWVkIG1ha2UgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlbVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBBKTtcblxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMyB0ZWFtcyB0byBiZSBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICBleHBlY3QoZ3JvdXBBLmdldEVxdWFsVGVhbXMoKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgICAgIGV4cGVjdChncm91cEEuZ2V0RXF1YWxUZWFtcygpWzBdLmxlbmd0aCkudG9CZSgzKTtcblxuICAgIH0pO1xuXG5cbiAgICBpdChcIlJ1c3NpYSBzaG91bGQgYmUgZmlyc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzBdLm5hbWUpLnRvQmUoXCJSdXNzaWFcIilcbiAgICB9KTtcblxuICAgIGl0KFwiU2F1ZGkgQXJhYmlhIHNob3VsZCBiZSBzZWNvbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzFdLm5hbWUpLnRvQmUoXCJTYXVkaSBBcmFiaWFcIilcbiAgICB9KVxuICAgIGl0KFwiVXJ1Z3VheSBzaG91bGQgYmUgdGhpcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzJdLm5hbWUpLnRvQmUoXCJVcnVndWF5XCIpXG4gICAgfSlcbiAgICBpdChcIkVneXB0IHNob3VsZCBiZSBsYXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1szXS5uYW1lKS50b0JlKFwiRWd5cHRcIilcbiAgICB9KVxuXG5cblxufSk7XG5cbmRlc2NyaWJlKFwiSWYgMiBvbiAyIFRlYW1zIGFyZSBlcXVhbCB3ZSBuZWVkIG1ha2UgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlbVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuICAgIGdyb3VwQi5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBCLCB0cnVlKTtcblxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMiB0ZWFtcyB0byBiZSBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpWzBdLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKClbMV0ubGVuZ3RoKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L2luZGV4LnNwZWMudHMiLCJpbXBvcnQgeyBLbm9ja291dE1hdGNoIH0gZnJvbSAnLi8uLi9tb2RlbHMvcHJvbm9zdGllay9NYXRjaCc7XG5pbXBvcnQge1Byb25vc3RpZWt9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Qcm9ub3N0aWVrXCI7XG5pbXBvcnQge1RlYW19IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9UZWFtXCI7XG5pbXBvcnQge0dyb3VwfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvR3JvdXBcIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9NYXRjaFwiO1xuaW1wb3J0IHtIT01FX1RFQU1fV0lOUywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL21vZGVscy9Db25zdGFudHNcIjtcbmltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcbmltcG9ydCB7S25vY2tPdXRSb3VuZH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdXJuYW1lbnQoKSA6IFRvdXJuYW1lbnQge1xuXG4gICAgY29uc29sZS5sb2coXCIqKioqKiBQcm9ub3N0aWVrIGdlbmVyYXRpb24gU3RhcnRpbmcgKioqKlwiKTtcblxuICAgIGxldCB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IG5ldyBUb3VybmFtZW50KCk7XG5cbiAgICBsZXQgYWxsVGVhbXMgPSAgW1xuICAgICAgICBbXCJSdXNzaWFcIiwgXCJTYXVkaSBBcmFiaWFcIiwgXCJFZ3lwdFwiLCBcIlVydWd1YXlcIl0sXG4gICAgICAgIFtcIlBvcnR1Z2FsXCIsIFwiU3BhaW5cIiwgXCJNb3JvY2NvXCIsIFwiSXJhblwiXSxcbiAgICAgICAgW1wiRnJhbmNlXCIsIFwiQXVzdHJhbGlhXCIsIFwiUGVydVwiLCBcIkRlbm1hcmtcIl0sXG4gICAgICAgIFtcIkFyZ2VudGluYVwiLCBcIkljZWxhbmRcIiwgXCJDcm9hdGlhXCIsIFwiTmlnZXJpYVwiXSxcbiAgICAgICAgW1wiQnJhemlsXCIsIFwiU3dpdHplcmxhbmRcIiwgXCJDb3N0YSBSaWNhXCIsIFwiU2VyYmlhXCJdLFxuICAgICAgICBbXCJHZXJtYW55XCIsIFwiTWV4aWNvXCIsIFwiU3dlZGVuXCIsIFwiS29yZWEgUmVwdWJsaWNcIl0sXG4gICAgICAgIFtcIkJlbGdpdW1cIiwgXCJQYW5hbWFcIiwgXCJUdW5pc2lhXCIsIFwiRW5nbGFuZFwiXSxcbiAgICAgICAgW1wiUG9sYW5kXCIsIFwiU2VuZWdhbFwiLCBcIkNvbG9tYmlhXCIsIFwiSmFwYW5cIl0sXG4gICAgXTtcblxuICAgIGxldCBncm91cExldHRlciA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCJdO1xuXG4gICAgYWxsVGVhbXMuZm9yRWFjaCggKGdyb3VwVGVhbXNOYW1lcyxpbmRleCkgPT4ge1xuICAgICAgICBsZXQgdGVhbXM6IFRlYW1bXSA9IFtdO1xuICAgICAgICBncm91cFRlYW1zTmFtZXMuZm9yRWFjaCh0ZWFtTmFtZSA9PiB7XG4gICAgICAgICAgICB0ZWFtcy5wdXNoKG5ldyBUZWFtKHRlYW1OYW1lKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAgKFwiR3JvZXAgXCIgKyBncm91cExldHRlcltpbmRleF0sIHRlYW1zKTtcbiAgICAgICAgdG91cm5hbWVudC5ncm91cHMucHVzaChncm91cCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcm91bmRzPVtcbiAgICAgICAge25hbWU6XCJSb3VuZCBvZiAxNlwiLG51bWJlck9mTWF0Y2hlczo4fSxcbiAgICAgICAge25hbWU6XCJRdWFydGVyIEZpbmFsXCIsbnVtYmVyT2ZNYXRjaGVzOjR9LFxuICAgICAgICB7bmFtZTpcIlNlbWkgRmluYWxcIixudW1iZXJPZk1hdGNoZXM6Mn0sXG4gICAgICAgIHtuYW1lOlwiRmluYWxcIixudW1iZXJPZk1hdGNoZXM6MX1cbiAgICAgICAgXTtcblxuICAgIHJvdW5kcy5mb3JFYWNoKChyb3VuZERhdGEpID0+IHtcbiAgICAgICAgbGV0IGtub2NrT3V0Um91bmQgPSBuZXcgS25vY2tPdXRSb3VuZChyb3VuZERhdGEubmFtZSwgcm91bmREYXRhLm51bWJlck9mTWF0Y2hlcyk7XG4gICAgICAgIHRvdXJuYW1lbnQucm91bmRzLnB1c2goa25vY2tPdXRSb3VuZCk7XG4gICAgfSk7XG5cblxuICAgIC8vIEZPUiBERVYgUFVSUE9TRVM6XG4gICAgdG91cm5hbWVudC5ncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgZ3JvdXAubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCxpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoaW5kZXggPCA1KXtcbiAgICAgICAgICAgICAgICBtYXRjaC5ob21lVGVhbVNjb3JlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjUpO1xuICAgICAgICAgICAgICAgIG1hdGNoLm91dFRlYW1TY29yZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSo1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGdyb3VwLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgfSk7XG4gICAgLy8gRU5EXG4gICAgXG4gICAgcmV0dXJuIHRvdXJuYW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVGVhbXModGVhbWE6IFRlYW0sIHRlYW1iIDogVGVhbSkgOiBudW1iZXIge1xuXG4gICAgaWYodGVhbWEucG9pbnRzICE9IHRlYW1iLnBvaW50cyl7XG4gICAgICAgIC8vY29tcGFyZSBvbiBwb2ludHM6XG4gICAgICAgIHJldHVybiB0ZWFtYi5wb2ludHMgLSB0ZWFtYS5wb2ludHM7XG4gICAgfSBlbHNlIGlmKHRlYW1hLmdldEdvYWxzRGlmZmVyZW5jZSgpICE9IHRlYW1iLmdldEdvYWxzRGlmZmVyZW5jZSgpKXtcbiAgICAgICAgLy9jb21wYXJlIG9uIGdvYWwgZGlmZjpcbiAgICAgICAgcmV0dXJuIHRlYW1iLmdldEdvYWxzRGlmZmVyZW5jZSgpIC10ZWFtYS5nZXRHb2Fsc0RpZmZlcmVuY2UoKTtcbiAgICB9IGVsc2UgaWYodGVhbWEuZ29hbHNTY29yZWQgIT0gdGVhbWIuZ29hbHNTY29yZWQpe1xuICAgICAgICAvLyBvbiBnb2FscyBzY29yZWQ6XG4gICAgICAgIHJldHVybiB0ZWFtYi5nb2Fsc1Njb3JlZCAtIHRlYW1hLmdvYWxzU2NvcmVkO1xuICAgIH1cbiAgICByZXR1cm4gMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyA6IFRlYW1bXSwgYWxsTWF0Y2hlcyA6IE1hdGNoW10pIDogTWF0Y2hbXSB7XG4gICAgdmFyIHRlYW1OYW1lcyAgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgIHRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICB0ZWFtTmFtZXMucHVzaCh0ZWFtLm5hbWUpO1xuICAgIH0pO1xuXG4gICAgdmFyIHJldHVyblZhbCA6IE1hdGNoIFtdID0gbmV3IEFycmF5PE1hdGNoPigpO1xuICAgIGFsbE1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICBpZih0ZWFtTmFtZXMuaW5kZXhPZihtYXRjaC5ob21lVGVhbU5hbWUpICE9IC0xICYmIHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLm91dFRlYW1OYW1lKSAhPSAtMSl7XG4gICAgICAgICAgICAgcmV0dXJuVmFsLnB1c2goT2JqZWN0LmNyZWF0ZShtYXRjaCkpO1xuICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5WYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWJHcm91cCh0ZWFtcyA6IFRlYW1bXSwgb3JpZ2luYWxHcm91cCA6IEdyb3VwKSA6ICBHcm91cCB7XG4gICAgIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xuICAgICBncm91cC50ZWFtcyA9IFtdXG4gICAgZm9yKHZhciB0IG9mIHRlYW1zKSB7XG4gICAgICAgICBncm91cC50ZWFtcy5wdXNoKE9iamVjdC5jcmVhdGUodCkpO1xuICAgIH1cbiAgICAvLyBncm91cC50ZWFtcyA9IHRlYW1zLnNsaWNlKCk7XG4gICAgIGdyb3VwLm1hdGNoZXMgPSBnZXRNYXRjaGVzRnJvbVRlYW1zKHRlYW1zLG9yaWdpbmFsR3JvdXAubWF0Y2hlcyApO1xuICAgICBmb3IodmFyIHQgb2YgZ3JvdXAudGVhbXMpe1xuICAgICAgICAgdC5yZXNldCgpO1xuICAgICB9XG4gICAgIHJldHVybiBncm91cDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJUZWFtcyhncm91cCA6IEdyb3VwLCBjb21wbGV0ZT8gOiBib29sZWFuKSA6IHZvaWQge1xuICAgIC8vcmVzZXQgc29tZSBzdHVmZjpcbiAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IGZhbHNlO1xuICAgIGdyb3VwLmVxdWFsVGVhbXMgPSBuZXcgQXJyYXk8VGVhbVtdPigpO1xuICAgIGdyb3VwLnRlYW1zLnNvcnQoICh0ZWFtYSwgdGVhbWIpID0+IHtcbiAgICAgICAgdmFyIF8gPSAgY29tcGFyZVRlYW1zKHRlYW1hLCB0ZWFtYik7XG4gICAgICAgIGlmKCBfID09IDApe1xuICAgICAgICAgICAgLy8gdGhpcyBtZWFucyB0ZWFtIGEgYW5kIHRlYW0gYiBhcmUgY29uY2lkZXJlZCBlcXVhbDpcbiAgICAgICAgICAgIGdyb3VwLmFkZFRvRXF1YWxUZWFtcyhbdGVhbWEsIHRlYW1iXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG5cbiAgICAvL0lGIG5vdCBhbGwgbWF0Y2hlcyBhcmUgcGxheWVkLCB3ZSBjYW4gc2tpcHAgdGhlIHJlc3RcbiAgICBpZighZ3JvdXAuYWxsTWF0Y2hlc1BsYXllZCl7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9jaGVjayBpZiB0aGVyZSBhcmUgZXF1YWx0ZWFtcywgYW5kIGRvIHdoYXRzIG5lZWRlZDpcbiAgICBpZihncm91cC5lcXVhbFRlYW1zLmxlbmd0aCA+IDApe1xuICAgICAgICBpZihncm91cC5lcXVhbFRlYW1zWzBdLmxlbmd0aCA9PSBncm91cC50ZWFtcy5sZW5ndGgpe1xuICAgICAgICAgICAgLy90aGlzIG1lYW5zIGFsbCAgb2YgdGhlIHRlYW1zIHdlcmUgZXF1YWwsIHNvIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbzpcbiAgICAgICAgICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vd2UgbmVlZCB0byBtYWtlIGEgc3ViZ3JvdXAgYW5kIGRvIHRoZSBvcmRlcmluZyBhZ2FpbjpcbiAgICAgICAgICAgIGZvciAoIHZhciBlcXVhbFRlYW1zU3ViR3JvdXAgb2YgZ3JvdXAuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgaWYoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICAgICAvKiBjb25zb2xlLmxvZyhcIkJlZm9yZSBcIik7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB2YXIgc3ViZ3JvdXAgPSBnZXRTdWJHcm91cChlcXVhbFRlYW1zU3ViR3JvdXAsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBzdWJncm91cC5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgICAgICAgICAgICAgLy93YXRjaCBvdXQgaGVyZSBmb3IgaW5maW5pdGUgbG9vcHMhISFcbiAgICAgICAgICAgICAgICAvKmlmIChjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJUZWFtcyhzdWJncm91cCxmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICBpZighZ3JvdXAuZ3JvdXBOZWVkc0RyYXcpe1xuICAgICAgICAgICAgICAgICAgICBvcmRlclRlYW1zKHN1Ymdyb3VwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc3ViZ3JvdXAuZ3JvdXBOZWVkc0RyYXcpe1xuICAgICAgICAgICAgICAgICAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9ICB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vYWZ0ZXIgdGhpcyBzdWJncm91cHMgaGF2ZSBiZWVuIG9yZGVyZWQsIHNvIG5vdyB3ZSBvcmRlciB0aGVtIGluXG4gICAgICAgICAgICAgICAgLy9zdWJncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgICAgICBvcmRlckFjY29yZGluZ1RvU3ViR3JvdXBzKGdyb3VwLCBzdWJncm91cCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSl7XG4gICAgICAgLyogY29uc29sZS5sb2coXCJGaW5hbCBwcmludFwiKTtcbiAgICAgICAgZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgIGdyb3VwLnByaW50R3JvdXBNYXRjaGVzKCkqL1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBvcmRlckFjY29yZGluZ1RvU3ViR3JvdXBzKGdyb3VwOiBHcm91cCwgc3ViR3JvdXAgOiBHcm91cCl7XG5cblxuICAgIC8vZmluZCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHRlYW06XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IodmFyIHRlYW0gb2YgZ3JvdXAudGVhbXMpe1xuICAgICAgICBpZihzdWJHcm91cC5jb250YWluc1RlYW1XaXRoTmFtZSh0ZWFtLm5hbWUpKXtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4KytcbiAgICB9XG5cbiAgICAvL2dldCBjb3BpZXMgb2YgdGhlIHRlYW1zXG4gICAgdmFyIHRlYW1zVG9BZGQgPSBnZXRTdWJHcm91cEZyb21PcmlnaW5hbEdyb3VwKGdyb3VwLHN1Ykdyb3VwKTtcblxuICAgIC8vdGhlIGZpcnN0IHRlYW0gaXMgaW4gcG9zaXRpb24gaW5kZXggaW4gdGhlIG9yaWdpbmFsIGdyb3VwXG4gICAgLy9zbyBub3cgc3RhcnQgcmVwbGFjaW5nIGZyb20gdGhlcmU6XG4gICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZC50ZWFtcyl7XG4gICAgICAgIGdyb3VwLnRlYW1zLnNwbGljZShpbmRleCwgMSwgdGVhbVRvQWRkKTtcbiAgICAgICAgaW5kZXgrK1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRTdWJHcm91cEZyb21PcmlnaW5hbEdyb3VwIChvcmlnaW5hbEdyb3VwICA6IEdyb3VwLCBzdWJHcm91cCA6IEdyb3VwICkgOiAgR3JvdXB7XG4gICAgdmFyIHJldHVyblZhbCA6IEdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgcmV0dXJuVmFsLnRlYW1zID0gW107XG4gICAgZm9yICh2YXIgc3ViR3JvdXBUZWFtICBvZiBzdWJHcm91cC50ZWFtcyl7XG4gICAgICAgIHZhciB0ZWFtVG9BZGQgPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbEdyb3VwLmdldFRlYW0oKHN1Ykdyb3VwVGVhbS5uYW1lKSkpO1xuICAgICAgICAvL3ZhciB0ZWFtVG9BZGQgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsR3JvdXAuZ2V0VGVhbShzdWJHcm91cFRlYW0ubmFtZSkpO1xuICAgICAgICByZXR1cm5WYWwudGVhbXMucHVzaCh0ZWFtVG9BZGQpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsO1xuXG59XG5cblxuLyogXG5XaW5uZXIgQSB2LiBSdW5uZXItdXAgQiA9IDEgLSAwXG5XaW5uZXIgQiB2LiBSdW5uZXItdXAgQSA9IDIgLSAxXG5XaW5uZXIgQyB2LiBSdW5uZXItdXAgRCA9IDMgXG5XaW5uZXIgRCB2LiBSdW5uZXItdXAgQyA9IDRcbldpbm5lciBFIHYuIFJ1bm5lci11cCBGID0gNVxuV2lubmVyIEYgdi4gUnVubmVyLXVwIEUgPSA2XG5XaW5uZXIgRyB2LiBSdW5uZXItdXAgSCA9IDdcbldpbm5lciBIIHYuIFJ1bm5lci11cCBHID0gOCBcbiovXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9OZXh0Um91bmQodG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIHtcbiAgICBcbiAgICBjb25zdCBhY2hzdGVGaW5hbGVzID0gIHRvdXJuYW1lbnQucm91bmRzWzBdO1xuXG4gICAgdG91cm5hbWVudC5ncm91cHMuZm9yRWFjaCgoZ3JvdXAsIGdyb3VwSW5kZXgpID0+IHtcblxuICAgICAgICBpZihncm91cC5hbGxNYXRjaGVzUGxheWVkKXtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwV2lubmVyID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMF07XG4gICAgICAgICAgICBjb25zdCBncm91cFJ1bm5lclVwID0gdG91cm5hbWVudC5ncm91cHNbZ3JvdXBJbmRleF0udGVhbXNbMV07XG4gICAgICAgIFxuICAgICAgICAgICAgaWYoZ3JvdXBJbmRleCUyID09IDApe1xuICAgICAgICAgICAgICAgIC8vZXZlbiBpbmRleCBzbyBncm91cCB3aW5uZXIgaW4gaG9tZSBpbmRleCwgcnVubmVydXAgaW4gb3V0IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICBhY2hzdGVGaW5hbGVzLm1hdGNoZXNbZ3JvdXBJbmRleF0uaG9tZVRlYW1OYW1lID0gZ3JvdXBXaW5uZXIubmFtZTtcbiAgICAgICAgICAgICAgICBhY2hzdGVGaW5hbGVzLm1hdGNoZXNbZ3JvdXBJbmRleCsxXS5vdXRUZWFtTmFtZSA9IGdyb3VwUnVubmVyVXAubmFtZTtcbiAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vb2RkIGluZGV4IHNvIGdyb3VwIHdpbm5lciBpbiBvdXQgaW5kZXgrMSwgcnVubmVydXAgaW4gaG9tZSBpbmRleDtcbiAgICAgICAgICAgICAgICBhY2hzdGVGaW5hbGVzLm1hdGNoZXNbZ3JvdXBJbmRleF0uaG9tZVRlYW1OYW1lID0gZ3JvdXBXaW5uZXIubmFtZTtcbiAgICAgICAgICAgICAgICBhY2hzdGVGaW5hbGVzLm1hdGNoZXNbZ3JvdXBJbmRleC0xXS5vdXRUZWFtTmFtZSA9IGdyb3VwUnVubmVyVXAubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuICBcblxuXG5cbi8vICoqKiBGcm9udGVuZCBIZWxwZXIgbWV0aG9kczogKioqIC8vXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUJhc2VkT25OYW1lKG5ld0dyb3VwIDogR3JvdXAsIGdyb3VwcyA6R3JvdXBbXSkgOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSBmaW5kSW5kZXhPZkdyb3VwQmFzZWRPbk5hbWUobmV3R3JvdXAsIGdyb3Vwcyk7XG4gICAgZ3JvdXBzW2luZGV4XSA9IG5ld0dyb3VwO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5kZXhPZkdyb3VwQmFzZWRPbk5hbWUoZ3JvdXBUb0ZpbmQ6R3JvdXAgLCBncm91cHMgOiBHcm91cFtdKSA6IGFueSB7XG5cbiAgICBmb3IobGV0IGkgaW4gZ3JvdXBzKXtcbiAgICAgICAgaWYoZ3JvdXBzW2ldLmdyb3VwbmFtZSA9PSBncm91cFRvRmluZC5ncm91cG5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyAqKiogRU5EICoqKiAvL1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJpbXBvcnQge1RlYW19IGZyb20gXCIuL1RlYW1cIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCAgY2xhc3MgR3JvdXAge1xuXG4gICAgZ3JvdXBuYW1lIDogc3RyaW5nO1xuICAgIHRlYW1zIDogVGVhbVtdO1xuICAgIG1hdGNoZXMgOiBNYXRjaFtdO1xuICAgIGFsbE1hdGNoZXNQbGF5ZWQgOiBib29sZWFuID0gZmFsc2U7XG4gICAgIGdyb3VwTmVlZHNEcmF3IDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBlcXVhbFRlYW1zIDogVGVhbVtdW107XG5cbiAgICBjb25zdHJ1Y3Rvcihncm91cG5hbWU/OnN0cmluZywgdGVhbXM/OiBUZWFtW10pe1xuICAgICAgICB0aGlzLmdyb3VwbmFtZSA9Z3JvdXBuYW1lO1xuICAgICAgICB0aGlzLnRlYW1zID0gdGVhbXM7XG4gICAgICAgIGlmKHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgdGhpcy5pbml0TWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TWF0Y2hlcygpIDogIHZvaWR7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLm5hbWUsIHRoaXMudGVhbXNbMV0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1syXS5uYW1lLCB0aGlzLnRlYW1zWzNdLm5hbWUpKTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXS5uYW1lLCB0aGlzLnRlYW1zWzJdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1sxXS5uYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1swXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzFdLm5hbWUsIHRoaXMudGVhbXNbMl0ubmFtZSkpO1xuICAgIH1cblxuICAgIHByb2Nlc3NNYXRjaGVzKCkgOiB2b2lke1xuXG4gICAgICAgIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgIHRlYW0ucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWVhbnMgbWF0Y2ggaXMgcGxheWVkLCBzbyBsZXQgZG8gd2hhdCB3ZSBuZWVkIHRvIGRvOlxuICAgICAgICAgICAgICAgIGxldCBtYXRjaE91dENvbWUgPSBtYXRjaC5nZXRPdXRDb21lKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gdGhpcy5nZXRUZWFtKG1hdGNoLmhvbWVUZWFtTmFtZSk7XG4gICAgICAgICAgICAgICAgbGV0IG91dFRlYW0gPSB0aGlzLmdldFRlYW0obWF0Y2gub3V0VGVhbU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hPdXRDb21lID09IE9VVF9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSk9PntcbiAgICAgICAgICAgIHRlYW0ucG9pbnRzID0gdGVhbS5tYXRjaGVzV29uKjMgKyB0ZWFtLm1hdGNoZXNEcmF3ZWQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICAvL3RoaXMgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0ZWFtbmFtZSBwYXNzZWQgdG8gdGhlIG1ldGhvZDpcbiAgICBnZXRUZWFtKG5hbWU6c3RyaW5nKSA6IFRlYW17XG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaW50R3JvdXBTdGFuZGluZygpIHtcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0ZWFtLm5hbWV9ICB3OiR7dGVhbS5tYXRjaGVzV29ufSAgZDoke3RlYW0ubWF0Y2hlc0RyYXdlZH0gbDoke3RlYW0ubWF0Y2hlc0xvc3R9IHM6JHt0ZWFtLmdvYWxzU2NvcmVkfSBjOiR7dGVhbS5nb2Fsc0NvbmNpZXZlZH0gUDoke3RlYW0ucG9pbnRzfWApXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBwbGF5ZWQ6IFwiICsgdGhpcy5hbGxNYXRjaGVzUGxheWVkKTtcbiAgICB9XG5cbiAgICBwcmludEdyb3VwTWF0Y2hlcygpe1xuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke21hdGNoLmhvbWVUZWFtTmFtZX0gLSAke21hdGNoLm91dFRlYW1OYW1lfSA6ICR7bWF0Y2guaG9tZVRlYW1TY29yZX0gLSAke21hdGNoLm91dFRlYW1TY29yZX1gKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRFcXVhbFRlYW1zKCkgOiBUZWFtW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsVGVhbXMgO1xuICAgIH1cblxuICAgIGdldEFsbE1hdGNoZXNQbGF5ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxNYXRjaGVzUGxheWVkO1xuICAgIH1cblxuXG4gICAgYWRkVG9FcXVhbFRlYW1zKHRlYW1zVG9BZGQgOiBUZWFtW10pIDogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvLyBmaXJzdCwganVzdCBhZGQgaXQ6XG4gICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIGFkZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGNoZWNrIGlzIG9uZSBvZiB0aGUgMiB0ZWFtcyBhbHJlYWR5IGlzIGluIG9uIG9mIHRoZSBhcnJheXMgdGhhdCB3YXMgYWxyZWFkeSBhZGRlZDpcbiAgICAgICAgICAgIGZvcih2YXIgYWxyZWFkeUFkZGVkVGVhbXMgb2YgdGhpcy5lcXVhbFRlYW1zKXtcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGl0IGNvbnRhaW5zIG9uZSBvZiB0aGVtOlxuICAgICAgICAgICAgICAgIHZhciBpbmRleE9mRXhpc3RpbmdUZWFtID0gMDtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHRlYW1Ub0FkZCBvZiB0ZWFtc1RvQWRkKXtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBpdCBhbHJlYWR5IGluIHRoZXJlLCBqdXN0IGFkZCB0aGUgb3RoZXIgb25lIGFzIHdlbGwgYW5kIHdlIGFyZSBkb25lOlxuICAgICAgICAgICAgICAgICAgICBpZihhbHJlYWR5QWRkZWRUZWFtcy5sYXN0SW5kZXhPZih0ZWFtVG9BZGQpICE9IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2ZFeGlzdGluZ1RlYW0rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIDIsIHRoaXMgbWVhbnMgd2UgZGlkIG5vdCBmaW5kIHRoZSB0ZWFtIGluIGFscmVhZHlBZGRlZFRlYW1zXG4gICAgICAgICAgICAgICAgaWYoaW5kZXhPZkV4aXN0aW5nVGVhbSAhPSAyKXtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBpcyAwIG9yIDEsIHdlIGZvdW5kIGlzLCBzbyB3ZSBuZWVkIHRvIGFkZCB0aGUgb3RoZXIgdGVhbS5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4T2ZUZWFtVG9BZGQgPSBpbmRleE9mRXhpc3RpbmdUZWFtID09IDEgPyAwIDogMTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleE9mVGVhbVRvQWRkKTtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeUFkZGVkVGVhbXMucHVzaCh0ZWFtc1RvQWRkW2luZGV4T2ZUZWFtVG9BZGRdKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFkZGVkKXtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIG1lYW4gdGVhbXMgYXJlIGVxdWFsIDIgb24gMlxuICAgICAgICAgICAgICAgIHRoaXMuZXF1YWxUZWFtcy5wdXNoKHRlYW1zVG9BZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHB1cmVseSBmb3IgaGVscGluZyBtZXRob2Q6XG4gICAgICovXG4gICAgIGNvbnRhaW5zVGVhbVdpdGhOYW1lKG5hbWU6U3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICBmb3IodmFyIHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBHcm91cCB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IG5ldyBHcm91cCgpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihncm91cCwgaW5wdXQpO1xuXG4gICAgICAgICAgICBsZXQgbmV3VGVhbXM6IFRlYW1bXSA9IFtdO1xuICAgICAgICAgICAgZ3JvdXAudGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgbmV3VGVhbXMucHVzaChUZWFtLmRlc2VyaWFsaXplKHRlYW0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXAudGVhbXMgPSBuZXdUZWFtcztcblxuICAgICAgICAgICAgbGV0IG5ld01hdGNoZXM6IE1hdGNoW10gPSBbXTtcbiAgICAgICAgICAgIGdyb3VwLm1hdGNoZXMuZm9yRWFjaChtYXRjaCAgPT4ge1xuICAgICAgICAgICAgICAgIG5ld01hdGNoZXMucHVzaChNYXRjaC5kZXNlcmlhbGl6ZShtYXRjaCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBncm91cC5tYXRjaGVzID0gbmV3TWF0Y2hlcztcbiAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cblxufVxuXG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvR3JvdXAudHMiLCJpbXBvcnQge0dyb3VwfSBmcm9tIFwiLi9Hcm91cFwiO1xuaW1wb3J0IHtLbm9ja091dFJvdW5kfSBmcm9tIFwiLi9Lbm9ja091dFJvdW5kXCI7XG5cbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50e1xuXG4gICAgZ3JvdXBzIDogR3JvdXBbXSA9ICBbXTtcbiAgICByb3VuZHMgOiAgS25vY2tPdXRSb3VuZFtdID0gW107XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnQudHMiLCJpbXBvcnQge0tub2Nrb3V0TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5cbmV4cG9ydCBjbGFzcyBLbm9ja091dFJvdW5kIHtcblxuICAgIG5hbWU6IHN0cmluZztcbiAgICBtYXRjaGVzOiBLbm9ja291dE1hdGNoW107XG4gICAgbnVtYmVyT2ZQbGFjZXM6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbnVtYmVyT2ZNYXRjaGVzIDogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5uYW1lID0gIG5hbWU7XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZNYXRjaGVzOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IEtub2Nrb3V0TWF0Y2godW5kZWZpbmVkLCB1bmRlZmluZWQpKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvS25vY2tPdXRSb3VuZC50cyIsImltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQ6IFRvdXJuYW1lbnQpIDp2b2lkIHtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLm91dFRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1sxXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAwO1xuXG5cbiAgICBncm91cEEubWF0Y2hlc1syXS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzJdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbM10ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1szXS5ob21lVGVhbVNjb3JlID0gMztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3JlMkZ1bGx5RXF1YWxUZWFtcyh0b3VybmFtZW50IDogVG91cm5hbWVudCkgOnZvaWR7XG4gICAgc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG5cbiAgICBncm91cEEubWF0Y2hlc1s0XS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMztcblxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyh0b3VybmFtZW50IDogVG91cm5hbWVudCkgOiB2b2lkIHtcbiAgICAvL3NldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gNDtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEEubWF0Y2hlc1syXS5vdXRUZWFtU2NvcmUgPSAxO1xuICAgIGdyb3VwQS5tYXRjaGVzWzJdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbM10ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1szXS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDQ7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEEubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3JlMm9uMkVxdWFsVGVhbXNXaXRoRGlmZmVyZW5jZUJldHdlZW4odG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDogdm9pZCB7XG4gICAgLy9zZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEIgPSB0b3VybmFtZW50Lmdyb3Vwc1sxXTtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSAxO1xuICAgIGdyb3VwQi5tYXRjaGVzWzBdLm91dFRlYW1TY29yZSA9IDQ7XG5cbiAgICBncm91cEIubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMztcbiAgICBncm91cEIubWF0Y2hlc1sxXS5vdXRUZWFtU2NvcmUgPSAwO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDQ7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQi5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEIubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMDtcbiAgICBncm91cEIubWF0Y2hlc1s0XS5vdXRUZWFtU2NvcmUgPSAyO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDI7XG4gICAgZ3JvdXBCLm1hdGNoZXNbNV0ub3V0VGVhbVNjb3JlID0gMDtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Rlc3QvU3BlY0hlbHBlcnMudHMiXSwic291cmNlUm9vdCI6IiJ9