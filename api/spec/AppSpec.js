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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = __webpack_require__(1);
const Group_1 = __webpack_require__(4);
const Constants_1 = __webpack_require__(0);
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
        let group = new Group_1.Group("Group " + groupLetter[index], teams);
        tournament.groups.push(group);
    });
    let rounds = ["Round of 16", "Quarter Final", "Semi Final", "Final"];
    rounds.forEach((roundName) => {
        let knockOutRound = new KnockOutRound_1.KnockOutRound(roundName, []);
        tournament.knockOutRounds.push(knockOutRound);
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
        this.knockOutRounds = [];
    }
}
exports.Tournament = Tournament;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class KnockOutRound {
    constructor(name, matches) {
        this.name = name;
        this.matches = matches;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWM5NzhmMWQ0OTY2MGJlZDI1ODEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVGVhbS50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L2luZGV4LnNwZWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlscy9Ub3VybmFtZW50VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Hcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL01hdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3RGEsc0JBQWMsR0FBYSxDQUFDLENBQUM7QUFDN0IscUJB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TSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUVuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUV2QyxDQUFDO0FBdEJELHNIQXNCQyIsImZpbGUiOiJBcHBTcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWM5NzhmMWQ0OTY2MGJlZDI1ODEiLCJleHBvcnQgY29uc3QgSE9NRV9URUFNX1dJTlMgOiBudW1iZXIgPSAgMTtcbmV4cG9ydCBjb25zdCBPVVRfVEVBTV9XSU5TIDogbnVtYmVyID0gIDI7XG5leHBvcnQgY29uc3QgTUFUQ0hfSVNfRFJBVyA6IG51bWJlcj0gIDA7XG5cbmV4cG9ydCBjb25zdCBDT09LSUVfTkFNRSA6IHN0cmluZyA9IFwial91aWRcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaGFyZWQvbW9kZWxzL0NvbnN0YW50cy50cyIsImltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5cbmV4cG9ydCBjbGFzcyBUZWFtIHtcblxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gICAgcG9pbnRzOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzV29uOiBudW1iZXIgPSAwIDtcbiAgICBtYXRjaGVzTG9zdDogbnVtYmVyID0gMDtcbiAgICBtYXRjaGVzRHJhd2VkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzU2NvcmVkOiBudW1iZXIgPSAwO1xuICAgIGdvYWxzQ29uY2lldmVkOiBudW1iZXIgPSAwO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgIH1cblxuXG5cbiAgICByZXNldCgpIDp2b2lkIHtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IDA7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzRHJhd2VkID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzTG9zdCA9IDA7XG5cbiAgICAgICAgdGhpcy5nb2Fsc1Njb3JlZCA9IDA7XG4gICAgICAgIHRoaXMuZ29hbHNDb25jaWV2ZWQgPSAwO1xuICAgIH1cblxuICAgIGdldEdvYWxzRGlmZmVyZW5jZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbHNTY29yZWQgLSB0aGlzLmdvYWxzQ29uY2lldmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IFRlYW0ge1xuICAgICAgICBjb25zdCBuYW1lID0gaW5wdXQubmFtZTtcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBUZWFtKG5hbWUpO1xuICAgICAgICAvKk9iamVjdC5hc3NpZ24oVGVhbSwgaW5wdXQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZWFtKTsqL1xuICAgICAgICB0ZWFtLnBvaW50cyA9ICBOdW1iZXIoaW5wdXQucG9pbnRzKTtcbiAgICAgICAgdGVhbS5tYXRjaGVzV29uID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNXb24pO1xuICAgICAgICB0ZWFtLm1hdGNoZXNMb3N0ID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNMb3N0KTtcbiAgICAgICAgdGVhbS5tYXRjaGVzRHJhd2VkID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNEcmF3ZWQpO1xuICAgICAgICB0ZWFtLmdvYWxzU2NvcmVkID0gTnVtYmVyKGlucHV0LmdvYWxzU2NvcmVkKTtcbiAgICAgICAgdGVhbS5nb2Fsc0NvbmNpZXZlZCA9IE51bWJlcihpbnB1dC5nb2Fsc0NvbmNpZXZlZCk7XG4gICAgICAgIHJldHVybiB0ZWFtO1xuXG4gICAgfVxuXG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RlYW0udHMiLCJcbmltcG9ydCB7Z2V0TWF0Y2hlc0Zyb21UZWFtcywgZ2V0VG91cm5hbWVudCwgb3JkZXJUZWFtc30gZnJvbSBcIi4uL3NyYy9zaGFyZWQvdXRpbHMvVG91cm5hbWVudFV0aWxzXCI7XG5pbXBvcnQge1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXMsIHNldEdyb3VwTWF0Y2hTY29yZTJGdWxseUVxdWFsVGVhbXMsIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zLFxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuXG59IGZyb20gXCIuL1NwZWNIZWxwZXJzXCI7XG5pbXBvcnQge1RvdXJuYW1lbnR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcblxuXG5kZXNjcmliZShcInRoaXMgd2lsbCB0ZXN0IHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBncm91cCBtYXRjaGVzOlwiLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBpdChcInRvdXJuYW1lbnQgc2hvdWxkIGNvbnRhaW4gZ3JvdXAxIEFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0uZ3JvdXBuYW1lKS50b0VxdWFsKFwiR3JvdXAgQVwiKTtcbiAgICB9KTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG5cbiAgICBsZXQgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuXG4gICAgbGV0IHRlYW1BID0gdG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbMF07XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMyBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5wb2ludHMpLnRvRXF1YWwoNCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQyBoYXMgMSBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1syXS5wb2ludHMpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gRCBoYXMgMiBwb2ludHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh0b3VybmFtZW50Lmdyb3Vwc1swXS50ZWFtc1szXS5wb2ludHMpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgc2NvcmVkIDMgZ29hbHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEuZ29hbHNTY29yZWQpLnRvQmUoNik7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgY29uY2lldmVkIDQgZ29hbHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEuZ29hbHNDb25jaWV2ZWQpLnRvQmUoNCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMSBkcmF3ZWQgbWF0Y2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEubWF0Y2hlc0RyYXdlZCkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KFwidGVhbSBBIGhhcyAxIHdvbiBtYXRjaFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0ZWFtQS5tYXRjaGVzV29uKS50b0JlKDEpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlKFwidGhpcyB3aWxsIHRlc3QgdGhlIHByb2Nlc3Npbmcgb2YgdGhlIGdyb3VwIG1hdGNoZXM6XCIsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIgIHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuICAgIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQSk7XG5cbiAgICBpdChcIlJ1c3NpYSBmaXJzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1swXS5uYW1lKS50b0VxdWFsKFwiUnVzc2lhXCIpO1xuICAgIH0pO1xuXG5cbiAgICBpdChcIkVneXB0IHNlY29uZCBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzFdLm5hbWUpLnRvRXF1YWwoXCJFZ3lwdFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiVXJ1Z3VheSBsYXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1syXS5uYW1lKS50b0VxdWFsKFwiVXJ1Z3VheVwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiU2F1ZGkgQXJhYmlhIHRoaXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1szXS5uYW1lKS50b0VxdWFsKFwiU2F1ZGkgQXJhYmlhXCIpO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKFwiZ3JvdXAgQTogXCIgKyBncm91cEEpO1xuICAgIHZhciBlcXVhbFRlYW1zID0gZ3JvdXBBLmdldEVxdWFsVGVhbXMoKTtcblxuICAgIGl0KFwiRWd5cHQgYW4gVXJ1Z3VheSBhcmUgY29uY2lkZXJlZCBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgIGV4cGVjdChlcXVhbFRlYW1zWzBdLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICBsZXQgZmlyc3QgPSBlcXVhbFRlYW1zWzBdWzBdLm5hbWUgPT0gXCJFZ3lwdFwiIHx8ICBlcXVhbFRlYW1zWzBdWzBdLm5hbWUgPT0gXCJVcnVndWF5XCI7XG4gICAgICAgbGV0IHNlY29uZCA9IGVxdWFsVGVhbXNbMF1bMV0ubmFtZSA9PSBcIkVneXB0XCIgfHwgIGVxdWFsVGVhbXNbMF1bMV0ubmFtZSA9PSBcIlVydWd1YXlcIjtcbiAgICAgICBleHBlY3QoZmlyc3QpLnRvQmVUcnV0aHkoKTtcbiAgICAgICBleHBlY3Qoc2Vjb25kKS50b0JlVHJ1dGh5KCk7XG5cbiAgICB9KTtcblxufSk7XG5cbmRlc2NyaWJlKFwid2Ugd2FudCB0byBiZSBhYmxlIHRvIHNlbGVjdCBhIHN1YnNldCBvZiBtYXRjaGVzXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciB0b3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgdmFyIHN1Yk1hdGNoZXMgPSAgZ2V0TWF0Y2hlc0Zyb21UZWFtcyhbZ3JvdXBBLnRlYW1zWzFdLGdyb3VwQS50ZWFtc1syXSxncm91cEEudGVhbXNbM11dLGdyb3VwQS5tYXRjaGVzKVxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMyBtYXRjaGVzIHRvIGJlIHNlbGVjdGVkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGV4cGVjdChzdWJNYXRjaGVzLmxlbmd0aCkudG9CZSgzKTtcbiAgICB9KTtcblxufSk7XG5cblxuZGVzY3JpYmUoXCJJZiAzIFRlYW1zIGFyZSBlcXVhbCB3ZSBuZWVkIG1ha2UgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlbVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIGdyb3VwQS5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBBKTtcblxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMyB0ZWFtcyB0byBiZSBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICBleHBlY3QoZ3JvdXBBLmdldEVxdWFsVGVhbXMoKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgICAgIGV4cGVjdChncm91cEEuZ2V0RXF1YWxUZWFtcygpWzBdLmxlbmd0aCkudG9CZSgzKTtcblxuICAgIH0pO1xuXG5cbiAgICBpdChcIlJ1c3NpYSBzaG91bGQgYmUgZmlyc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzBdLm5hbWUpLnRvQmUoXCJSdXNzaWFcIilcbiAgICB9KTtcblxuICAgIGl0KFwiU2F1ZGkgQXJhYmlhIHNob3VsZCBiZSBzZWNvbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzFdLm5hbWUpLnRvQmUoXCJTYXVkaSBBcmFiaWFcIilcbiAgICB9KVxuICAgIGl0KFwiVXJ1Z3VheSBzaG91bGQgYmUgdGhpcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QoZ3JvdXBBLnRlYW1zWzJdLm5hbWUpLnRvQmUoXCJVcnVndWF5XCIpXG4gICAgfSlcbiAgICBpdChcIkVneXB0IHNob3VsZCBiZSBsYXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1szXS5uYW1lKS50b0JlKFwiRWd5cHRcIilcbiAgICB9KVxuXG5cblxufSk7XG5cbmRlc2NyaWJlKFwiSWYgMiBvbiAyIFRlYW1zIGFyZSBlcXVhbCB3ZSBuZWVkIG1ha2UgYSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlbVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcblxuICAgIHNldEdyb3VwTWF0Y2hTY29yZTJvbjJFcXVhbFRlYW1zV2l0aERpZmZlcmVuY2VCZXR3ZWVuKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuICAgIGdyb3VwQi5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIG9yZGVyVGVhbXMoZ3JvdXBCLCB0cnVlKTtcblxuXG4gICAgaXQoXCJ3ZSBleHBlY3QgMiB0ZWFtcyB0byBiZSBlcXVhbFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpWzBdLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKClbMV0ubGVuZ3RoKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90ZXN0L2luZGV4LnNwZWMudHMiLCJpbXBvcnQge1Byb25vc3RpZWt9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Qcm9ub3N0aWVrXCI7XG5pbXBvcnQge1RlYW19IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9UZWFtXCI7XG5pbXBvcnQge0dyb3VwfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvR3JvdXBcIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9NYXRjaFwiO1xuaW1wb3J0IHtIT01FX1RFQU1fV0lOUywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL21vZGVscy9Db25zdGFudHNcIjtcbmltcG9ydCB7VG91cm5hbWVudH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnRcIjtcbmltcG9ydCB7S25vY2tPdXRSb3VuZH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL0tub2NrT3V0Um91bmRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdXJuYW1lbnQoKSA6IFRvdXJuYW1lbnQge1xuXG4gICAgY29uc29sZS5sb2coXCIqKioqKiBQcm9ub3N0aWVrIGdlbmVyYXRpb24gU3RhcnRpbmcgKioqKlwiKTtcblxuICAgIGxldCB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IG5ldyBUb3VybmFtZW50KCk7XG5cbiAgICBsZXQgYWxsVGVhbXMgPSAgW1xuICAgICAgICBbXCJSdXNzaWFcIiwgXCJTYXVkaSBBcmFiaWFcIiwgXCJFZ3lwdFwiLCBcIlVydWd1YXlcIl0sXG4gICAgICAgIFtcIlBvcnR1Z2FsXCIsIFwiU3BhaW5cIiwgXCJNb3JvY2NvXCIsIFwiSXJhblwiXSxcbiAgICAgICAgW1wiRnJhbmNlXCIsIFwiQXVzdHJhbGlhXCIsIFwiUGVydVwiLCBcIkRlbm1hcmtcIl0sXG4gICAgICAgIFtcIkFyZ2VudGluYVwiLCBcIkljZWxhbmRcIiwgXCJDcm9hdGlhXCIsIFwiTmlnZXJpYVwiXSxcbiAgICAgICAgW1wiQnJhemlsXCIsIFwiU3dpdHplcmxhbmRcIiwgXCJDb3N0YSBSaWNhXCIsIFwiU2VyYmlhXCJdLFxuICAgICAgICBbXCJHZXJtYW55XCIsIFwiTWV4aWNvXCIsIFwiU3dlZGVuXCIsIFwiS29yZWEgUmVwdWJsaWNcIl0sXG4gICAgICAgIFtcIkJlbGdpdW1cIiwgXCJQYW5hbWFcIiwgXCJUdW5pc2lhXCIsIFwiRW5nbGFuZFwiXSxcbiAgICAgICAgW1wiUG9sYW5kXCIsIFwiU2VuZWdhbFwiLCBcIkNvbG9tYmlhXCIsIFwiSmFwYW5cIl0sXG4gICAgXTtcblxuICAgIGxldCBncm91cExldHRlciA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCJdO1xuXG4gICAgYWxsVGVhbXMuZm9yRWFjaCggKGdyb3VwVGVhbXNOYW1lcyxpbmRleCkgPT4ge1xuICAgICAgICBsZXQgdGVhbXM6IFRlYW1bXSA9IFtdO1xuICAgICAgICBncm91cFRlYW1zTmFtZXMuZm9yRWFjaCh0ZWFtTmFtZSA9PiB7XG4gICAgICAgICAgICB0ZWFtcy5wdXNoKG5ldyBUZWFtKHRlYW1OYW1lKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAgKFwiR3JvdXAgXCIgKyBncm91cExldHRlcltpbmRleF0sIHRlYW1zKTtcbiAgICAgICAgdG91cm5hbWVudC5ncm91cHMucHVzaChncm91cCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcm91bmRzPVtcIlJvdW5kIG9mIDE2XCIsIFwiUXVhcnRlciBGaW5hbFwiLCBcIlNlbWkgRmluYWxcIiwgXCJGaW5hbFwiXTtcblxuICAgIHJvdW5kcy5mb3JFYWNoKChyb3VuZE5hbWUpID0+IHtcbiAgICAgICAgbGV0IGtub2NrT3V0Um91bmQgPSBuZXcgS25vY2tPdXRSb3VuZChyb3VuZE5hbWUsIFtdKTtcbiAgICAgICAgdG91cm5hbWVudC5rbm9ja091dFJvdW5kcy5wdXNoKGtub2NrT3V0Um91bmQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvdXJuYW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVGVhbXModGVhbWE6IFRlYW0sIHRlYW1iIDogVGVhbSkgOiBudW1iZXIge1xuXG4gICAgaWYodGVhbWEucG9pbnRzICE9IHRlYW1iLnBvaW50cyl7XG4gICAgICAgIC8vY29tcGFyZSBvbiBwb2ludHM6XG4gICAgICAgIHJldHVybiB0ZWFtYi5wb2ludHMgLSB0ZWFtYS5wb2ludHM7XG4gICAgfSBlbHNlIGlmKHRlYW1hLmdldEdvYWxzRGlmZmVyZW5jZSgpICE9IHRlYW1iLmdldEdvYWxzRGlmZmVyZW5jZSgpKXtcbiAgICAgICAgLy9jb21wYXJlIG9uIGdvYWwgZGlmZjpcbiAgICAgICAgcmV0dXJuIHRlYW1iLmdldEdvYWxzRGlmZmVyZW5jZSgpIC10ZWFtYS5nZXRHb2Fsc0RpZmZlcmVuY2UoKTtcbiAgICB9IGVsc2UgaWYodGVhbWEuZ29hbHNTY29yZWQgIT0gdGVhbWIuZ29hbHNTY29yZWQpe1xuICAgICAgICAvLyBvbiBnb2FscyBzY29yZWQ6XG4gICAgICAgIHJldHVybiB0ZWFtYi5nb2Fsc1Njb3JlZCAtIHRlYW1hLmdvYWxzU2NvcmVkO1xuICAgIH1cbiAgICByZXR1cm4gMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyA6IFRlYW1bXSwgYWxsTWF0Y2hlcyA6IE1hdGNoW10pIDogTWF0Y2hbXSB7XG4gICAgdmFyIHRlYW1OYW1lcyAgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgIHRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICB0ZWFtTmFtZXMucHVzaCh0ZWFtLm5hbWUpO1xuICAgIH0pO1xuXG4gICAgdmFyIHJldHVyblZhbCA6IE1hdGNoIFtdID0gbmV3IEFycmF5PE1hdGNoPigpO1xuICAgIGFsbE1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICBpZih0ZWFtTmFtZXMuaW5kZXhPZihtYXRjaC5ob21lVGVhbU5hbWUpICE9IC0xICYmIHRlYW1OYW1lcy5pbmRleE9mKG1hdGNoLm91dFRlYW1OYW1lKSAhPSAtMSl7XG4gICAgICAgICAgICAgcmV0dXJuVmFsLnB1c2goT2JqZWN0LmNyZWF0ZShtYXRjaCkpO1xuICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5WYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWJHcm91cCh0ZWFtcyA6IFRlYW1bXSwgb3JpZ2luYWxHcm91cCA6IEdyb3VwKSA6ICBHcm91cCB7XG4gICAgIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xuICAgICBncm91cC50ZWFtcyA9IFtdXG4gICAgZm9yKHZhciB0IG9mIHRlYW1zKSB7XG4gICAgICAgICBncm91cC50ZWFtcy5wdXNoKE9iamVjdC5jcmVhdGUodCkpO1xuICAgIH1cbiAgICAvLyBncm91cC50ZWFtcyA9IHRlYW1zLnNsaWNlKCk7XG4gICAgIGdyb3VwLm1hdGNoZXMgPSBnZXRNYXRjaGVzRnJvbVRlYW1zKHRlYW1zLG9yaWdpbmFsR3JvdXAubWF0Y2hlcyApO1xuICAgICBmb3IodmFyIHQgb2YgZ3JvdXAudGVhbXMpe1xuICAgICAgICAgdC5yZXNldCgpO1xuICAgICB9XG4gICAgIHJldHVybiBncm91cDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2NjZXNNYXRjaGVzKGdyb3VwOiBHcm91cCkgOnZvaWQge1xuXG4gICAgLy9ncm91cC5nZXRBbGxNYXRjaGVzUGxheWVkKCkgPSB0cnVlO1xuXG4gICAgZ3JvdXAudGVhbXMuZm9yRWFjaCgodGVhbSkgPT4ge1xuICAgICAgICB0ZWFtLnJlc2V0KCk7XG4gICAgfSk7XG5cbiAgICBncm91cC5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgIGlmKG1hdGNoLm91dFRlYW1TY29yZSAhPSB1bmRlZmluZWQgJiYgbWF0Y2guaG9tZVRlYW1TY29yZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy90aGlzIG1lYW5zIG1hdGNoIGlzIHBsYXllZCwgc28gbGV0IGRvIHdoYXQgd2UgbmVlZCB0byBkbzpcbiAgICAgICAgICAgIGxldCBtYXRjaE91dENvbWUgPSBtYXRjaC5nZXRPdXRDb21lKCk7XG4gICAgICAgICAgICBsZXQgaG9tZVRlYW0gPSBncm91cC5nZXRUZWFtKG1hdGNoLmhvbWVUZWFtTmFtZSk7XG4gICAgICAgICAgICBsZXQgb3V0VGVhbSA9IGdyb3VwLmdldFRlYW0obWF0Y2gub3V0VGVhbU5hbWUpO1xuICAgICAgICAgICAgaWYobWF0Y2hPdXRDb21lID09IEhPTUVfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMztcbiAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoT3V0Q29tZSA9PSBPVVRfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNMb3N0Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDE7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICBvdXRUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICBob21lVGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAuYWxsTWF0Y2hlc1BsYXllZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vaWYgYWxsIHBsYXllZCBtYXRjaGVzIGFyZSBkb25lLCB3ZSBwdXQgdGhlIHBvaW50czpcbiAgICBncm91cC50ZWFtcy5mb3JFYWNoKCh0ZWFtKT0+e1xuICAgICAgICB0ZWFtLnBvaW50cyA9IHRlYW0ubWF0Y2hlc1dvbiozICsgdGVhbS5tYXRjaGVzRHJhd2VkO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJUZWFtcyhncm91cCA6IEdyb3VwLCBjb21wbGV0ZT8gOiBib29sZWFuKSA6IHZvaWQge1xuICAgIC8vcmVzZXQgc29tZSBzdHVmZjpcbiAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IGZhbHNlO1xuICAgIGdyb3VwLmVxdWFsVGVhbXMgPSBuZXcgQXJyYXk8VGVhbVtdPigpO1xuICAgIGdyb3VwLnRlYW1zLnNvcnQoICh0ZWFtYSwgdGVhbWIpID0+IHtcbiAgICAgICAgdmFyIF8gPSAgY29tcGFyZVRlYW1zKHRlYW1hLCB0ZWFtYik7XG4gICAgICAgIGlmKCBfID09IDApe1xuICAgICAgICAgICAgLy8gdGhpcyBtZWFucyB0ZWFtIGEgYW5kIHRlYW0gYiBhcmUgY29uY2lkZXJlZCBlcXVhbDpcbiAgICAgICAgICAgIGdyb3VwLmFkZFRvRXF1YWxUZWFtcyhbdGVhbWEsIHRlYW1iXSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXF1YWxUZWFtcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG5cbiAgICAvL1RPRE86XG4gICAgLy9tYXkgaGVyZSBjaGVjayBpZiBhbGwgbWF0Y2hlcyBhcmUgcGxheWVkID8/XG4gICAgaWYoIWdyb3VwLmFsbE1hdGNoZXNQbGF5ZWQpe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAvKiBjb25zb2xlLmxvZyhcInRlYW1zOlwiKTtcbiAgICBjb25zb2xlLmxvZyhncm91cC50ZWFtcyk7XG4gICAgY29uc29sZS5sb2coXCJlcXVhbHNUZWFtczpcIik7XG4gICAgY29uc29sZS5sb2coZ3JvdXAuZXF1YWxUZWFtcyk7Ki9cbiAgICAvL2NoZWNrIGlmIHRoZXJlIGFyZSBlcXVhbHRlYW1zLCBhbmQgZG8gd2hhdHMgbmVlZGVkOlxuICAgIGlmKGdyb3VwLmVxdWFsVGVhbXMubGVuZ3RoID4gMCl7XG4gICAgICAgIGlmKGdyb3VwLmVxdWFsVGVhbXNbMF0ubGVuZ3RoID09IGdyb3VwLnRlYW1zLmxlbmd0aCl7XG4gICAgICAgICAgICAvL3RoaXMgbWVhbnMgYWxsICBvZiB0aGUgdGVhbXMgd2VyZSBlcXVhbCwgc28gdGhlcmUgaXMgbm90aGluZyBtb3JlIHRvIGRvOlxuICAgICAgICAgICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy93ZSBuZWVkIHRvIG1ha2UgYSBzdWJncm91cCBhbmQgZG8gdGhlIG9yZGVyaW5nIGFnYWluOlxuICAgICAgICAgICAgZm9yICggdmFyIGVxdWFsVGVhbXNTdWJHcm91cCBvZiBncm91cC5lcXVhbFRlYW1zKXtcbiAgICAgICAgICAgICAgICBpZihjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpe1xuICAgICAgICAgICAgICAgICAgIC8qIGNvbnNvbGUubG9nKFwiQmVmb3JlIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnByaW50R3JvdXBNYXRjaGVzKCkqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHZhciBzdWJncm91cCA9IGdldFN1Ykdyb3VwKGVxdWFsVGVhbXNTdWJHcm91cCwgZ3JvdXApO1xuICAgICAgICAgICAgICAgIHN1Ymdyb3VwLnByb2Nlc3NNYXRjaGVzKCk7XG5cbiAgICAgICAgICAgICAgICAvL3dhdGNoIG91dCBoZXJlIGZvciBpbmZpbml0ZSBsb29wcyEhIVxuICAgICAgICAgICAgICAgIC8qaWYgKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBvcmRlclRlYW1zKHN1Ymdyb3VwLGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgIGlmKCFncm91cC5ncm91cE5lZWRzRHJhdyl7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVGVhbXMoc3ViZ3JvdXAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdWJncm91cC5ncm91cE5lZWRzRHJhdyl7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwTmVlZHNEcmF3ID0gIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9hZnRlciB0aGlzIHN1Ymdyb3VwcyBoYXZlIGJlZW4gb3JkZXJlZCwgc28gbm93IHdlIG9yZGVyIHRoZW0gaW5cbiAgICAgICAgICAgICAgICAvL3N1Ymdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICAgICAgICAgIG9yZGVyQWNjb3JkaW5nVG9TdWJHcm91cHMoZ3JvdXAsIHN1Ymdyb3VwKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKXtcbiAgICAgICAvKiBjb25zb2xlLmxvZyhcIkZpbmFsIHByaW50XCIpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgZ3JvdXAucHJpbnRHcm91cE1hdGNoZXMoKSovXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9yZGVyQWNjb3JkaW5nVG9TdWJHcm91cHMoZ3JvdXA6IEdyb3VwLCBzdWJHcm91cCA6IEdyb3VwKXtcblxuXG4gICAgLy9maW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgdGVhbTpcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvcih2YXIgdGVhbSBvZiBncm91cC50ZWFtcyl7XG4gICAgICAgIGlmKHN1Ykdyb3VwLmNvbnRhaW5zVGVhbVdpdGhOYW1lKHRlYW0ubmFtZSkpe1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgrK1xuICAgIH1cblxuICAgIC8vZ2V0IGNvcGllcyBvZiB0aGUgdGVhbXNcbiAgICB2YXIgdGVhbXNUb0FkZCA9IGdldFN1Ykdyb3VwRnJvbU9yaWdpbmFsR3JvdXAoZ3JvdXAsc3ViR3JvdXApO1xuXG4gICAgLy90aGUgZmlyc3QgdGVhbSBpcyBpbiBwb3NpdGlvbiBpbmRleCBpbiB0aGUgb3JpZ2luYWwgZ3JvdXBcbiAgICAvL3NvIG5vdyBzdGFydCByZXBsYWNpbmcgZnJvbSB0aGVyZTpcbiAgICBmb3IodmFyIHRlYW1Ub0FkZCBvZiB0ZWFtc1RvQWRkLnRlYW1zKXtcbiAgICAgICAgZ3JvdXAudGVhbXMuc3BsaWNlKGluZGV4LCAxLCB0ZWFtVG9BZGQpO1xuICAgICAgICBpbmRleCsrXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFN1Ykdyb3VwRnJvbU9yaWdpbmFsR3JvdXAgKG9yaWdpbmFsR3JvdXAgIDogR3JvdXAsIHN1Ykdyb3VwIDogR3JvdXAgKSA6ICBHcm91cHtcbiAgICB2YXIgcmV0dXJuVmFsIDogR3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICByZXR1cm5WYWwudGVhbXMgPSBbXTtcbiAgICBmb3IgKHZhciBzdWJHcm91cFRlYW0gIG9mIHN1Ykdyb3VwLnRlYW1zKXtcbiAgICAgICAgdmFyIHRlYW1Ub0FkZCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsR3JvdXAuZ2V0VGVhbSgoc3ViR3JvdXBUZWFtLm5hbWUpKSk7XG4gICAgICAgIC8vdmFyIHRlYW1Ub0FkZCA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxHcm91cC5nZXRUZWFtKHN1Ykdyb3VwVGVhbS5uYW1lKSk7XG4gICAgICAgIHJldHVyblZhbC50ZWFtcy5wdXNoKHRlYW1Ub0FkZCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWw7XG5cbn1cblxuXG5cblxuLy8gKioqIEZyb250ZW5kIEhlbHBlciBtZXRob2RzOiAqKiogLy9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQmFzZWRPbk5hbWUobmV3R3JvdXAgOiBHcm91cCwgZ3JvdXBzIDpHcm91cFtdKSA6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IGZpbmRJbmRleE9mR3JvdXBCYXNlZE9uTmFtZShuZXdHcm91cCwgZ3JvdXBzKTtcbiAgICBncm91cHNbaW5kZXhdID0gbmV3R3JvdXA7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleE9mR3JvdXBCYXNlZE9uTmFtZShncm91cFRvRmluZDpHcm91cCAsIGdyb3VwcyA6IEdyb3VwW10pIDogYW55IHtcblxuICAgIGZvcihsZXQgaSBpbiBncm91cHMpe1xuICAgICAgICBpZihncm91cHNbaV0uZ3JvdXBuYW1lID09IGdyb3VwVG9GaW5kLmdyb3VwbmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vICoqKiBFTkQgKioqIC8vXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsImltcG9ydCB7VGVhbX0gZnJvbSBcIi4vVGVhbVwiO1xuaW1wb3J0IHtNYXRjaH0gZnJvbSBcIi4vTWF0Y2hcIjtcbmltcG9ydCB7SE9NRV9URUFNX1dJTlMsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0ICBjbGFzcyBHcm91cCB7XG5cbiAgICBncm91cG5hbWUgOiBzdHJpbmc7XG4gICAgdGVhbXMgOiBUZWFtW107XG4gICAgbWF0Y2hlcyA6IE1hdGNoW107XG4gICAgYWxsTWF0Y2hlc1BsYXllZCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgZ3JvdXBOZWVkc0RyYXcgOiBib29sZWFuID0gZmFsc2U7XG4gICAgIGVxdWFsVGVhbXMgOiBUZWFtW11bXTtcblxuICAgIGNvbnN0cnVjdG9yKGdyb3VwbmFtZT86c3RyaW5nLCB0ZWFtcz86IFRlYW1bXSl7XG4gICAgICAgIHRoaXMuZ3JvdXBuYW1lID1ncm91cG5hbWU7XG4gICAgICAgIHRoaXMudGVhbXMgPSB0ZWFtcztcbiAgICAgICAgaWYodGhpcy50ZWFtcyl7XG4gICAgICAgICAgICB0aGlzLmluaXRNYXRjaGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRNYXRjaGVzKCkgOiAgdm9pZHtcblxuICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMF0ubmFtZSwgdGhpcy50ZWFtc1sxXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzJdLm5hbWUsIHRoaXMudGVhbXNbM10ubmFtZSkpO1xuXG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLm5hbWUsIHRoaXMudGVhbXNbMl0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1szXS5uYW1lLCB0aGlzLnRlYW1zWzFdLm5hbWUpKTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1szXS5uYW1lLCB0aGlzLnRlYW1zWzBdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbMV0ubmFtZSwgdGhpcy50ZWFtc1syXS5uYW1lKSk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc01hdGNoZXMoKSA6IHZvaWR7XG5cbiAgICAgICAgdGhpcy5hbGxNYXRjaGVzUGxheWVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICAgICAgdGVhbS5yZXNldCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGlmKG1hdGNoLm91dFRlYW1TY29yZSAhPSB1bmRlZmluZWQgJiYgbWF0Y2guaG9tZVRlYW1TY29yZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIC8vdGhpcyBtZWFucyBtYXRjaCBpcyBwbGF5ZWQsIHNvIGxldCBkbyB3aGF0IHdlIG5lZWQgdG8gZG86XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoT3V0Q29tZSA9IG1hdGNoLmdldE91dENvbWUoKTtcbiAgICAgICAgICAgICAgICBsZXQgaG9tZVRlYW0gPSB0aGlzLmdldFRlYW0obWF0Y2guaG9tZVRlYW1OYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgb3V0VGVhbSA9IHRoaXMuZ2V0VGVhbShtYXRjaC5vdXRUZWFtTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYobWF0Y2hPdXRDb21lID09IEhPTUVfVEVBTV9XSU5TKXtcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ucG9pbnRzICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihtYXRjaE91dENvbWUgPT0gT1VUX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ucG9pbnRzICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc1dvbisrO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzTG9zdCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0RyYXdlZCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLm91dFRlYW1TY29yZTtcbiAgICAgICAgICAgICAgICBvdXRUZWFtLmdvYWxzQ29uY2lldmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNTY29yZWQgKz0gbWF0Y2guaG9tZVRlYW1TY29yZTtcbiAgICAgICAgICAgICAgICBob21lVGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vaWYgYWxsIHBsYXllZCBtYXRjaGVzIGFyZSBkb25lLCB3ZSBwdXQgdGhlIHBvaW50czpcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKT0+e1xuICAgICAgICAgICAgdGVhbS5wb2ludHMgPSB0ZWFtLm1hdGNoZXNXb24qMyArIHRlYW0ubWF0Y2hlc0RyYXdlZDtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIC8vdGhpcyBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHRlYW1uYW1lIHBhc3NlZCB0byB0aGUgbWV0aG9kOlxuICAgIGdldFRlYW0obmFtZTpzdHJpbmcpIDogVGVhbXtcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKXtcbiAgICAgICAgICAgIGlmKHRlYW0ubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpbnRHcm91cFN0YW5kaW5nKCkge1xuICAgICAgICB0aGlzLnRlYW1zLmZvckVhY2goKHRlYW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RlYW0ubmFtZX0gIHc6JHt0ZWFtLm1hdGNoZXNXb259ICBkOiR7dGVhbS5tYXRjaGVzRHJhd2VkfSBsOiR7dGVhbS5tYXRjaGVzTG9zdH0gczoke3RlYW0uZ29hbHNTY29yZWR9IGM6JHt0ZWFtLmdvYWxzQ29uY2lldmVkfSBQOiR7dGVhbS5wb2ludHN9YClcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxsIHBsYXllZDogXCIgKyB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQpO1xuICAgIH1cblxuICAgIHByaW50R3JvdXBNYXRjaGVzKCl7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7bWF0Y2guaG9tZVRlYW1OYW1lfSAtICR7bWF0Y2gub3V0VGVhbU5hbWV9IDogJHttYXRjaC5ob21lVGVhbVNjb3JlfSAtICR7bWF0Y2gub3V0VGVhbVNjb3JlfWApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEVxdWFsVGVhbXMoKSA6IFRlYW1bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxUZWFtcyA7XG4gICAgfVxuXG4gICAgZ2V0QWxsTWF0Y2hlc1BsYXllZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQ7XG4gICAgfVxuXG4gICAgIGFkZFRvRXF1YWxUZWFtcyh0ZWFtc1RvQWRkIDogVGVhbVtdKSA6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmdldEVxdWFsVGVhbXMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmlyc3QsIGp1c3QgYWRkIGl0OlxuICAgICAgICAgICAgdGhpcy5lcXVhbFRlYW1zLnB1c2godGVhbXNUb0FkZCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBhZGRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjaGVjayBpcyBvbmUgb2YgdGhlIDIgdGVhbXMgYWxyZWFkeSBpcyBpbiBvbiBvZiB0aGUgYXJyYXlzIHRoYXQgd2FzIGFscmVhZHkgYWRkZWQ6XG4gICAgICAgICAgICBmb3IodmFyIGFscmVhZHlBZGRlZFRlYW1zIG9mIHRoaXMuZXF1YWxUZWFtcyl7XG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBpdCBjb250YWlucyBvbmUgb2YgdGhlbTpcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhPZkV4aXN0aW5nVGVhbSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB0ZWFtVG9BZGQgb2YgdGVhbXNUb0FkZCl7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXQgYWxyZWFkeSBpbiB0aGVyZSwganVzdCBhZGQgdGhlIG90aGVyIG9uZSBhcyB3ZWxsIGFuZCB3ZSBhcmUgZG9uZTpcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxyZWFkeUFkZGVkVGVhbXMubGFzdEluZGV4T2YodGVhbVRvQWRkKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRXhpc3RpbmdUZWFtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyAyLCB0aGlzIG1lYW5zIHdlIGRpZCBub3QgZmluZCB0aGUgdGVhbSBpbiBhbHJlYWR5QWRkZWRUZWFtc1xuICAgICAgICAgICAgICAgIGlmKGluZGV4T2ZFeGlzdGluZ1RlYW0gIT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgaXMgMCBvciAxLCB3ZSBmb3VuZCBpcywgc28gd2UgbmVlZCB0byBhZGQgdGhlIG90aGVyIHRlYW0uXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleE9mVGVhbVRvQWRkID0gaW5kZXhPZkV4aXN0aW5nVGVhbSA9PSAxID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXhPZlRlYW1Ub0FkZCk7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlBZGRlZFRlYW1zLnB1c2godGVhbXNUb0FkZFtpbmRleE9mVGVhbVRvQWRkXSk7XG4gICAgICAgICAgICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZGRlZCl7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFuIHRlYW1zIGFyZSBlcXVhbCAyIG9uIDJcbiAgICAgICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwdXJlbHkgZm9yIGhlbHBpbmcgbWV0aG9kOlxuICAgICAqL1xuICAgICBjb250YWluc1RlYW1XaXRoTmFtZShuYW1lOlN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgZm9yKHZhciB0ZWFtIG9mIHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgaWYodGVhbS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGlucHV0OiBhbnkpIDogR3JvdXAge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZ3JvdXAsIGlucHV0KTtcblxuICAgICAgICAgICAgbGV0IG5ld1RlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zLmZvckVhY2godGVhbSA9PiB7XG4gICAgICAgICAgICAgICAgIG5ld1RlYW1zLnB1c2goVGVhbS5kZXNlcmlhbGl6ZSh0ZWFtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3VwLnRlYW1zID0gbmV3VGVhbXM7XG5cbiAgICAgICAgICAgIGxldCBuZXdNYXRjaGVzOiBNYXRjaFtdID0gW107XG4gICAgICAgICAgICBncm91cC5tYXRjaGVzLmZvckVhY2gobWF0Y2ggID0+IHtcbiAgICAgICAgICAgICAgICBuZXdNYXRjaGVzLnB1c2goTWF0Y2guZGVzZXJpYWxpemUobWF0Y2gpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXAubWF0Y2hlcyA9IG5ld01hdGNoZXM7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwLnRzIiwiaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi9UZWFtXCI7XG5pbXBvcnQgeyBIT01FX1RFQU1fV0lOUywgTUFUQ0hfSVNfRFJBVywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY2xhc3MgTWF0Y2h7XG4gICAgaG9tZVRlYW1OYW1lIDogc3RyaW5nO1xuICAgIG91dFRlYW1OYW1lOiBzdHJpbmc7XG4gICAgaG9tZVRlYW1TY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuICAgIG91dFRlYW1TY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoaG9tZVRlYW1OYW1lOiBzdHJpbmcsIG91dFRlYW1OYW1lIDogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5ob21lVGVhbU5hbWUgPSBob21lVGVhbU5hbWU7XG4gICAgICAgIHRoaXMub3V0VGVhbU5hbWUgPSBvdXRUZWFtTmFtZTtcbiAgICB9XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBpZih0aGlzLmhvbWVUZWFtU2NvcmUgPiB0aGlzLm91dFRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm91dFRlYW1TY29yZSA+IHRoaXMuaG9tZVRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gT1VUX1RFQU1fV0lOUztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTUFUQ0hfSVNfRFJBVztcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBNYXRjaCB7XG4gICAgICAgIGNvbnN0IG0gPSBuZXcgTWF0Y2goaW5wdXQuaG9tZVRlYW1OYW1lLCBpbnB1dC5vdXRUZWFtTmFtZSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obSwgaW5wdXQpO1xuICAgICAgICByZXR1cm4gbTtcblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBjbGFzcyBLbm9ja291dE1hdGNoIGV4dGVuZHMgTWF0Y2gge1xuICAgIGhvbWVUZWFtUGVuYWx0eVNjb3JlIDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICAgIG91dFRlYW1QZW5hbHR5U2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIGdldE91dENvbWUoKSA6IG51bWJlciB7XG4gICAgICAgIGxldCBvdXRDb21lID0gIHN1cGVyLmdldE91dENvbWUoKTtcbiAgICAgICAgaWYob3V0Q29tZSA9PSBNQVRDSF9JU19EUkFXKXtcbiAgICAgICAgICAgIC8vVGhpcyBtZWFucyBtYXRjaCB3YXMgd2l0aCBwZW5hbHMgLi4uXG4gICAgICAgICAgICBpZih0aGlzLmhvbWVUZWFtUGVuYWx0eVNjb3JlID4gdGhpcy5vdXRUZWFtUGVuYWx0eVNjb3JlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlNcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9VVF9URUFNX1dJTlNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0Q29tZVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL01hdGNoLnRzIiwiaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4vR3JvdXBcIjtcbmltcG9ydCB7S25vY2tPdXRSb3VuZH0gZnJvbSBcIi4vS25vY2tPdXRSb3VuZFwiO1xuXG5leHBvcnQgY2xhc3MgVG91cm5hbWVudHtcblxuICAgIGdyb3VwcyA6IEdyb3VwW10gPSAgW107XG4gICAga25vY2tPdXRSb3VuZHMgOiAgS25vY2tPdXRSb3VuZFtdID0gW107XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmVkL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnQudHMiLCJpbXBvcnQge0tub2Nrb3V0TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5cbmV4cG9ydCBjbGFzcyBLbm9ja091dFJvdW5kIHtcblxuICAgIG5hbWU6IHN0cmluZztcbiAgICBtYXRjaGVzOiBLbm9ja291dE1hdGNoW107XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1hdGNoZXMgOiBLbm9ja291dE1hdGNoW10pe1xuICAgICAgICB0aGlzLm5hbWUgPSAgbmFtZTtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gIG1hdGNoZXM7XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Lbm9ja091dFJvdW5kLnRzIiwiaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudDogVG91cm5hbWVudCkgOnZvaWQge1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDA7XG5cblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6dm9pZHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG5cbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gNDtcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50IDogVG91cm5hbWVudCkgOiB2b2lkIHtcbiAgICAvL3NldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gNDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQi5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gNDtcbiAgICBncm91cEIubWF0Y2hlc1syXS5vdXRUZWFtU2NvcmUgPSAwO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbM10ub3V0VGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQi5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDI7XG5cbiAgICBncm91cEIubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbiAgICBncm91cEIubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAwO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdC9TcGVjSGVscGVycy50cyJdLCJzb3VyY2VSb290IjoiIn0=