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
        this.points = 0;
        this.matchesDrawed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
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
        var _ = compareTeams(teama, teamb);
        if (_ == 0) {
            // this means team a and team b are concidered equal:
            group.addToEqualTeams([teama, teamb]);
            //console.log(this.equalTeams);
        }
        return _;
    });
    //TODO:
    //may here check if all matches are played ??
    if (!group.allMatchesPlayed) {
        return;
    }
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
                    /* console.log("Before ");
                     group.printGroupStanding();
                     group.printGroupMatches()*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDgzMjU3NDViZWYxOGM4MmU1NzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVGVhbS50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2luZGV4LnNwZWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL01hdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEYSxzQkFBYyxHQUFhLENBQUMsQ0FBQztBQUM3QixxQkFBYSxHQUFhLENBQUMsQ0FBQztBQUM1QixxQkFBYSxHQUFZLENBQUMsQ0FBQztBQUUzQixtQkFBVyxHQUFZ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O0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUV2QyxDQUFDO0FBdEJELHNIQXNCQyIsImZpbGUiOiJBcHBTcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDgzMjU3NDViZWYxOGM4MmU1NzYiLCJleHBvcnQgY29uc3QgSE9NRV9URUFNX1dJTlMgOiBudW1iZXIgPSAgMTtcbmV4cG9ydCBjb25zdCBPVVRfVEVBTV9XSU5TIDogbnVtYmVyID0gIDI7XG5leHBvcnQgY29uc3QgTUFUQ0hfSVNfRFJBVyA6IG51bWJlcj0gIDA7XG5cbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA6IHN0cmluZyA9IFwial91aWRcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL0NvbnN0YW50cy50cyIsImltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUZWFtIHtcblxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcG9pbnRzOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzV29uOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzTG9zdDogbnVtYmVyID0gMDtcbiAgICBtYXRjaGVzRHJhd2VkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzU2NvcmVkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzQ29uY2lldmVkOiBudW1iZXIgPSAwO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgIH1cblxuXG5cbiAgICByZXNldCgpIDp2b2lkIHtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IDA7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzRHJhd2VkID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzTG9zdCA9IDA7XG5cbiAgICAgICAgdGhpcy5nb2Fsc1Njb3JlZCA9IDA7XG4gICAgICAgIHRoaXMuZ29hbHNDb25jaWV2ZWQgPSAwO1xuICAgIH1cblxuICAgIGdldEdvYWxzRGlmZmVyZW5jZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbHNTY29yZWQgLSB0aGlzLmdvYWxzQ29uY2lldmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IFRlYW0ge1xuICAgICAgICBjb25zdCBuYW1lID0gaW5wdXQubmFtZTtcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBUZWFtKG5hbWUpO1xuICAgICAgICAvKk9iamVjdC5hc3NpZ24oVGVhbSwgaW5wdXQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZWFtKTsqL1xuICAgICAgICB0ZWFtLnBvaW50cyA9ICBOdW1iZXIoaW5wdXQucG9pbnRzKTtcbiAgICAgICAgdGVhbS5tYXRjaGVzV29uID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNXb24pO1xuICAgICAgICB0ZWFtLm1hdGNoZXNMb3N0ID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNMb3N0KTtcbiAgICAgICAgdGVhbS5tYXRjaGVzRHJhd2VkID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNEcmF3ZWQpO1xuICAgICAgICB0ZWFtLmdvYWxzU2NvcmVkID0gTnVtYmVyKGlucHV0LmdvYWxzU2NvcmVkKTtcbiAgICAgICAgdGVhbS5nb2Fsc0NvbmNpZXZlZCA9IE51bWJlcihpbnB1dC5nb2Fsc0NvbmNpZXZlZCk7XG4gICAgICAgIHJldHVybiB0ZWFtO1xuXG4gICAgfVxuXG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RlYW0udHMiLCJcbmltcG9ydCB7Z2V0TWF0Y2hlc0Zyb21UZWFtcywgZ2V0VG91cm5hbWVudCwgb3JkZXJUZWFtc30gZnJvbSBcIi4uL3NyYy9zaGFyZWQvdXRpbHMvVG91cm5hbWVudFV0aWxzXCI7XG5pbXBvcnQge1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXMsIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXMsIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zLFxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuXG59IGZyb20gXCIuL1NwZWNIZWxwZXJzXCI7XG5pbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5kZXNjcmliZShcInRoaXMgd2lsbCB0ZXN0IHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBncm91cCBtYXRjaGVzOlwiLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBpdChcInRvdXJuYW1lbnQgc2hvdWxkIGNvbnRhaW4gZ3JvdXAxIEFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0uZ3JvdXBuYW1lKS50b0VxdWFsKFwiR3JvdXAgQVwiKTtcbiAgICB9KTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICBsZXQgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgbGV0IHRlYW1BID0gdG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbMF07XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMyBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5wb2ludHMpLnRvRXF1YWwoNCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQyBoYXMgMSBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1syXS5wb2ludHMpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gRCBoYXMgMiBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1szXS5wb2ludHMpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgc2NvcmVkIDMgZ29hbHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEuZ29hbHNTY29yZWQpLnRvQmUoNik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgY29uY2lldmVkIDQgZ29hbHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEuZ29hbHNDb25jaWV2ZWQpLnRvQmUoNCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMSBkcmF3ZWQgbWF0Y2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEubWF0Y2hlc0RyYXdlZCkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAxIHdvbiBtYXRjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5tYXRjaGVzV29uKS50b0JlKDEpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlKFwidGhpcyB3aWxsIHRlc3QgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGdyb3VwIG1hdGNoZXM6XCIsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIgIHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQSk7XG5cbiAgICBpdChcIlJ1c3NpYSBmaXJzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1swXS5uYW1lKS50b0VxdWFsKFwiUnVzc2lhXCIpO1xuICAgIH0pO1xuXG5cbiAgICBpdChcIkVneXB0IHNlY29uZCBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzFdLm5hbWUpLnRvRXF1YWwoXCJFZ3lwdFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiVXJ1Z3VheSBsYXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1syXS5uYW1lKS50b0VxdWFsKFwiVXJ1Z3VheVwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiU2F1ZGkgQXJhYmlhIHRoaXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1szXS5uYW1lKS50b0VxdWFsKFwiU2F1ZGkgQXJhYmlhXCIpO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKFwiZ3JvdXAgQTogXCIgKyBncm91cEEpO1xuICAgIHZhciBlcXVhbFRlYW1zID0gZ3JvdXBBLmdldEVxdWFsVGVhbXMoKTtcblxuICAgIGl0KFwiRWd5cHQgYW4gVXJ1Z3VheSBhcmUgY29uY2lkZXJlZCBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgIGV4cGVjdChlcXVhbFRlYW1zWzBdLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICBsZXQgZmlyc3QgPSBlcXVhbFRlYW1zWzBdWzBdLm5hbWUgPT0gXCJFZ3lwdFwiIHx8ICBlcXVhbFRlYW1zWzBdWzBdLm5hbWUgPT0gXCJVcnVndWF5XCI7XG4gICAgICAgbGV0IHNlY29uZCA9IGVxdWFsVGVhbXNbMF1bMV0ubmFtZSA9PSBcIkVneXB0XCIgfHwgIGVxdWFsVGVhbXNbMF1bMV0ubmFtZSA9PSBcIlVydWd1YXlcIjtcbiAgICAgICBleHBlY3QoZmlyc3QpLnRvQmVUcnV0aHkoKTtcbiAgICAgICBleHBlY3Qoc2Vjb25kKS50b0JlVHJ1dGh5KCk7XG5cbiAgICB9KTtcblxufSk7XG5cbmRlc2NyaWJlKFwid2Ugd2FudCB0byBiZSBhYmxlIHRvIHNlbGVjdCBhIHN1YnNldCBvZiBtYXRjaGVzXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgdmFyIHN1Yk1hdGNoZXMgPSAgZ2V0TWF0Y2hlc0Zyb21UZWFtcyhbZ3JvdXBBLnRlYW1zWzFdLGdyb3VwQS50ZWFtc1syXSxncm91cEEudGVhbXNbM11dLGdyb3VwQS5tYXRjaGVzKVxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMyBtYXRjaGVzIHRvIGJlIHNlbGVjdGVkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGV4cGVjdChzdWJNYXRjaGVzLmxlbmd0aCkudG9CZSgzKTtcbiAgICB9KTtcblxufSk7XG5cblxuZGVzY3JpYmUoXCJJZiAzIFRlYW1zIGFyZSBlcXVhbCB3ZSBuZWVkIG1ha2UgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlbVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBBKTtcblxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMyB0ZWFtcyB0byBiZSBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICBleHBlY3QoZ3JvdXBBLmdldEVxdWFsVGVhbXMoKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgICAgIGV4cGVjdChncm91cEEuZ2V0RXF1YWxUZWFtcygpWzBdLmxlbmd0aCkudG9CZSgzKTtcblxuICAgIH0pO1xuXG5cbiAgICBpdChcIlJ1c3NpYSBzaG91bGQgYmUgZmlyc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzBdLm5hbWUpLnRvQmUoXCJSdXNzaWFcIilcbiAgICB9KTtcblxuICAgIGl0KFwiU2F1ZGkgQXJhYmlhIHNob3VsZCBiZSBzZWNvbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzFdLm5hbWUpLnRvQmUoXCJTYXVkaSBBcmFiaWFcIilcbiAgICB9KVxuICAgIGl0KFwiVXJ1Z3VheSBzaG91bGQgYmUgdGhpcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzJdLm5hbWUpLnRvQmUoXCJVcnVndWF5XCIpXG4gICAgfSlcbiAgICBpdChcIkVneXB0IHNob3VsZCBiZSBsYXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1szXS5uYW1lKS50b0JlKFwiRWd5cHRcIilcbiAgICB9KVxuXG5cblxufSk7XG5cbmRlc2NyaWJlKFwiSWYgMiBvbiAyIFRlYW1zIGFyZSBlcXVhbCB3ZSBuZWVkIG1ha2UgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlbVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuICAgIGdyb3VwQi5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBCLCB0cnVlKTtcblxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMiB0ZWFtcyB0byBiZSBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpWzBdLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKClbMV0ubGVuZ3RoKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L2luZGV4LnNwZWMudHMiLCJpbXBvcnQge1Byb25vc3RpZWt9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Qcm9ub3N0aWVrXCI7XG5pbXBvcnQge1RlYW19IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9UZWFtXCI7XG5pbXBvcnQge0dyb3VwfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvR3JvdXBcIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9NYXRjaFwiO1xuaW1wb3J0IHtIT01FX1RFQU1fV0lOUywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL21vZGVscy9Db25zdGFudHNcIjtcbmltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdXJuYW1lbnQoKSA6IFRvdXJuYW1lbnQge1xuXG4gICAgY29uc29sZS5sb2coXCIqKioqKiBQcm9ub3N0aWVrIGdlbmVyYXRpb24gU3RhcnRpbmcgKioqKlwiKTtcblxuICAgIGxldCB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IG5ldyBUb3VybmFtZW50KCk7XG5cbiAgICBsZXQgYWxsVGVhbXMgPSAgW1xuICAgICAgICBbXCJSdXNzaWFcIiwgXCJTYXVkaSBBcmFiaWFcIiwgXCJFZ3lwdFwiLCBcIlVydWd1YXlcIl0sXG4gICAgICAgIFtcIlBvcnR1Z2FsXCIsIFwiU3BhaW5cIiwgXCJNb3JvY2NvXCIsIFwiSXJhblwiXSxcbiAgICAgICAgW1wiRnJhbmNlXCIsIFwiQXVzdHJhbGlhXCIsIFwiUGVydVwiLCBcIkRlbm1hcmtcIl0sXG4gICAgICAgIFtcIkFyZ2VudGluYVwiLCBcIkljZWxhbmRcIiwgXCJDcm9hdGlhXCIsIFwiTmlnZXJpYVwiXSxcbiAgICAgICAgW1wiQnJhemlsXCIsIFwiU3dpdHplcmxhbmRcIiwgXCJDb3N0YSBSaWNhXCIsIFwiU2VyYmlhXCJdLFxuICAgICAgICBbXCJHZXJtYW55XCIsIFwiTWV4aWNvXCIsIFwiU3dlZGVuXCIsIFwiS29yZWEgUmVwdWJsaWNcIl0sXG4gICAgICAgIFtcIkJlbGdpdW1cIiwgXCJQYW5hbWFcIiwgXCJUdW5pc2lhXCIsIFwiRW5nbGFuZFwiXSxcbiAgICAgICAgW1wiUG9sYW5kXCIsIFwiU2VuZWdhbFwiLCBcIkNvbG9tYmlhXCIsIFwiSmFwYW5cIl0sXG4gICAgXTtcblxuICAgIGxldCBncm91cExldHRlciA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCJdO1xuXG4gICAgYWxsVGVhbXMuZm9yRWFjaCggKGdyb3VwVGVhbXNOYW1lcyxpbmRleCkgPT4ge1xuICAgICAgICBsZXQgdGVhbXM6IFRlYW1bXSA9IFtdO1xuICAgICAgICBncm91cFRlYW1zTmFtZXMuZm9yRWFjaCh0ZWFtTmFtZSA9PiB7XG4gICAgICAgICAgICB0ZWFtcy5wdXNoKG5ldyBUZWFtKHRlYW1OYW1lKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAgKFwiR3JvdXAgXCIgKyBncm91cExldHRlcltpbmRleF0sIHRlYW1zKTtcbiAgICAgICAgdG91cm5hbWVudC5ncm91cHMucHVzaChncm91cCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdXJuYW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVGVhbXModGVhbWE6IFRlYW0sIHRlYW1iIDogVGVhbSkgOiBudW1iZXIge1xuXG4gICAgaWYodGVhbWEucG9pbnRzICE9IHRlYW1iLnBvaW50cyl7XG4gICAgICAgIC8vY29tcGFyZSBvbiBwb2ludHM6XG4gICAgICAgIHJldHVybiB0ZWFtYi5wb2ludHMgLSB0ZWFtYS5wb2ludHM7XG4gICAgfSBlbHNlIGlmKHRlYW1hLmdldEdvYWxzRGlmZmVyZW5jZSgpICE9IHRlYW1iLmdldEdvYWxzRGlmZmVyZW5jZSgpKXtcbiAgICAgICAgLy9jb21wYXJlIG9uIGdvYWwgZGlmZjpcbiAgICAgICAgcmV0dXJuIHRlYW1iLmdldEdvYWxzRGlmZmVyZW5jZSgpIC10ZWFtYS5nZXRHb2Fsc0RpZmZlcmVuY2UoKTtcbiAgICB9IGVsc2UgaWYodGVhbWEuZ29hbHNTY29yZWQgIT0gdGVhbWIuZ29hbHNTY29yZWQpe1xuICAgICAgICAvLyBvbiBnb2FscyBzY29yZWQ6XG4gICAgICAgIHJldHVybiB0ZWFtYi5nb2Fsc1Njb3JlZCAtIHRlYW1hLmdvYWxzU2NvcmVkO1xuICAgIH1cbiAgICByZXR1cm4gMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyA6IFRlYW1bXSwgYWxsTWF0Y2hlcyA6IE1hdGNoW10pIDogTWF0Y2hbXSB7XG4gICAgdmFyIHRlYW1OYW1lcyAgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgIHRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICB0ZWFtTmFtZXMucHVzaCh0ZWFtLm5hbWUpO1xuICAgIH0pO1xuXG4gICAgdmFyIHJldHVyblZhbCA6IE1hdGNoIFtdID0gbmV3IEFycmF5PE1hdGNoPigpO1xuICAgIGFsbE1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICBpZih0ZWFtTmFtZXMuaW5kZXhPZihtYXRjaC5ob21lVGVhbU5hbWUpICE9IC0xICYmIHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLm91dFRlYW1OYW1lKSAhPSAtMSl7XG4gICAgICAgICAgICAgcmV0dXJuVmFsLnB1c2goT2JqZWN0LmNyZWF0ZShtYXRjaCkpO1xuICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5WYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWJHcm91cCh0ZWFtcyA6IFRlYW1bXSwgb3JpZ2luYWxHcm91cCA6IEdyb3VwKSA6ICBHcm91cCB7XG4gICAgIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xuICAgICBncm91cC50ZWFtcyA9IFtdXG4gICAgZm9yKHZhciB0IG9mIHRlYW1zKSB7XG4gICAgICAgICBncm91cC50ZWFtcy5wdXNoKE9iamVjdC5jcmVhdGUodCkpO1xuICAgIH1cbiAgICAvLyBncm91cC50ZWFtcyA9IHRlYW1zLnNsaWNlKCk7XG4gICAgIGdyb3VwLm1hdGNoZXMgPSBnZXRNYXRjaGVzRnJvbVRlYW1zKHRlYW1zLG9yaWdpbmFsR3JvdXAubWF0Y2hlcyApO1xuICAgICBmb3IodmFyIHQgb2YgZ3JvdXAudGVhbXMpe1xuICAgICAgICAgdC5yZXNldCgpO1xuICAgICB9XG4gICAgIHJldHVybiBncm91cDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2NjZXNNYXRjaGVzKGdyb3VwOiBHcm91cCkgOnZvaWQge1xuXG4gICAgLy9ncm91cC5nZXRBbGxNYXRjaGVzUGxheWVkKCkgPSB0cnVlO1xuXG4gICAgZ3JvdXAudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICB0ZWFtLnJlc2V0KCk7XG4gICAgfSk7XG5cbiAgICBncm91cC5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgIGlmKG1hdGNoLm91dFRlYW1TY29yZSAhPSB1bmRlZmluZWQgJiYgbWF0Y2guaG9tZVRlYW1TY29yZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy90aGlzIG1lYW5zIG1hdGNoIGlzIHBsYXllZCwgc28gbGV0IGRvIHdoYXQgd2UgbmVlZCB0byBkbzpcbiAgICAgICAgICAgIGxldCBtYXRjaE91dENvbWUgPSBtYXRjaC5nZXRPdXRDb21lKCk7XG4gICAgICAgICAgICBsZXQgaG9tZVRlYW0gPSBncm91cC5nZXRUZWFtKG1hdGNoLmhvbWVUZWFtTmFtZSk7XG4gICAgICAgICAgICBsZXQgb3V0VGVhbSA9IGdyb3VwLmdldFRlYW0obWF0Y2gub3V0VGVhbU5hbWUpO1xuICAgICAgICAgICAgaWYobWF0Y2hPdXRDb21lID09IEhPTUVfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoT3V0Q29tZSA9PSBPVVRfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICBvdXRUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICBob21lVGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAuYWxsTWF0Y2hlc1BsYXllZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vaWYgYWxsIHBsYXllZCBtYXRjaGVzIGFyZSBkb25lLCB3ZSBwdXQgdGhlIHBvaW50czpcbiAgICBncm91cC50ZWFtcy5mb3JFYWNoKCh0ZWFtKT0+e1xuICAgICAgICB0ZWFtLnBvaW50cyA9IHRlYW0ubWF0Y2hlc1dvbiozICsgdGVhbS5tYXRjaGVzRHJhd2VkO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJUZWFtcyhncm91cCA6IEdyb3VwLCBjb21wbGV0ZT8gOiBib29sZWFuKSA6IHZvaWQge1xuICAgIC8vcmVzZXQgc29tZSBzdHVmZjpcbiAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IGZhbHNlO1xuICAgIGdyb3VwLmVxdWFsVGVhbXMgPSBuZXcgQXJyYXk8VGVhbVtdPigpO1xuICAgIGdyb3VwLnRlYW1zLnNvcnQoICh0ZWFtYSwgdGVhbWIpID0+IHtcbiAgICAgICAgdmFyIF8gPSAgY29tcGFyZVRlYW1zKHRlYW1hLCB0ZWFtYik7XG4gICAgICAgIGlmKCBfID09IDApe1xuICAgICAgICAgICAgLy8gdGhpcyBtZWFucyB0ZWFtIGEgYW5kIHRlYW0gYiBhcmUgY29uY2lkZXJlZCBlcXVhbDpcbiAgICAgICAgICAgIGdyb3VwLmFkZFRvRXF1YWxUZWFtcyhbdGVhbWEsIHRlYW1iXSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXF1YWxUZWFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG5cbiAgICAvL1RPRE86XG4gICAgLy9tYXkgaGVyZSBjaGVjayBpZiBhbGwgbWF0Y2hlcyBhcmUgcGxheWVkID8/XG4gICAgaWYoIWdyb3VwLmFsbE1hdGNoZXNQbGF5ZWQpe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9jaGVjayBpZiB0aGVyZSBhcmUgZXF1YWx0ZWFtcywgYW5kIGRvIHdoYXRzIG5lZWRlZDpcbiAgICBpZihncm91cC5lcXVhbFRlYW1zLmxlbmd0aCA+IDApe1xuICAgICAgICBpZihncm91cC5lcXVhbFRlYW1zWzBdLmxlbmd0aCA9PSA0KXtcbiAgICAgICAgICAgIC8vdGhpcyBtZWFucyBhbGwgNCBvZiB0aGVtIHdlcmUgZXF1YWwsIHNvIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbzpcbiAgICAgICAgICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vd2UgbmVlZCB0byBtYWtlIGEgc3ViZ3JvdXAgYW5kIGRvIHRoZSBvcmRlcmluZyBhZ2FpbjpcbiAgICAgICAgICAgIGZvciAoIHZhciBlcXVhbFRlYW1zU3ViR3JvdXAgb2YgZ3JvdXAuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgaWYoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICAgICAvKiBjb25zb2xlLmxvZyhcIkJlZm9yZSBcIik7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB2YXIgc3ViZ3JvdXAgPSBnZXRTdWJHcm91cChlcXVhbFRlYW1zU3ViR3JvdXAsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBzdWJncm91cC5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgICAgICAgICAgICAgLy93YXRjaCBvdXQgaGVyZSBmb3IgaW5maW5pdGUgbG9vcHMhISFcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVGVhbXMoc3ViZ3JvdXAsZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2FmdGVyIHRoaXMgc3ViZ3JvdXBzIGhhdmUgYmVlbiBvcmRlcmVkLCBzbyBub3cgd2Ugb3JkZXIgdGhlbSBpblxuICAgICAgICAgICAgICAgIC8vc3ViZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cCwgc3ViZ3JvdXApO1xuICAgICAgICAgICAgICAgIC8vZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpe1xuICAgICAgIC8qIGNvbnNvbGUubG9nKFwiRmluYWwgcHJpbnRcIik7XG4gICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpKi9cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cDogR3JvdXAsIHN1Ykdyb3VwIDogR3JvdXApe1xuXG5cbiAgICAvL2ZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB0ZWFtOlxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yKHZhciB0ZWFtIG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgaWYoc3ViR3JvdXAuY29udGFpbnNUZWFtV2l0aE5hbWUodGVhbS5uYW1lKSl7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCsrXG4gICAgfVxuXG4gICAgLy9nZXQgY29waWVzIG9mIHRoZSB0ZWFtc1xuICAgIHZhciB0ZWFtc1RvQWRkID0gZ2V0U3ViR3JvdXBGcm9tT3JpZ2luYWxHcm91cChncm91cCxzdWJHcm91cCk7XG5cbiAgICAvL3RoZSBmaXJzdCB0ZWFtIGlzIGluIHBvc2l0aW9uIGluZGV4IGluIHRoZSBvcmlnaW5hbCBncm91cFxuICAgIC8vc28gbm93IHN0YXJ0IHJlcGxhY2luZyBmcm9tIHRoZXJlOlxuICAgIGZvcih2YXIgdGVhbVRvQWRkIG9mIHRlYW1zVG9BZGQudGVhbXMpe1xuICAgICAgICBncm91cC50ZWFtcy5zcGxpY2UoaW5kZXgsIDEsIHRlYW1Ub0FkZCk7XG4gICAgICAgIGluZGV4KytcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0U3ViR3JvdXBGcm9tT3JpZ2luYWxHcm91cCAob3JpZ2luYWxHcm91cCAgOiBHcm91cCwgc3ViR3JvdXAgOiBHcm91cCApIDogIEdyb3Vwe1xuICAgIHZhciByZXR1cm5WYWwgOiBHcm91cCA9IG5ldyBHcm91cCgpO1xuICAgIHJldHVyblZhbC50ZWFtcyA9IFtdO1xuICAgIGZvciAodmFyIHN1Ykdyb3VwVGVhbSAgb2Ygc3ViR3JvdXAudGVhbXMpe1xuICAgICAgICB2YXIgdGVhbVRvQWRkID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWxHcm91cC5nZXRUZWFtKChzdWJHcm91cFRlYW0ubmFtZSkpKTtcbiAgICAgICAgLy92YXIgdGVhbVRvQWRkID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbEdyb3VwLmdldFRlYW0oc3ViR3JvdXBUZWFtLm5hbWUpKTtcbiAgICAgICAgcmV0dXJuVmFsLnRlYW1zLnB1c2godGVhbVRvQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbDtcblxufVxuXG5cblxuXG4vLyAqKiogRnJvbnRlbmQgSGVscGVyIG1ldGhvZHM6ICoqKiAvL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VCYXNlZE9uTmFtZShuZXdHcm91cCA6IEdyb3VwLCBncm91cHMgOkdyb3VwW10pIDogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gZmluZEluZGV4T2ZHcm91cEJhc2VkT25OYW1lKG5ld0dyb3VwLCBncm91cHMpO1xuICAgIGdyb3Vwc1tpbmRleF0gPSBuZXdHcm91cDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4T2ZHcm91cEJhc2VkT25OYW1lKGdyb3VwVG9GaW5kOkdyb3VwICwgZ3JvdXBzIDogR3JvdXBbXSkgOiBhbnkge1xuXG4gICAgZm9yKGxldCBpIGluIGdyb3Vwcyl7XG4gICAgICAgIGlmKGdyb3Vwc1tpXS5ncm91cG5hbWUgPT0gZ3JvdXBUb0ZpbmQuZ3JvdXBuYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gKioqIEVORCAqKiogLy9cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJpbXBvcnQge1RlYW19IGZyb20gXCIuL1RlYW1cIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCAgY2xhc3MgR3JvdXAge1xuXG4gICAgZ3JvdXBuYW1lIDogc3RyaW5nO1xuICAgIHRlYW1zIDogVGVhbVtdO1xuICAgIG1hdGNoZXMgOiBNYXRjaFtdO1xuICAgIGFsbE1hdGNoZXNQbGF5ZWQgOiBib29sZWFuID0gZmFsc2U7XG4gICAgIGdyb3VwTmVlZHNEcmF3IDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBlcXVhbFRlYW1zIDogVGVhbVtdW107XG5cbiAgICBjb25zdHJ1Y3Rvcihncm91cG5hbWU/OnN0cmluZywgdGVhbXM/OiBUZWFtW10pe1xuICAgICAgICB0aGlzLmdyb3VwbmFtZSA9Z3JvdXBuYW1lO1xuICAgICAgICB0aGlzLnRlYW1zID0gdGVhbXM7XG4gICAgICAgIGlmKHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgdGhpcy5pbml0TWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TWF0Y2hlcygpIDogIHZvaWR7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLm5hbWUsIHRoaXMudGVhbXNbMV0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1syXS5uYW1lLCB0aGlzLnRlYW1zWzNdLm5hbWUpKTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXS5uYW1lLCB0aGlzLnRlYW1zWzJdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1sxXS5uYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1swXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzFdLm5hbWUsIHRoaXMudGVhbXNbMl0ubmFtZSkpO1xuICAgIH1cblxuICAgIHByb2Nlc3NNYXRjaGVzKCkgOiB2b2lke1xuXG4gICAgICAgIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgIHRlYW0ucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWVhbnMgbWF0Y2ggaXMgcGxheWVkLCBzbyBsZXQgZG8gd2hhdCB3ZSBuZWVkIHRvIGRvOlxuICAgICAgICAgICAgICAgIGxldCBtYXRjaE91dENvbWUgPSBtYXRjaC5nZXRPdXRDb21lKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gdGhpcy5nZXRUZWFtKG1hdGNoLmhvbWVUZWFtTmFtZSk7XG4gICAgICAgICAgICAgICAgbGV0IG91dFRlYW0gPSB0aGlzLmdldFRlYW0obWF0Y2gub3V0VGVhbU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hPdXRDb21lID09IE9VVF9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSk9PntcbiAgICAgICAgICAgIHRlYW0ucG9pbnRzID0gdGVhbS5tYXRjaGVzV29uKjMgKyB0ZWFtLm1hdGNoZXNEcmF3ZWQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICAvL3RoaXMgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0ZWFtbmFtZSBwYXNzZWQgdG8gdGhlIG1ldGhvZDpcbiAgICBnZXRUZWFtKG5hbWU6c3RyaW5nKSA6IFRlYW17XG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaW50R3JvdXBTdGFuZGluZygpIHtcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0ZWFtLm5hbWV9ICB3OiR7dGVhbS5tYXRjaGVzV29ufSAgZDoke3RlYW0ubWF0Y2hlc0RyYXdlZH0gbDoke3RlYW0ubWF0Y2hlc0xvc3R9IHM6JHt0ZWFtLmdvYWxzU2NvcmVkfSBjOiR7dGVhbS5nb2Fsc0NvbmNpZXZlZH0gUDoke3RlYW0ucG9pbnRzfWApXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBwbGF5ZWQ6IFwiICsgdGhpcy5hbGxNYXRjaGVzUGxheWVkKTtcbiAgICB9XG5cbiAgICBwcmludEdyb3VwTWF0Y2hlcygpe1xuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke21hdGNoLmhvbWVUZWFtTmFtZX0gLSAke21hdGNoLm91dFRlYW1OYW1lfSA6ICR7bWF0Y2guaG9tZVRlYW1TY29yZX0gLSAke21hdGNoLm91dFRlYW1TY29yZX1gKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRFcXVhbFRlYW1zKCkgOiBUZWFtW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsVGVhbXMgO1xuICAgIH1cblxuICAgIGdldEFsbE1hdGNoZXNQbGF5ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxNYXRjaGVzUGxheWVkO1xuICAgIH1cblxuICAgICBhZGRUb0VxdWFsVGVhbXModGVhbXNUb0FkZCA6IFRlYW1bXSkgOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpcnN0LCBqdXN0IGFkZCBpdDpcbiAgICAgICAgICAgIHRoaXMuZXF1YWxUZWFtcy5wdXNoKHRlYW1zVG9BZGQpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB2YXIgYWRkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gY2hlY2sgaXMgb25lIG9mIHRoZSAyIHRlYW1zIGFscmVhZHkgaXMgaW4gb24gb2YgdGhlIGFycmF5cyB0aGF0IHdhcyBhbHJlYWR5IGFkZGVkOlxuICAgICAgICAgICAgZm9yKHZhciBhbHJlYWR5QWRkZWRUZWFtcyBvZiB0aGlzLmVxdWFsVGVhbXMpe1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgaXQgY29udGFpbnMgb25lIG9mIHRoZW06XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4T2ZFeGlzdGluZ1RlYW0gPSAwO1xuICAgICAgICAgICAgICAgIGZvcih2YXIgdGVhbVRvQWRkIG9mIHRlYW1zVG9BZGQpe1xuICAgICAgICAgICAgICAgICAgICAvL2lmIGl0IGFscmVhZHkgaW4gdGhlcmUsIGp1c3QgYWRkIHRoZSBvdGhlciBvbmUgYXMgd2VsbCBhbmQgd2UgYXJlIGRvbmU6XG4gICAgICAgICAgICAgICAgICAgIGlmKGFscmVhZHlBZGRlZFRlYW1zLmxhc3RJbmRleE9mKHRlYW1Ub0FkZCkgIT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkV4aXN0aW5nVGVhbSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgMiwgdGhpcyBtZWFucyB3ZSBkaWQgbm90IGZpbmQgdGhlIHRlYW0gaW4gYWxyZWFkeUFkZGVkVGVhbXNcbiAgICAgICAgICAgICAgICBpZihpbmRleE9mRXhpc3RpbmdUZWFtICE9IDIpe1xuICAgICAgICAgICAgICAgICAgICAvL2lmIGlzIDAgb3IgMSwgd2UgZm91bmQgaXMsIHNvIHdlIG5lZWQgdG8gYWRkIHRoZSBvdGhlciB0ZWFtLlxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhPZlRlYW1Ub0FkZCA9IGluZGV4T2ZFeGlzdGluZ1RlYW0gPT0gMSA/IDAgOiAxO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4T2ZUZWFtVG9BZGQpO1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5QWRkZWRUZWFtcy5wdXNoKHRlYW1zVG9BZGRbaW5kZXhPZlRlYW1Ub0FkZF0pO1xuICAgICAgICAgICAgICAgICAgICBhZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWRkZWQpe1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgbWVhbiB0ZWFtcyBhcmUgZXF1YWwgMiBvbiAyXG4gICAgICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgcHVyZWx5IGZvciBoZWxwaW5nIG1ldGhvZDpcbiAgICAgKi9cbiAgICAgY29udGFpbnNUZWFtV2l0aE5hbWUobmFtZTpTdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgIGZvcih2YXIgdGVhbSBvZiB0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIGlmKHRlYW0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IEdyb3VwIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGdyb3VwLCBpbnB1dCk7XG5cbiAgICAgICAgICAgIGxldCBuZXdUZWFtczogVGVhbVtdID0gW107XG4gICAgICAgICAgICBncm91cC50ZWFtcy5mb3JFYWNoKHRlYW0gPT4ge1xuICAgICAgICAgICAgICAgICBuZXdUZWFtcy5wdXNoKFRlYW0uZGVzZXJpYWxpemUodGVhbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBncm91cC50ZWFtcyA9IG5ld1RlYW1zO1xuXG4gICAgICAgICAgICBsZXQgbmV3TWF0Y2hlczogTWF0Y2hbXSA9IFtdO1xuICAgICAgICAgICAgZ3JvdXAubWF0Y2hlcy5mb3JFYWNoKG1hdGNoICA9PiB7XG4gICAgICAgICAgICAgICAgbmV3TWF0Y2hlcy5wdXNoKE1hdGNoLmRlc2VyaWFsaXplKG1hdGNoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3VwLm1hdGNoZXMgPSBuZXdNYXRjaGVzO1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuXG59XG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsImltcG9ydCB7VGVhbX0gZnJvbSBcIi4vVGVhbVwiO1xuaW1wb3J0IHsgSE9NRV9URUFNX1dJTlMsIE1BVENIX0lTX0RSQVcsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIE1hdGNoe1xuICAgIGhvbWVUZWFtTmFtZSA6IHN0cmluZztcbiAgICBvdXRUZWFtTmFtZTogc3RyaW5nO1xuICAgIGhvbWVUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKGhvbWVUZWFtTmFtZTogc3RyaW5nLCBvdXRUZWFtTmFtZSA6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuaG9tZVRlYW1OYW1lID0gaG9tZVRlYW1OYW1lO1xuICAgICAgICB0aGlzLm91dFRlYW1OYW1lID0gb3V0VGVhbU5hbWU7XG4gICAgfVxuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcbiAgICAgICAgaWYodGhpcy5ob21lVGVhbVNjb3JlID4gdGhpcy5vdXRUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vdXRUZWFtU2NvcmUgPiB0aGlzLmhvbWVUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIE9VVF9URUFNX1dJTlM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1BVENIX0lTX0RSQVc7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogTWF0Y2gge1xuICAgICAgICBjb25zdCBtID0gbmV3IE1hdGNoKGlucHV0LmhvbWVUZWFtTmFtZSwgaW5wdXQub3V0VGVhbU5hbWUpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG0sIGlucHV0KTtcbiAgICAgICAgcmV0dXJuIG07XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgY2xhc3MgS25vY2tvdXRNYXRjaCBleHRlbmRzIE1hdGNoIHtcbiAgICBob21lVGVhbVBlbmFsdHlTY29yZSA6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtUGVuYWx0eVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBsZXQgb3V0Q29tZSA9ICBzdXBlci5nZXRPdXRDb21lKCk7XG4gICAgICAgIGlmKG91dENvbWUgPT0gTUFUQ0hfSVNfRFJBVyl7XG4gICAgICAgICAgICAvL1RoaXMgbWVhbnMgbWF0Y2ggd2FzIHdpdGggcGVuYWxzIC4uLlxuICAgICAgICAgICAgaWYodGhpcy5ob21lVGVhbVBlbmFsdHlTY29yZSA+IHRoaXMub3V0VGVhbVBlbmFsdHlTY29yZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBPVVRfVEVBTV9XSU5TXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dENvbWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9NYXRjaC50cyIsImltcG9ydCB7S25vY2tvdXRNYXRjaH0gZnJvbSBcIi4vTWF0Y2hcIjtcbmltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50e1xuICAgIGdyb3VwcyA6IEdyb3VwW10gPSAgW107XG4gICAga25vY2tPdXRSb3VuZHMgOiAgW0tub2Nrb3V0TWF0Y2hbXV07XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnQudHMiLCJpbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50OiBUb3VybmFtZW50KSA6dm9pZCB7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAxO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMDtcblxuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDp2b2lke1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDM7XG5cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDogdm9pZCB7XG4gICAgLy9zZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzBdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDQ7XG5cbiAgICBncm91cEEubWF0Y2hlc1sxXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEEubWF0Y2hlc1s0XS5vdXRUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQS5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG5cbiAgICBncm91cEIubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMTtcbiAgICBncm91cEIubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzJdLmhvbWVUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQi5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1szXS5ob21lVGVhbVNjb3JlID0gMztcbiAgICBncm91cEIubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMjtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAyO1xuICAgIGdyb3VwQi5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==