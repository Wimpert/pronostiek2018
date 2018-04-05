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
    /* console.log("teams:");
     console.log(group.teams);
     console.log("equalsTeams:");
     console.log(group.equalTeams);*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjVhNTEwNGEzNjNlNjJhNzhkMzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVGVhbS50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2luZGV4LnNwZWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL01hdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEYSxzQkFBYyxHQUFhLENBQUMsQ0FBQztBQUM3QixxQkFBYSxHQUFhLENBQUMsQ0FBQztBQUM1QixxQkFBYSxHQUFZLENBQUMsQ0FBQztBQUUzQixtQkFBVyxHQUFZ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QUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFdkMsQ0FBQztBQXRCRCxzSEFzQkMiLCJmaWxlIjoiQXBwU3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY1YTUxMDRhMzYzZTYyYTc4ZDMyIiwiZXhwb3J0IGNvbnN0IEhPTUVfVEVBTV9XSU5TIDogbnVtYmVyID0gIDE7XG5leHBvcnQgY29uc3QgT1VUX1RFQU1fV0lOUyA6IG51bWJlciA9ICAyO1xuZXhwb3J0IGNvbnN0IE1BVENIX0lTX0RSQVcgOiBudW1iZXI9ICAwO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFX05BTUUgOiBzdHJpbmcgPSBcImpfdWlkXCI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9Db25zdGFudHMudHMiLCJpbXBvcnQge0dyb3VwfSBmcm9tIFwiLi9Hcm91cFwiO1xuXG5leHBvcnQgY2xhc3MgVGVhbSB7XG5cbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHBvaW50czogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc1dvbjogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc0xvc3Q6IG51bWJlciA9IDA7XG4gICAgbWF0Y2hlc0RyYXdlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc1Njb3JlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc0NvbmNpZXZlZDogbnVtYmVyID0gMDtcblxuXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpe1xuICAgICAgICB0aGlzLm5hbWUgPSAgbmFtZTtcbiAgICB9XG5cblxuXG4gICAgcmVzZXQoKSA6dm9pZCB7XG5cbiAgICAgICAgdGhpcy5wb2ludHMgPSAwO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlc0RyYXdlZCA9IDA7XG4gICAgICAgIHRoaXMubWF0Y2hlc1dvbiA9IDA7XG4gICAgICAgIHRoaXMubWF0Y2hlc0xvc3QgPSAwO1xuXG4gICAgICAgIHRoaXMuZ29hbHNTY29yZWQgPSAwO1xuICAgICAgICB0aGlzLmdvYWxzQ29uY2lldmVkID0gMDtcbiAgICB9XG5cbiAgICBnZXRHb2Fsc0RpZmZlcmVuY2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdvYWxzU2NvcmVkIC0gdGhpcy5nb2Fsc0NvbmNpZXZlZDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBUZWFtIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGlucHV0Lm5hbWU7XG4gICAgICAgIGNvbnN0IHRlYW0gPSBuZXcgVGVhbShuYW1lKTtcbiAgICAgICAgLypPYmplY3QuYXNzaWduKFRlYW0sIGlucHV0KTtcbiAgICAgICAgY29uc29sZS5sb2codGVhbSk7Ki9cbiAgICAgICAgdGVhbS5wb2ludHMgPSAgTnVtYmVyKGlucHV0LnBvaW50cyk7XG4gICAgICAgIHRlYW0ubWF0Y2hlc1dvbiA9IE51bWJlcihpbnB1dC5tYXRjaGVzV29uKTtcbiAgICAgICAgdGVhbS5tYXRjaGVzTG9zdCA9IE51bWJlcihpbnB1dC5tYXRjaGVzTG9zdCk7XG4gICAgICAgIHRlYW0ubWF0Y2hlc0RyYXdlZCA9IE51bWJlcihpbnB1dC5tYXRjaGVzRHJhd2VkKTtcbiAgICAgICAgdGVhbS5nb2Fsc1Njb3JlZCA9IE51bWJlcihpbnB1dC5nb2Fsc1Njb3JlZCk7XG4gICAgICAgIHRlYW0uZ29hbHNDb25jaWV2ZWQgPSBOdW1iZXIoaW5wdXQuZ29hbHNDb25jaWV2ZWQpO1xuICAgICAgICByZXR1cm4gdGVhbTtcblxuICAgIH1cblxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9UZWFtLnRzIiwiXG5pbXBvcnQge2dldE1hdGNoZXNGcm9tVGVhbXMsIGdldFRvdXJuYW1lbnQsIG9yZGVyVGVhbXN9IGZyb20gXCIuLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlsc1wiO1xuaW1wb3J0IHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzLCBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zLCBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyxcbiAgICBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2VlblxufSBmcm9tIFwiLi9TcGVjSGVscGVyc1wiO1xuaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cblxuZGVzY3JpYmUoXCJ0aGlzIHdpbGwgdGVzdCB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgZ3JvdXAgbWF0Y2hlczpcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgIHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgaXQoXCJ0b3VybmFtZW50IHNob3VsZCBjb250YWluIGdyb3VwMSBBXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLmdyb3VwbmFtZSkudG9FcXVhbChcIkdyb3VwIEFcIik7XG4gICAgfSk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgbGV0IGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcblxuICAgIGxldCB0ZWFtQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzBdO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDMgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodGVhbUEucG9pbnRzKS50b0VxdWFsKDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEMgaGFzIDEgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbMl0ucG9pbnRzKS50b0VxdWFsKDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEQgaGFzIDIgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbM10ucG9pbnRzKS50b0VxdWFsKDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIHNjb3JlZCAzIGdvYWxzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLmdvYWxzU2NvcmVkKS50b0JlKDYpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIGNvbmNpZXZlZCA0IGdvYWxzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLmdvYWxzQ29uY2lldmVkKS50b0JlKDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDEgZHJhd2VkIG1hdGNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLm1hdGNoZXNEcmF3ZWQpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMSB3b24gbWF0Y2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEubWF0Y2hlc1dvbikudG9CZSgxKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZShcInRoaXMgd2lsbCB0ZXN0IHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBncm91cCBtYXRjaGVzOlwiLCBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyICB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEEpO1xuXG4gICAgaXQoXCJSdXNzaWEgZmlyc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMF0ubmFtZSkudG9FcXVhbChcIlJ1c3NpYVwiKTtcbiAgICB9KTtcblxuXG4gICAgaXQoXCJFZ3lwdCBzZWNvbmQgXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1sxXS5uYW1lKS50b0VxdWFsKFwiRWd5cHRcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIlVydWd1YXkgbGFzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMl0ubmFtZSkudG9FcXVhbChcIlVydWd1YXlcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIlNhdWRpIEFyYWJpYSB0aGlyZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbM10ubmFtZSkudG9FcXVhbChcIlNhdWRpIEFyYWJpYVwiKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcImdyb3VwIEE6IFwiICsgZ3JvdXBBKTtcbiAgICB2YXIgZXF1YWxUZWFtcyA9IGdyb3VwQS5nZXRFcXVhbFRlYW1zKCk7XG5cbiAgICBpdChcIkVneXB0IGFuIFVydWd1YXkgYXJlIGNvbmNpZGVyZWQgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICBleHBlY3QoZXF1YWxUZWFtc1swXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgbGV0IGZpcnN0ID0gZXF1YWxUZWFtc1swXVswXS5uYW1lID09IFwiRWd5cHRcIiB8fCAgZXF1YWxUZWFtc1swXVswXS5uYW1lID09IFwiVXJ1Z3VheVwiO1xuICAgICAgIGxldCBzZWNvbmQgPSBlcXVhbFRlYW1zWzBdWzFdLm5hbWUgPT0gXCJFZ3lwdFwiIHx8ICBlcXVhbFRlYW1zWzBdWzFdLm5hbWUgPT0gXCJVcnVndWF5XCI7XG4gICAgICAgZXhwZWN0KGZpcnN0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgZXhwZWN0KHNlY29uZCkudG9CZVRydXRoeSgpO1xuXG4gICAgfSk7XG5cbn0pO1xuXG5kZXNjcmliZShcIndlIHdhbnQgdG8gYmUgYWJsZSB0byBzZWxlY3QgYSBzdWJzZXQgb2YgbWF0Y2hlc1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIHZhciBzdWJNYXRjaGVzID0gIGdldE1hdGNoZXNGcm9tVGVhbXMoW2dyb3VwQS50ZWFtc1sxXSxncm91cEEudGVhbXNbMl0sZ3JvdXBBLnRlYW1zWzNdXSxncm91cEEubWF0Y2hlcylcblxuICAgIGl0KFwid2UgZXhwZWN0IDMgbWF0Y2hlcyB0byBiZSBzZWxlY3RlZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBleHBlY3Qoc3ViTWF0Y2hlcy5sZW5ndGgpLnRvQmUoMyk7XG4gICAgfSk7XG5cbn0pO1xuXG5cbmRlc2NyaWJlKFwiSWYgMyBUZWFtcyBhcmUgZXF1YWwgd2UgbmVlZCBtYWtlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW1cIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyh0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQSk7XG5cblxuICAgIGl0KFwid2UgZXhwZWN0IDMgdGVhbXMgdG8gYmUgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgZXhwZWN0KGdyb3VwQS5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICAgICBleHBlY3QoZ3JvdXBBLmdldEVxdWFsVGVhbXMoKVswXS5sZW5ndGgpLnRvQmUoMyk7XG5cbiAgICB9KTtcblxuXG4gICAgaXQoXCJSdXNzaWEgc2hvdWxkIGJlIGZpcnN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1swXS5uYW1lKS50b0JlKFwiUnVzc2lhXCIpXG4gICAgfSk7XG5cbiAgICBpdChcIlNhdWRpIEFyYWJpYSBzaG91bGQgYmUgc2Vjb25kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1sxXS5uYW1lKS50b0JlKFwiU2F1ZGkgQXJhYmlhXCIpXG4gICAgfSlcbiAgICBpdChcIlVydWd1YXkgc2hvdWxkIGJlIHRoaXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1syXS5uYW1lKS50b0JlKFwiVXJ1Z3VheVwiKVxuICAgIH0pXG4gICAgaXQoXCJFZ3lwdCBzaG91bGQgYmUgbGFzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbM10ubmFtZSkudG9CZShcIkVneXB0XCIpXG4gICAgfSlcblxuXG5cbn0pO1xuXG5kZXNjcmliZShcIklmIDIgb24gMiBUZWFtcyBhcmUgZXF1YWwgd2UgbmVlZCBtYWtlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW1cIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEIgPSB0b3VybmFtZW50Lmdyb3Vwc1sxXTtcbiAgICBncm91cEIucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQiwgdHJ1ZSk7XG5cblxuICAgIGl0KFwid2UgZXhwZWN0IDIgdGVhbXMgdG8gYmUgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKVswXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpWzFdLmxlbmd0aCkudG9CZSgyKTtcbiAgICB9KTtcblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9pbmRleC5zcGVjLnRzIiwiaW1wb3J0IHtQcm9ub3N0aWVrfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvUHJvbm9zdGlla1wiO1xuaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvVGVhbVwiO1xuaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwXCI7XG5pbXBvcnQge01hdGNofSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2hcIjtcbmltcG9ydCB7SE9NRV9URUFNX1dJTlMsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9tb2RlbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3VybmFtZW50KCkgOiBUb3VybmFtZW50IHtcblxuICAgIGNvbnNvbGUubG9nKFwiKioqKiogUHJvbm9zdGllayBnZW5lcmF0aW9uIFN0YXJ0aW5nICoqKipcIik7XG5cbiAgICBsZXQgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBuZXcgVG91cm5hbWVudCgpO1xuXG4gICAgbGV0IGFsbFRlYW1zID0gIFtcbiAgICAgICAgW1wiUnVzc2lhXCIsIFwiU2F1ZGkgQXJhYmlhXCIsIFwiRWd5cHRcIiwgXCJVcnVndWF5XCJdLFxuICAgICAgICBbXCJQb3J0dWdhbFwiLCBcIlNwYWluXCIsIFwiTW9yb2Njb1wiLCBcIklyYW5cIl0sXG4gICAgICAgIFtcIkZyYW5jZVwiLCBcIkF1c3RyYWxpYVwiLCBcIlBlcnVcIiwgXCJEZW5tYXJrXCJdLFxuICAgICAgICBbXCJBcmdlbnRpbmFcIiwgXCJJY2VsYW5kXCIsIFwiQ3JvYXRpYVwiLCBcIk5pZ2VyaWFcIl0sXG4gICAgICAgIFtcIkJyYXppbFwiLCBcIlN3aXR6ZXJsYW5kXCIsIFwiQ29zdGEgUmljYVwiLCBcIlNlcmJpYVwiXSxcbiAgICAgICAgW1wiR2VybWFueVwiLCBcIk1leGljb1wiLCBcIlN3ZWRlblwiLCBcIktvcmVhIFJlcHVibGljXCJdLFxuICAgICAgICBbXCJCZWxnaXVtXCIsIFwiUGFuYW1hXCIsIFwiVHVuaXNpYVwiLCBcIkVuZ2xhbmRcIl0sXG4gICAgICAgIFtcIlBvbGFuZFwiLCBcIlNlbmVnYWxcIiwgXCJDb2xvbWJpYVwiLCBcIkphcGFuXCJdLFxuICAgIF07XG5cbiAgICBsZXQgZ3JvdXBMZXR0ZXIgPSBbXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCIsIFwiRVwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiXTtcblxuICAgIGFsbFRlYW1zLmZvckVhY2goIChncm91cFRlYW1zTmFtZXMsaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHRlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgZ3JvdXBUZWFtc05hbWVzLmZvckVhY2godGVhbU5hbWUgPT4ge1xuICAgICAgICAgICAgdGVhbXMucHVzaChuZXcgVGVhbSh0ZWFtTmFtZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGdyb3VwID0gbmV3IEdyb3VwIChcIkdyb3VwIFwiICsgZ3JvdXBMZXR0ZXJbaW5kZXhdLCB0ZWFtcyk7XG4gICAgICAgIHRvdXJuYW1lbnQuZ3JvdXBzLnB1c2goZ3JvdXApO1xuICAgIH0pO1xuICAgIHJldHVybiB0b3VybmFtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVRlYW1zKHRlYW1hOiBUZWFtLCB0ZWFtYiA6IFRlYW0pIDogbnVtYmVyIHtcblxuICAgIGlmKHRlYW1hLnBvaW50cyAhPSB0ZWFtYi5wb2ludHMpe1xuICAgICAgICAvL2NvbXBhcmUgb24gcG9pbnRzOlxuICAgICAgICByZXR1cm4gdGVhbWIucG9pbnRzIC0gdGVhbWEucG9pbnRzO1xuICAgIH0gZWxzZSBpZih0ZWFtYS5nZXRHb2Fsc0RpZmZlcmVuY2UoKSAhPSB0ZWFtYi5nZXRHb2Fsc0RpZmZlcmVuY2UoKSl7XG4gICAgICAgIC8vY29tcGFyZSBvbiBnb2FsIGRpZmY6XG4gICAgICAgIHJldHVybiB0ZWFtYi5nZXRHb2Fsc0RpZmZlcmVuY2UoKSAtdGVhbWEuZ2V0R29hbHNEaWZmZXJlbmNlKCk7XG4gICAgfSBlbHNlIGlmKHRlYW1hLmdvYWxzU2NvcmVkICE9IHRlYW1iLmdvYWxzU2NvcmVkKXtcbiAgICAgICAgLy8gb24gZ29hbHMgc2NvcmVkOlxuICAgICAgICByZXR1cm4gdGVhbWIuZ29hbHNTY29yZWQgLSB0ZWFtYS5nb2Fsc1Njb3JlZDtcbiAgICB9XG4gICAgcmV0dXJuIDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdGNoZXNGcm9tVGVhbXModGVhbXMgOiBUZWFtW10sIGFsbE1hdGNoZXMgOiBNYXRjaFtdKSA6IE1hdGNoW10ge1xuICAgIHZhciB0ZWFtTmFtZXMgID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICB0ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgdGVhbU5hbWVzLnB1c2godGVhbS5uYW1lKTtcbiAgICB9KTtcblxuICAgIHZhciByZXR1cm5WYWwgOiBNYXRjaCBbXSA9IG5ldyBBcnJheTxNYXRjaD4oKTtcbiAgICBhbGxNYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgaWYodGVhbU5hbWVzLmluZGV4T2YobWF0Y2guaG9tZVRlYW1OYW1lKSAhPSAtMSAmJiB0ZWFtTmFtZXMuaW5kZXhPZihtYXRjaC5vdXRUZWFtTmFtZSkgIT0gLTEpe1xuICAgICAgICAgICAgIHJldHVyblZhbC5wdXNoKE9iamVjdC5jcmVhdGUobWF0Y2gpKTtcbiAgICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ViR3JvdXAodGVhbXMgOiBUZWFtW10sIG9yaWdpbmFsR3JvdXAgOiBHcm91cCkgOiAgR3JvdXAge1xuICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgZ3JvdXAudGVhbXMgPSBbXVxuICAgIGZvcih2YXIgdCBvZiB0ZWFtcykge1xuICAgICAgICAgZ3JvdXAudGVhbXMucHVzaChPYmplY3QuY3JlYXRlKHQpKTtcbiAgICB9XG4gICAgLy8gZ3JvdXAudGVhbXMgPSB0ZWFtcy5zbGljZSgpO1xuICAgICBncm91cC5tYXRjaGVzID0gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyxvcmlnaW5hbEdyb3VwLm1hdGNoZXMgKTtcbiAgICAgZm9yKHZhciB0IG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgIHQucmVzZXQoKTtcbiAgICAgfVxuICAgICByZXR1cm4gZ3JvdXA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jY2VzTWF0Y2hlcyhncm91cDogR3JvdXApIDp2b2lkIHtcblxuICAgIC8vZ3JvdXAuZ2V0QWxsTWF0Y2hlc1BsYXllZCgpID0gdHJ1ZTtcblxuICAgIGdyb3VwLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICAgdGVhbS5yZXNldCgpO1xuICAgIH0pO1xuXG4gICAgZ3JvdXAubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIC8vdGhpcyBtZWFucyBtYXRjaCBpcyBwbGF5ZWQsIHNvIGxldCBkbyB3aGF0IHdlIG5lZWQgdG8gZG86XG4gICAgICAgICAgICBsZXQgbWF0Y2hPdXRDb21lID0gbWF0Y2guZ2V0T3V0Q29tZSgpO1xuICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gZ3JvdXAuZ2V0VGVhbShtYXRjaC5ob21lVGVhbU5hbWUpO1xuICAgICAgICAgICAgbGV0IG91dFRlYW0gPSBncm91cC5nZXRUZWFtKG1hdGNoLm91dFRlYW1OYW1lKTtcbiAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDM7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZihtYXRjaE91dENvbWUgPT0gT1VUX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dFRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbiAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4gICAgZ3JvdXAudGVhbXMuZm9yRWFjaCgodGVhbSk9PntcbiAgICAgICAgdGVhbS5wb2ludHMgPSB0ZWFtLm1hdGNoZXNXb24qMyArIHRlYW0ubWF0Y2hlc0RyYXdlZDtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyVGVhbXMoZ3JvdXAgOiBHcm91cCwgY29tcGxldGU/IDogYm9vbGVhbikgOiB2b2lkIHtcbiAgICAvL3Jlc2V0IHNvbWUgc3R1ZmY6XG4gICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSBmYWxzZTtcbiAgICBncm91cC5lcXVhbFRlYW1zID0gbmV3IEFycmF5PFRlYW1bXT4oKTtcbiAgICBncm91cC50ZWFtcy5zb3J0KCAodGVhbWEsIHRlYW1iKSA9PiB7XG4gICAgICAgIHZhciBfID0gIGNvbXBhcmVUZWFtcyh0ZWFtYSwgdGVhbWIpO1xuICAgICAgICBpZiggXyA9PSAwKXtcbiAgICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdGVhbSBhIGFuZCB0ZWFtIGIgYXJlIGNvbmNpZGVyZWQgZXF1YWw6XG4gICAgICAgICAgICBncm91cC5hZGRUb0VxdWFsVGVhbXMoW3RlYW1hLCB0ZWFtYl0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmVxdWFsVGVhbXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH0pO1xuXG4gICAgLy9UT0RPOlxuICAgIC8vbWF5IGhlcmUgY2hlY2sgaWYgYWxsIG1hdGNoZXMgYXJlIHBsYXllZCA/P1xuICAgIGlmKCFncm91cC5hbGxNYXRjaGVzUGxheWVkKXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgLyogY29uc29sZS5sb2coXCJ0ZWFtczpcIik7XG4gICAgY29uc29sZS5sb2coZ3JvdXAudGVhbXMpO1xuICAgIGNvbnNvbGUubG9nKFwiZXF1YWxzVGVhbXM6XCIpO1xuICAgIGNvbnNvbGUubG9nKGdyb3VwLmVxdWFsVGVhbXMpOyovXG4gICAgLy9jaGVjayBpZiB0aGVyZSBhcmUgZXF1YWx0ZWFtcywgYW5kIGRvIHdoYXRzIG5lZWRlZDpcbiAgICBpZihncm91cC5lcXVhbFRlYW1zLmxlbmd0aCA+IDApe1xuICAgICAgICBpZihncm91cC5lcXVhbFRlYW1zWzBdLmxlbmd0aCA9PSBncm91cC50ZWFtcy5sZW5ndGgpe1xuICAgICAgICAgICAgLy90aGlzIG1lYW5zIGFsbCAgb2YgdGhlIHRlYW1zIHdlcmUgZXF1YWwsIHNvIHRoZXJlIGlzIG5vdGhpbmcgbW9yZSB0byBkbzpcbiAgICAgICAgICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vd2UgbmVlZCB0byBtYWtlIGEgc3ViZ3JvdXAgYW5kIGRvIHRoZSBvcmRlcmluZyBhZ2FpbjpcbiAgICAgICAgICAgIGZvciAoIHZhciBlcXVhbFRlYW1zU3ViR3JvdXAgb2YgZ3JvdXAuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgaWYoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICAgICAvKiBjb25zb2xlLmxvZyhcIkJlZm9yZSBcIik7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB2YXIgc3ViZ3JvdXAgPSBnZXRTdWJHcm91cChlcXVhbFRlYW1zU3ViR3JvdXAsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICBzdWJncm91cC5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgICAgICAgICAgICAgLy93YXRjaCBvdXQgaGVyZSBmb3IgaW5maW5pdGUgbG9vcHMhISFcbiAgICAgICAgICAgICAgICAvKmlmIChjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJUZWFtcyhzdWJncm91cCxmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICBpZighZ3JvdXAuZ3JvdXBOZWVkc0RyYXcpe1xuICAgICAgICAgICAgICAgICAgICBvcmRlclRlYW1zKHN1Ymdyb3VwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc3ViZ3JvdXAuZ3JvdXBOZWVkc0RyYXcpe1xuICAgICAgICAgICAgICAgICAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9ICB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vYWZ0ZXIgdGhpcyBzdWJncm91cHMgaGF2ZSBiZWVuIG9yZGVyZWQsIHNvIG5vdyB3ZSBvcmRlciB0aGVtIGluXG4gICAgICAgICAgICAgICAgLy9zdWJncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgICAgICBvcmRlckFjY29yZGluZ1RvU3ViR3JvdXBzKGdyb3VwLCBzdWJncm91cCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSl7XG4gICAgICAgLyogY29uc29sZS5sb2coXCJGaW5hbCBwcmludFwiKTtcbiAgICAgICAgZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgIGdyb3VwLnByaW50R3JvdXBNYXRjaGVzKCkqL1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBvcmRlckFjY29yZGluZ1RvU3ViR3JvdXBzKGdyb3VwOiBHcm91cCwgc3ViR3JvdXAgOiBHcm91cCl7XG5cblxuICAgIC8vZmluZCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHRlYW06XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IodmFyIHRlYW0gb2YgZ3JvdXAudGVhbXMpe1xuICAgICAgICBpZihzdWJHcm91cC5jb250YWluc1RlYW1XaXRoTmFtZSh0ZWFtLm5hbWUpKXtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4KytcbiAgICB9XG5cbiAgICAvL2dldCBjb3BpZXMgb2YgdGhlIHRlYW1zXG4gICAgdmFyIHRlYW1zVG9BZGQgPSBnZXRTdWJHcm91cEZyb21PcmlnaW5hbEdyb3VwKGdyb3VwLHN1Ykdyb3VwKTtcblxuICAgIC8vdGhlIGZpcnN0IHRlYW0gaXMgaW4gcG9zaXRpb24gaW5kZXggaW4gdGhlIG9yaWdpbmFsIGdyb3VwXG4gICAgLy9zbyBub3cgc3RhcnQgcmVwbGFjaW5nIGZyb20gdGhlcmU6XG4gICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZC50ZWFtcyl7XG4gICAgICAgIGdyb3VwLnRlYW1zLnNwbGljZShpbmRleCwgMSwgdGVhbVRvQWRkKTtcbiAgICAgICAgaW5kZXgrK1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRTdWJHcm91cEZyb21PcmlnaW5hbEdyb3VwIChvcmlnaW5hbEdyb3VwICA6IEdyb3VwLCBzdWJHcm91cCA6IEdyb3VwICkgOiAgR3JvdXB7XG4gICAgdmFyIHJldHVyblZhbCA6IEdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgcmV0dXJuVmFsLnRlYW1zID0gW107XG4gICAgZm9yICh2YXIgc3ViR3JvdXBUZWFtICBvZiBzdWJHcm91cC50ZWFtcyl7XG4gICAgICAgIHZhciB0ZWFtVG9BZGQgPSBPYmplY3QuYXNzaWduKHt9LCBvcmlnaW5hbEdyb3VwLmdldFRlYW0oKHN1Ykdyb3VwVGVhbS5uYW1lKSkpO1xuICAgICAgICAvL3ZhciB0ZWFtVG9BZGQgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsR3JvdXAuZ2V0VGVhbShzdWJHcm91cFRlYW0ubmFtZSkpO1xuICAgICAgICByZXR1cm5WYWwudGVhbXMucHVzaCh0ZWFtVG9BZGQpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsO1xuXG59XG5cblxuXG5cbi8vICoqKiBGcm9udGVuZCBIZWxwZXIgbWV0aG9kczogKioqIC8vXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUJhc2VkT25OYW1lKG5ld0dyb3VwIDogR3JvdXAsIGdyb3VwcyA6R3JvdXBbXSkgOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSBmaW5kSW5kZXhPZkdyb3VwQmFzZWRPbk5hbWUobmV3R3JvdXAsIGdyb3Vwcyk7XG4gICAgZ3JvdXBzW2luZGV4XSA9IG5ld0dyb3VwO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5kZXhPZkdyb3VwQmFzZWRPbk5hbWUoZ3JvdXBUb0ZpbmQ6R3JvdXAgLCBncm91cHMgOiBHcm91cFtdKSA6IGFueSB7XG5cbiAgICBmb3IobGV0IGkgaW4gZ3JvdXBzKXtcbiAgICAgICAgaWYoZ3JvdXBzW2ldLmdyb3VwbmFtZSA9PSBncm91cFRvRmluZC5ncm91cG5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyAqKiogRU5EICoqKiAvL1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJpbXBvcnQge1RlYW19IGZyb20gXCIuL1RlYW1cIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCAgY2xhc3MgR3JvdXAge1xuXG4gICAgZ3JvdXBuYW1lIDogc3RyaW5nO1xuICAgIHRlYW1zIDogVGVhbVtdO1xuICAgIG1hdGNoZXMgOiBNYXRjaFtdO1xuICAgIGFsbE1hdGNoZXNQbGF5ZWQgOiBib29sZWFuID0gZmFsc2U7XG4gICAgIGdyb3VwTmVlZHNEcmF3IDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBlcXVhbFRlYW1zIDogVGVhbVtdW107XG5cbiAgICBjb25zdHJ1Y3Rvcihncm91cG5hbWU/OnN0cmluZywgdGVhbXM/OiBUZWFtW10pe1xuICAgICAgICB0aGlzLmdyb3VwbmFtZSA9Z3JvdXBuYW1lO1xuICAgICAgICB0aGlzLnRlYW1zID0gdGVhbXM7XG4gICAgICAgIGlmKHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgdGhpcy5pbml0TWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TWF0Y2hlcygpIDogIHZvaWR7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLm5hbWUsIHRoaXMudGVhbXNbMV0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1syXS5uYW1lLCB0aGlzLnRlYW1zWzNdLm5hbWUpKTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXS5uYW1lLCB0aGlzLnRlYW1zWzJdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1sxXS5uYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1swXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzFdLm5hbWUsIHRoaXMudGVhbXNbMl0ubmFtZSkpO1xuICAgIH1cblxuICAgIHByb2Nlc3NNYXRjaGVzKCkgOiB2b2lke1xuXG4gICAgICAgIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgIHRlYW0ucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWVhbnMgbWF0Y2ggaXMgcGxheWVkLCBzbyBsZXQgZG8gd2hhdCB3ZSBuZWVkIHRvIGRvOlxuICAgICAgICAgICAgICAgIGxldCBtYXRjaE91dENvbWUgPSBtYXRjaC5nZXRPdXRDb21lKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gdGhpcy5nZXRUZWFtKG1hdGNoLmhvbWVUZWFtTmFtZSk7XG4gICAgICAgICAgICAgICAgbGV0IG91dFRlYW0gPSB0aGlzLmdldFRlYW0obWF0Y2gub3V0VGVhbU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hPdXRDb21lID09IE9VVF9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSk9PntcbiAgICAgICAgICAgIHRlYW0ucG9pbnRzID0gdGVhbS5tYXRjaGVzV29uKjMgKyB0ZWFtLm1hdGNoZXNEcmF3ZWQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICAvL3RoaXMgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0ZWFtbmFtZSBwYXNzZWQgdG8gdGhlIG1ldGhvZDpcbiAgICBnZXRUZWFtKG5hbWU6c3RyaW5nKSA6IFRlYW17XG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaW50R3JvdXBTdGFuZGluZygpIHtcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0ZWFtLm5hbWV9ICB3OiR7dGVhbS5tYXRjaGVzV29ufSAgZDoke3RlYW0ubWF0Y2hlc0RyYXdlZH0gbDoke3RlYW0ubWF0Y2hlc0xvc3R9IHM6JHt0ZWFtLmdvYWxzU2NvcmVkfSBjOiR7dGVhbS5nb2Fsc0NvbmNpZXZlZH0gUDoke3RlYW0ucG9pbnRzfWApXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBwbGF5ZWQ6IFwiICsgdGhpcy5hbGxNYXRjaGVzUGxheWVkKTtcbiAgICB9XG5cbiAgICBwcmludEdyb3VwTWF0Y2hlcygpe1xuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke21hdGNoLmhvbWVUZWFtTmFtZX0gLSAke21hdGNoLm91dFRlYW1OYW1lfSA6ICR7bWF0Y2guaG9tZVRlYW1TY29yZX0gLSAke21hdGNoLm91dFRlYW1TY29yZX1gKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRFcXVhbFRlYW1zKCkgOiBUZWFtW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsVGVhbXMgO1xuICAgIH1cblxuICAgIGdldEFsbE1hdGNoZXNQbGF5ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxNYXRjaGVzUGxheWVkO1xuICAgIH1cblxuICAgICBhZGRUb0VxdWFsVGVhbXModGVhbXNUb0FkZCA6IFRlYW1bXSkgOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpcnN0LCBqdXN0IGFkZCBpdDpcbiAgICAgICAgICAgIHRoaXMuZXF1YWxUZWFtcy5wdXNoKHRlYW1zVG9BZGQpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB2YXIgYWRkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gY2hlY2sgaXMgb25lIG9mIHRoZSAyIHRlYW1zIGFscmVhZHkgaXMgaW4gb24gb2YgdGhlIGFycmF5cyB0aGF0IHdhcyBhbHJlYWR5IGFkZGVkOlxuICAgICAgICAgICAgZm9yKHZhciBhbHJlYWR5QWRkZWRUZWFtcyBvZiB0aGlzLmVxdWFsVGVhbXMpe1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgaXQgY29udGFpbnMgb25lIG9mIHRoZW06XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4T2ZFeGlzdGluZ1RlYW0gPSAwO1xuICAgICAgICAgICAgICAgIGZvcih2YXIgdGVhbVRvQWRkIG9mIHRlYW1zVG9BZGQpe1xuICAgICAgICAgICAgICAgICAgICAvL2lmIGl0IGFscmVhZHkgaW4gdGhlcmUsIGp1c3QgYWRkIHRoZSBvdGhlciBvbmUgYXMgd2VsbCBhbmQgd2UgYXJlIGRvbmU6XG4gICAgICAgICAgICAgICAgICAgIGlmKGFscmVhZHlBZGRlZFRlYW1zLmxhc3RJbmRleE9mKHRlYW1Ub0FkZCkgIT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkV4aXN0aW5nVGVhbSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgMiwgdGhpcyBtZWFucyB3ZSBkaWQgbm90IGZpbmQgdGhlIHRlYW0gaW4gYWxyZWFkeUFkZGVkVGVhbXNcbiAgICAgICAgICAgICAgICBpZihpbmRleE9mRXhpc3RpbmdUZWFtICE9IDIpe1xuICAgICAgICAgICAgICAgICAgICAvL2lmIGlzIDAgb3IgMSwgd2UgZm91bmQgaXMsIHNvIHdlIG5lZWQgdG8gYWRkIHRoZSBvdGhlciB0ZWFtLlxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhPZlRlYW1Ub0FkZCA9IGluZGV4T2ZFeGlzdGluZ1RlYW0gPT0gMSA/IDAgOiAxO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4T2ZUZWFtVG9BZGQpO1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5QWRkZWRUZWFtcy5wdXNoKHRlYW1zVG9BZGRbaW5kZXhPZlRlYW1Ub0FkZF0pO1xuICAgICAgICAgICAgICAgICAgICBhZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWRkZWQpe1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgbWVhbiB0ZWFtcyBhcmUgZXF1YWwgMiBvbiAyXG4gICAgICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgcHVyZWx5IGZvciBoZWxwaW5nIG1ldGhvZDpcbiAgICAgKi9cbiAgICAgY29udGFpbnNUZWFtV2l0aE5hbWUobmFtZTpTdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgIGZvcih2YXIgdGVhbSBvZiB0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIGlmKHRlYW0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IEdyb3VwIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGdyb3VwLCBpbnB1dCk7XG5cbiAgICAgICAgICAgIGxldCBuZXdUZWFtczogVGVhbVtdID0gW107XG4gICAgICAgICAgICBncm91cC50ZWFtcy5mb3JFYWNoKHRlYW0gPT4ge1xuICAgICAgICAgICAgICAgICBuZXdUZWFtcy5wdXNoKFRlYW0uZGVzZXJpYWxpemUodGVhbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBncm91cC50ZWFtcyA9IG5ld1RlYW1zO1xuXG4gICAgICAgICAgICBsZXQgbmV3TWF0Y2hlczogTWF0Y2hbXSA9IFtdO1xuICAgICAgICAgICAgZ3JvdXAubWF0Y2hlcy5mb3JFYWNoKG1hdGNoICA9PiB7XG4gICAgICAgICAgICAgICAgbmV3TWF0Y2hlcy5wdXNoKE1hdGNoLmRlc2VyaWFsaXplKG1hdGNoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3VwLm1hdGNoZXMgPSBuZXdNYXRjaGVzO1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuXG59XG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsImltcG9ydCB7VGVhbX0gZnJvbSBcIi4vVGVhbVwiO1xuaW1wb3J0IHsgSE9NRV9URUFNX1dJTlMsIE1BVENIX0lTX0RSQVcsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIE1hdGNoe1xuICAgIGhvbWVUZWFtTmFtZSA6IHN0cmluZztcbiAgICBvdXRUZWFtTmFtZTogc3RyaW5nO1xuICAgIGhvbWVUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtU2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKGhvbWVUZWFtTmFtZTogc3RyaW5nLCBvdXRUZWFtTmFtZSA6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuaG9tZVRlYW1OYW1lID0gaG9tZVRlYW1OYW1lO1xuICAgICAgICB0aGlzLm91dFRlYW1OYW1lID0gb3V0VGVhbU5hbWU7XG4gICAgfVxuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcbiAgICAgICAgaWYodGhpcy5ob21lVGVhbVNjb3JlID4gdGhpcy5vdXRUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vdXRUZWFtU2NvcmUgPiB0aGlzLmhvbWVUZWFtU2NvcmUpe1xuICAgICAgICAgICAgcmV0dXJuIE9VVF9URUFNX1dJTlM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1BVENIX0lTX0RSQVc7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogTWF0Y2gge1xuICAgICAgICBjb25zdCBtID0gbmV3IE1hdGNoKGlucHV0LmhvbWVUZWFtTmFtZSwgaW5wdXQub3V0VGVhbU5hbWUpO1xuICAgICAgICBPYmplY3QuYXNzaWduKG0sIGlucHV0KTtcbiAgICAgICAgcmV0dXJuIG07XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgY2xhc3MgS25vY2tvdXRNYXRjaCBleHRlbmRzIE1hdGNoIHtcbiAgICBob21lVGVhbVBlbmFsdHlTY29yZSA6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBvdXRUZWFtUGVuYWx0eVNjb3JlOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBsZXQgb3V0Q29tZSA9ICBzdXBlci5nZXRPdXRDb21lKCk7XG4gICAgICAgIGlmKG91dENvbWUgPT0gTUFUQ0hfSVNfRFJBVyl7XG4gICAgICAgICAgICAvL1RoaXMgbWVhbnMgbWF0Y2ggd2FzIHdpdGggcGVuYWxzIC4uLlxuICAgICAgICAgICAgaWYodGhpcy5ob21lVGVhbVBlbmFsdHlTY29yZSA+IHRoaXMub3V0VGVhbVBlbmFsdHlTY29yZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhPTUVfVEVBTV9XSU5TXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBPVVRfVEVBTV9XSU5TXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dENvbWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9NYXRjaC50cyIsImltcG9ydCB7S25vY2tvdXRNYXRjaH0gZnJvbSBcIi4vTWF0Y2hcIjtcbmltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUb3VybmFtZW50e1xuICAgIGdyb3VwcyA6IEdyb3VwW10gPSAgW107XG4gICAga25vY2tPdXRSb3VuZHMgOiAgW0tub2Nrb3V0TWF0Y2hbXV07XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnQudHMiLCJpbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50OiBUb3VybmFtZW50KSA6dm9pZCB7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAxO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMDtcblxuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDp2b2lke1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMztcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDM7XG5cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3JvdXBNYXRjaFNjb3JlM0VxdWFsVGVhbXModG91cm5hbWVudCA6IFRvdXJuYW1lbnQpIDogdm9pZCB7XG4gICAgLy9zZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzBdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDQ7XG5cbiAgICBncm91cEEubWF0Y2hlc1sxXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzNdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDE7XG5cbiAgICBncm91cEEubWF0Y2hlc1s0XS5vdXRUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQS5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBCID0gdG91cm5hbWVudC5ncm91cHNbMV07XG5cbiAgICBncm91cEIubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMTtcbiAgICBncm91cEIubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzJdLmhvbWVUZWFtU2NvcmUgPSA0O1xuICAgIGdyb3VwQi5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1szXS5ob21lVGVhbVNjb3JlID0gMztcbiAgICBncm91cEIubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBCLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gMjtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAyO1xuICAgIGdyb3VwQi5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L1NwZWNIZWxwZXJzLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==