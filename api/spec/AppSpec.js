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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/index.spec.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/shared/models/Constants.ts":
/*!****************************************!*\
  !*** ./src/shared/models/Constants.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HOME_TEAM_WINS = 1;
exports.OUT_TEAM_WINS = 2;
exports.MATCH_IS_DRAW = 0;
exports.COOKIE_NAME = "j_uid";


/***/ }),

/***/ "./src/shared/models/pronostiek/Group.ts":
/*!***********************************************!*\
  !*** ./src/shared/models/pronostiek/Group.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = __webpack_require__(/*! ./Team */ "./src/shared/models/pronostiek/Team.ts");
const Match_1 = __webpack_require__(/*! ./Match */ "./src/shared/models/pronostiek/Match.ts");
const Constants_1 = __webpack_require__(/*! ../Constants */ "./src/shared/models/Constants.ts");
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

/***/ "./src/shared/models/pronostiek/KnockOutRound.ts":
/*!*******************************************************!*\
  !*** ./src/shared/models/pronostiek/KnockOutRound.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Match_1 = __webpack_require__(/*! ./Match */ "./src/shared/models/pronostiek/Match.ts");
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

/***/ "./src/shared/models/pronostiek/Match.ts":
/*!***********************************************!*\
  !*** ./src/shared/models/pronostiek/Match.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = __webpack_require__(/*! ../Constants */ "./src/shared/models/Constants.ts");
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
        this.homeTeamWins = false;
        this.outTeamWins = false;
    }
    getOutCome() {
        if (this.homeTeamWins) {
            return Constants_1.HOME_TEAM_WINS;
        }
        else if (this.outTeamWins) {
            return Constants_1.OUT_TEAM_WINS;
        }
        return Constants_1.MATCH_IS_DRAW;
    }
}
exports.KnockoutMatch = KnockoutMatch;


/***/ }),

/***/ "./src/shared/models/pronostiek/Team.ts":
/*!**********************************************!*\
  !*** ./src/shared/models/pronostiek/Team.ts ***!
  \**********************************************/
/*! no static exports found */
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

/***/ "./src/shared/models/pronostiek/Tournament.ts":
/*!****************************************************!*\
  !*** ./src/shared/models/pronostiek/Tournament.ts ***!
  \****************************************************/
/*! no static exports found */
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

/***/ "./src/shared/utils/TournamentUtils.ts":
/*!*********************************************!*\
  !*** ./src/shared/utils/TournamentUtils.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Tournament_1 = __webpack_require__(/*! ./../models/pronostiek/Tournament */ "./src/shared/models/pronostiek/Tournament.ts");
const Team_1 = __webpack_require__(/*! ../models/pronostiek/Team */ "./src/shared/models/pronostiek/Team.ts");
const Group_1 = __webpack_require__(/*! ../models/pronostiek/Group */ "./src/shared/models/pronostiek/Group.ts");
const KnockOutRound_1 = __webpack_require__(/*! ../models/pronostiek/KnockOutRound */ "./src/shared/models/pronostiek/KnockOutRound.ts");
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
    // tournament.groups.forEach((group) => {
    //     group.matches.forEach((match,index) => {
    //         if(index < 5){
    //             match.homeTeamScore = Math.round(Math.random()*5);
    //             match.outTeamScore = Math.round(Math.random()*5);
    //         }
    //     });
    //     group.processMatches();
    // });
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
/*
    Winner 1 v. Winner 3 = A
    Winner 2 v. Winner 4 = B
    Winner 5 v. Winner 7 = C
    Winner 6 v. Winner 8 = D

    Semies:
    Winner 1 v. Winner 3
    Winner 2 v. Winner 4



*/
function addToNextKnockoutRound(tournament, roundIndex, matchIndex, winningTeam) {
    if (roundIndex == 3) {
        // this is the final
        return;
    }
    let matchIndexToAddTo;
    let homeTeam = true;
    if (roundIndex == 0) {
        if (matchIndex == 0 || matchIndex == 2) {
            matchIndexToAddTo = 0;
        }
        else if (matchIndex == 1 || matchIndex == 3) {
            matchIndexToAddTo = 1;
        }
        else if (matchIndex == 4 || matchIndex == 6) {
            matchIndexToAddTo = 2;
        }
        else if (matchIndex == 5 || matchIndex == 7) {
            matchIndexToAddTo = 3;
        }
        if (matchIndex == 2 || matchIndex == 3 || matchIndex == 6 || matchIndex == 7) {
            homeTeam = false;
        }
    }
    else if (roundIndex == 1) {
        if (matchIndex == 0 || matchIndex == 2) {
            matchIndexToAddTo = 0;
        }
        else {
            matchIndexToAddTo = 1;
        }
        if (matchIndex == 2 || matchIndex == 3) {
            homeTeam = false;
        }
    }
    else {
        matchIndexToAddTo = 0;
        if (matchIndex == 1) {
            homeTeam = false;
        }
    }
    let matchToAddTo = tournament.rounds[roundIndex + 1].matches[matchIndexToAddTo];
    if (homeTeam) {
        matchToAddTo.homeTeamName = winningTeam;
    }
    else {
        matchToAddTo.outTeamName = winningTeam;
    }
}
exports.addToNextKnockoutRound = addToNextKnockoutRound;
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

/***/ "./test/SpecHelpers.ts":
/*!*****************************!*\
  !*** ./test/SpecHelpers.ts ***!
  \*****************************/
/*! no static exports found */
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


/***/ }),

/***/ "./test/index.spec.ts":
/*!****************************!*\
  !*** ./test/index.spec.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TournamentUtils_1 = __webpack_require__(/*! ../src/shared/utils/TournamentUtils */ "./src/shared/utils/TournamentUtils.ts");
const SpecHelpers_1 = __webpack_require__(/*! ./SpecHelpers */ "./test/SpecHelpers.ts");
describe("this will test the processing of the group matches:", function () {
    let tournament = TournamentUtils_1.getTournament();
    it("tournament should contain group1 A", function () {
        expect(tournament.groups[0].groupname).toEqual("Groep A");
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
describe("it should add teams to next knockoutround", function () {
    var tournament = TournamentUtils_1.getTournament();
    const winningTeam = "winners";
    TournamentUtils_1.addToNextKnockoutRound(tournament, 0, 0, winningTeam);
    it("should have added to first", function () {
        expect(tournament.rounds[1].matches[0].homeTeamName).toBe(winningTeam);
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvR3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Lbm9ja091dFJvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9UZWFtLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbW9kZWxzL3Byb25vc3RpZWsvVG91cm5hbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi90ZXN0L1NwZWNIZWxwZXJzLnRzIiwid2VicGFjazovLy8uL3Rlc3QvaW5kZXguc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVhLHNCQUFjLEdBQWEs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QUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQywyQ0FBMkMsRUFBRTtJQUNsRCxJQUFJLFVBQVUsR0FBRywrQkFBYSxFQUFFLENBQUM7SUFDakMsTUFBTSxXQUFXLEdBQUcsU0FBUztJQUM3Qix3Q0FBc0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxXQUFXLENBQUMsQ0FBQztJQUN2RCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRSxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJBcHBTcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC9pbmRleC5zcGVjLnRzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IEhPTUVfVEVBTV9XSU5TIDogbnVtYmVyID0gIDE7XG5leHBvcnQgY29uc3QgT1VUX1RFQU1fV0lOUyA6IG51bWJlciA9ICAyO1xuZXhwb3J0IGNvbnN0IE1BVENIX0lTX0RSQVcgOiBudW1iZXI9ICAwO1xuXG5leHBvcnQgY29uc3QgQ09PS0lFX05BTUUgOiBzdHJpbmcgPSBcImpfdWlkXCI7XG4iLCJpbXBvcnQge1RlYW19IGZyb20gXCIuL1RlYW1cIjtcbmltcG9ydCB7TWF0Y2h9IGZyb20gXCIuL01hdGNoXCI7XG5pbXBvcnQge0hPTUVfVEVBTV9XSU5TLCBPVVRfVEVBTV9XSU5TfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCAgY2xhc3MgR3JvdXAge1xuXG4gICAgZ3JvdXBuYW1lIDogc3RyaW5nO1xuICAgIHRlYW1zIDogVGVhbVtdO1xuICAgIG1hdGNoZXMgOiBNYXRjaFtdO1xuICAgIGFsbE1hdGNoZXNQbGF5ZWQgOiBib29sZWFuID0gZmFsc2U7XG4gICAgIGdyb3VwTmVlZHNEcmF3IDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICBlcXVhbFRlYW1zIDogVGVhbVtdW107XG5cbiAgICBjb25zdHJ1Y3Rvcihncm91cG5hbWU/OnN0cmluZywgdGVhbXM/OiBUZWFtW10pe1xuICAgICAgICB0aGlzLmdyb3VwbmFtZSA9Z3JvdXBuYW1lO1xuICAgICAgICB0aGlzLnRlYW1zID0gdGVhbXM7XG4gICAgICAgIGlmKHRoaXMudGVhbXMpe1xuICAgICAgICAgICAgdGhpcy5pbml0TWF0Y2hlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TWF0Y2hlcygpIDogIHZvaWR7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzBdLm5hbWUsIHRoaXMudGVhbXNbMV0ubmFtZSkpO1xuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1syXS5uYW1lLCB0aGlzLnRlYW1zWzNdLm5hbWUpKTtcblxuICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgTWF0Y2godGhpcy50ZWFtc1swXS5uYW1lLCB0aGlzLnRlYW1zWzJdLm5hbWUpKTtcbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1sxXS5uYW1lKSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLnB1c2gobmV3IE1hdGNoKHRoaXMudGVhbXNbM10ubmFtZSwgdGhpcy50ZWFtc1swXS5uYW1lKSk7XG4gICAgICAgIHRoaXMubWF0Y2hlcy5wdXNoKG5ldyBNYXRjaCh0aGlzLnRlYW1zWzFdLm5hbWUsIHRoaXMudGVhbXNbMl0ubmFtZSkpO1xuICAgIH1cblxuICAgIHByb2Nlc3NNYXRjaGVzKCkgOiB2b2lke1xuXG4gICAgICAgIHRoaXMuYWxsTWF0Y2hlc1BsYXllZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgIHRlYW0ucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBpZihtYXRjaC5vdXRUZWFtU2NvcmUgIT0gdW5kZWZpbmVkICYmIG1hdGNoLmhvbWVUZWFtU2NvcmUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWVhbnMgbWF0Y2ggaXMgcGxheWVkLCBzbyBsZXQgZG8gd2hhdCB3ZSBuZWVkIHRvIGRvOlxuICAgICAgICAgICAgICAgIGxldCBtYXRjaE91dENvbWUgPSBtYXRjaC5nZXRPdXRDb21lKCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvbWVUZWFtID0gdGhpcy5nZXRUZWFtKG1hdGNoLmhvbWVUZWFtTmFtZSk7XG4gICAgICAgICAgICAgICAgbGV0IG91dFRlYW0gPSB0aGlzLmdldFRlYW0obWF0Y2gub3V0VGVhbU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmKG1hdGNoT3V0Q29tZSA9PSBIT01FX1RFQU1fV0lOUyl7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5tYXRjaGVzV29uKys7XG4gICAgICAgICAgICAgICAgICAgIG91dFRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hPdXRDb21lID09IE9VVF9URUFNX1dJTlMpe1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLnBvaW50cyArPSAzO1xuICAgICAgICAgICAgICAgICAgICBvdXRUZWFtLm1hdGNoZXNXb24rKztcbiAgICAgICAgICAgICAgICAgICAgaG9tZVRlYW0ubWF0Y2hlc0xvc3QrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob21lVGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5wb2ludHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgb3V0VGVhbS5tYXRjaGVzRHJhd2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGhvbWVUZWFtLm1hdGNoZXNEcmF3ZWQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc1Njb3JlZCArPSBtYXRjaC5vdXRUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgb3V0VGVhbS5nb2Fsc0NvbmNpZXZlZCArPSBtYXRjaC5ob21lVGVhbVNjb3JlO1xuICAgICAgICAgICAgICAgIGhvbWVUZWFtLmdvYWxzU2NvcmVkICs9IG1hdGNoLmhvbWVUZWFtU2NvcmU7XG4gICAgICAgICAgICAgICAgaG9tZVRlYW0uZ29hbHNDb25jaWV2ZWQgKz0gbWF0Y2gub3V0VGVhbVNjb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbE1hdGNoZXNQbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2lmIGFsbCBwbGF5ZWQgbWF0Y2hlcyBhcmUgZG9uZSwgd2UgcHV0IHRoZSBwb2ludHM6XG4gICAgICAgIHRoaXMudGVhbXMuZm9yRWFjaCgodGVhbSk9PntcbiAgICAgICAgICAgIHRlYW0ucG9pbnRzID0gdGVhbS5tYXRjaGVzV29uKjMgKyB0ZWFtLm1hdGNoZXNEcmF3ZWQ7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICAvL3RoaXMgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0ZWFtbmFtZSBwYXNzZWQgdG8gdGhlIG1ldGhvZDpcbiAgICBnZXRUZWFtKG5hbWU6c3RyaW5nKSA6IFRlYW17XG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaW50R3JvdXBTdGFuZGluZygpIHtcbiAgICAgICAgdGhpcy50ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0ZWFtLm5hbWV9ICB3OiR7dGVhbS5tYXRjaGVzV29ufSAgZDoke3RlYW0ubWF0Y2hlc0RyYXdlZH0gbDoke3RlYW0ubWF0Y2hlc0xvc3R9IHM6JHt0ZWFtLmdvYWxzU2NvcmVkfSBjOiR7dGVhbS5nb2Fsc0NvbmNpZXZlZH0gUDoke3RlYW0ucG9pbnRzfWApXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFsbCBwbGF5ZWQ6IFwiICsgdGhpcy5hbGxNYXRjaGVzUGxheWVkKTtcbiAgICB9XG5cbiAgICBwcmludEdyb3VwTWF0Y2hlcygpe1xuICAgICAgICB0aGlzLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke21hdGNoLmhvbWVUZWFtTmFtZX0gLSAke21hdGNoLm91dFRlYW1OYW1lfSA6ICR7bWF0Y2guaG9tZVRlYW1TY29yZX0gLSAke21hdGNoLm91dFRlYW1TY29yZX1gKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRFcXVhbFRlYW1zKCkgOiBUZWFtW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsVGVhbXMgO1xuICAgIH1cblxuICAgIGdldEFsbE1hdGNoZXNQbGF5ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxNYXRjaGVzUGxheWVkO1xuICAgIH1cblxuXG4gICAgYWRkVG9FcXVhbFRlYW1zKHRlYW1zVG9BZGQgOiBUZWFtW10pIDogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuZ2V0RXF1YWxUZWFtcygpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvLyBmaXJzdCwganVzdCBhZGQgaXQ6XG4gICAgICAgICAgICB0aGlzLmVxdWFsVGVhbXMucHVzaCh0ZWFtc1RvQWRkKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIGFkZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGNoZWNrIGlzIG9uZSBvZiB0aGUgMiB0ZWFtcyBhbHJlYWR5IGlzIGluIG9uIG9mIHRoZSBhcnJheXMgdGhhdCB3YXMgYWxyZWFkeSBhZGRlZDpcbiAgICAgICAgICAgIGZvcih2YXIgYWxyZWFkeUFkZGVkVGVhbXMgb2YgdGhpcy5lcXVhbFRlYW1zKXtcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIGl0IGNvbnRhaW5zIG9uZSBvZiB0aGVtOlxuICAgICAgICAgICAgICAgIHZhciBpbmRleE9mRXhpc3RpbmdUZWFtID0gMDtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHRlYW1Ub0FkZCBvZiB0ZWFtc1RvQWRkKXtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBpdCBhbHJlYWR5IGluIHRoZXJlLCBqdXN0IGFkZCB0aGUgb3RoZXIgb25lIGFzIHdlbGwgYW5kIHdlIGFyZSBkb25lOlxuICAgICAgICAgICAgICAgICAgICBpZihhbHJlYWR5QWRkZWRUZWFtcy5sYXN0SW5kZXhPZih0ZWFtVG9BZGQpICE9IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2ZFeGlzdGluZ1RlYW0rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIDIsIHRoaXMgbWVhbnMgd2UgZGlkIG5vdCBmaW5kIHRoZSB0ZWFtIGluIGFscmVhZHlBZGRlZFRlYW1zXG4gICAgICAgICAgICAgICAgaWYoaW5kZXhPZkV4aXN0aW5nVGVhbSAhPSAyKXtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiBpcyAwIG9yIDEsIHdlIGZvdW5kIGlzLCBzbyB3ZSBuZWVkIHRvIGFkZCB0aGUgb3RoZXIgdGVhbS5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4T2ZUZWFtVG9BZGQgPSBpbmRleE9mRXhpc3RpbmdUZWFtID09IDEgPyAwIDogMTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleE9mVGVhbVRvQWRkKTtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeUFkZGVkVGVhbXMucHVzaCh0ZWFtc1RvQWRkW2luZGV4T2ZUZWFtVG9BZGRdKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFkZGVkKXtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIG1lYW4gdGVhbXMgYXJlIGVxdWFsIDIgb24gMlxuICAgICAgICAgICAgICAgIHRoaXMuZXF1YWxUZWFtcy5wdXNoKHRlYW1zVG9BZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHB1cmVseSBmb3IgaGVscGluZyBtZXRob2Q6XG4gICAgICovXG4gICAgIGNvbnRhaW5zVGVhbVdpdGhOYW1lKG5hbWU6U3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICBmb3IodmFyIHRlYW0gb2YgdGhpcy50ZWFtcyl7XG4gICAgICAgICAgICBpZih0ZWFtLm5hbWUgPT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBHcm91cCB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IG5ldyBHcm91cCgpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihncm91cCwgaW5wdXQpO1xuXG4gICAgICAgICAgICBsZXQgbmV3VGVhbXM6IFRlYW1bXSA9IFtdO1xuICAgICAgICAgICAgZ3JvdXAudGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgbmV3VGVhbXMucHVzaChUZWFtLmRlc2VyaWFsaXplKHRlYW0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXAudGVhbXMgPSBuZXdUZWFtcztcblxuICAgICAgICAgICAgbGV0IG5ld01hdGNoZXM6IE1hdGNoW10gPSBbXTtcbiAgICAgICAgICAgIGdyb3VwLm1hdGNoZXMuZm9yRWFjaChtYXRjaCAgPT4ge1xuICAgICAgICAgICAgICAgIG5ld01hdGNoZXMucHVzaChNYXRjaC5kZXNlcmlhbGl6ZShtYXRjaCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBncm91cC5tYXRjaGVzID0gbmV3TWF0Y2hlcztcbiAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cblxufVxuXG5cblxuXG5cbiIsImltcG9ydCB7S25vY2tvdXRNYXRjaH0gZnJvbSBcIi4vTWF0Y2hcIjtcblxuZXhwb3J0IGNsYXNzIEtub2NrT3V0Um91bmQge1xuXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG1hdGNoZXM6IEtub2Nrb3V0TWF0Y2hbXTtcbiAgICBudW1iZXJPZlBsYWNlczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBudW1iZXJPZk1hdGNoZXMgOiBudW1iZXIpe1xuICAgICAgICB0aGlzLm5hbWUgPSAgbmFtZTtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBudW1iZXJPZk1hdGNoZXM7IGkrKyl7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZXMucHVzaChuZXcgS25vY2tvdXRNYXRjaCh1bmRlZmluZWQsIHVuZGVmaW5lZCkpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi9UZWFtXCI7XG5pbXBvcnQgeyBIT01FX1RFQU1fV0lOUywgTUFUQ0hfSVNfRFJBVywgT1VUX1RFQU1fV0lOU30gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgY2xhc3MgTWF0Y2h7XG4gICAgaG9tZVRlYW1OYW1lIDogc3RyaW5nO1xuICAgIG91dFRlYW1OYW1lOiBzdHJpbmc7XG4gICAgaG9tZVRlYW1TY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuICAgIG91dFRlYW1TY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoaG9tZVRlYW1OYW1lOiBzdHJpbmcsIG91dFRlYW1OYW1lIDogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5ob21lVGVhbU5hbWUgPSBob21lVGVhbU5hbWU7XG4gICAgICAgIHRoaXMub3V0VGVhbU5hbWUgPSBvdXRUZWFtTmFtZTtcbiAgICB9XG5cbiAgICBnZXRPdXRDb21lKCkgOiBudW1iZXIge1xuICAgICAgICBpZih0aGlzLmhvbWVUZWFtU2NvcmUgPiB0aGlzLm91dFRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm91dFRlYW1TY29yZSA+IHRoaXMuaG9tZVRlYW1TY29yZSl7XG4gICAgICAgICAgICByZXR1cm4gT1VUX1RFQU1fV0lOUztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTUFUQ0hfSVNfRFJBVztcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVzZXJpYWxpemUoaW5wdXQ6IGFueSkgOiBNYXRjaCB7XG4gICAgICAgIGNvbnN0IG0gPSBuZXcgTWF0Y2goaW5wdXQuaG9tZVRlYW1OYW1lLCBpbnB1dC5vdXRUZWFtTmFtZSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obSwgaW5wdXQpO1xuICAgICAgICByZXR1cm4gbTtcblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBjbGFzcyBLbm9ja291dE1hdGNoIGV4dGVuZHMgTWF0Y2gge1xuICAgIFxuICAgIGhvbWVUZWFtUGVuYWx0eVNjb3JlIDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICAgIG91dFRlYW1QZW5hbHR5U2NvcmU6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgICBob21lVGVhbVdpbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvdXRUZWFtV2luczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0T3V0Q29tZSgpIDogbnVtYmVyIHtcblxuICAgICAgICBpZih0aGlzLmhvbWVUZWFtV2lucyl7XG4gICAgICAgICAgICByZXR1cm4gSE9NRV9URUFNX1dJTlM7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm91dFRlYW1XaW5zKXtcbiAgICAgICAgICAgIHJldHVybiBPVVRfVEVBTV9XSU5TO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNQVRDSF9JU19EUkFXO1xuICAgIH1cbn0iLCJpbXBvcnQge0dyb3VwfSBmcm9tIFwiLi9Hcm91cFwiO1xuXG5leHBvcnQgY2xhc3MgVGVhbSB7XG5cbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHBvaW50czogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc1dvbjogbnVtYmVyID0gMCA7XG4gICAgbWF0Y2hlc0xvc3Q6IG51bWJlciA9IDA7XG4gICAgbWF0Y2hlc0RyYXdlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc1Njb3JlZDogbnVtYmVyID0gMDtcbiAgICBnb2Fsc0NvbmNpZXZlZDogbnVtYmVyID0gMDtcbiAgICBzdWJHcm91cEluZGV4OiBudW1iZXIgPSAwO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyl7XG4gICAgICAgIHRoaXMubmFtZSA9ICBuYW1lO1xuICAgIH1cblxuXG5cbiAgICByZXNldCgpIDp2b2lkIHtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IDA7XG5cbiAgICAgICAgdGhpcy5tYXRjaGVzRHJhd2VkID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzV29uID0gMDtcbiAgICAgICAgdGhpcy5tYXRjaGVzTG9zdCA9IDA7XG5cbiAgICAgICAgdGhpcy5nb2Fsc1Njb3JlZCA9IDA7XG4gICAgICAgIHRoaXMuZ29hbHNDb25jaWV2ZWQgPSAwO1xuICAgICAgICB0aGlzLnN1Ykdyb3VwSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGdldEdvYWxzRGlmZmVyZW5jZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbHNTY29yZWQgLSB0aGlzLmdvYWxzQ29uY2lldmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZXNlcmlhbGl6ZShpbnB1dDogYW55KSA6IFRlYW0ge1xuICAgICAgICBjb25zdCBuYW1lID0gaW5wdXQubmFtZTtcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBUZWFtKG5hbWUpO1xuICAgICAgICAvKk9iamVjdC5hc3NpZ24oVGVhbSwgaW5wdXQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZWFtKTsqL1xuICAgICAgICB0ZWFtLnBvaW50cyA9ICBOdW1iZXIoaW5wdXQucG9pbnRzKTtcbiAgICAgICAgdGVhbS5tYXRjaGVzV29uID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNXb24pO1xuICAgICAgICB0ZWFtLm1hdGNoZXNMb3N0ID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNMb3N0KTtcbiAgICAgICAgdGVhbS5tYXRjaGVzRHJhd2VkID0gTnVtYmVyKGlucHV0Lm1hdGNoZXNEcmF3ZWQpO1xuICAgICAgICB0ZWFtLmdvYWxzU2NvcmVkID0gTnVtYmVyKGlucHV0LmdvYWxzU2NvcmVkKTtcbiAgICAgICAgdGVhbS5nb2Fsc0NvbmNpZXZlZCA9IE51bWJlcihpbnB1dC5nb2Fsc0NvbmNpZXZlZCk7XG4gICAgICAgIHRlYW0uc3ViR3JvdXBJbmRleCA9IE51bWJlcihpbnB1dC5zdWJHcm91cEluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRlYW07XG5cbiAgICB9XG5cblxufSIsImltcG9ydCB7R3JvdXB9IGZyb20gXCIuL0dyb3VwXCI7XG5pbXBvcnQge0tub2NrT3V0Um91bmR9IGZyb20gXCIuL0tub2NrT3V0Um91bmRcIjtcblxuZXhwb3J0IGNsYXNzIFRvdXJuYW1lbnR7XG5cbiAgICBncm91cHMgOiBHcm91cFtdID0gIFtdO1xuICAgIHJvdW5kcyA6ICBLbm9ja091dFJvdW5kW10gPSBbXTtcblxufSIsImltcG9ydCB7IFRvdXJuYW1lbnQgfSBmcm9tICcuLy4uL21vZGVscy9wcm9ub3N0aWVrL1RvdXJuYW1lbnQnO1xuaW1wb3J0IHsgS25vY2tvdXRNYXRjaCB9IGZyb20gJy4vLi4vbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2gnO1xuaW1wb3J0IHtQcm9ub3N0aWVrfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvUHJvbm9zdGlla1wiO1xuaW1wb3J0IHtUZWFtfSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvVGVhbVwiO1xuaW1wb3J0IHtHcm91cH0gZnJvbSBcIi4uL21vZGVscy9wcm9ub3N0aWVrL0dyb3VwXCI7XG5pbXBvcnQge01hdGNofSBmcm9tIFwiLi4vbW9kZWxzL3Byb25vc3RpZWsvTWF0Y2hcIjtcbmltcG9ydCB7SE9NRV9URUFNX1dJTlMsIE9VVF9URUFNX1dJTlN9IGZyb20gXCIuLi9tb2RlbHMvQ29uc3RhbnRzXCI7XG5pbXBvcnQge0tub2NrT3V0Um91bmR9IGZyb20gXCIuLi9tb2RlbHMvcHJvbm9zdGllay9Lbm9ja091dFJvdW5kXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3VybmFtZW50KCkgOiBUb3VybmFtZW50IHtcblxuICAgIGNvbnNvbGUubG9nKFwiKioqKiogUHJvbm9zdGllayBnZW5lcmF0aW9uIFN0YXJ0aW5nICoqKipcIik7XG5cbiAgICBsZXQgdG91cm5hbWVudCA6IFRvdXJuYW1lbnQgPSBuZXcgVG91cm5hbWVudCgpO1xuXG4gICAgbGV0IGFsbFRlYW1zID0gIFtcbiAgICAgICAgW1wiUnVzc2lhXCIsIFwiU2F1ZGkgQXJhYmlhXCIsIFwiRWd5cHRcIiwgXCJVcnVndWF5XCJdLFxuICAgICAgICBbXCJQb3J0dWdhbFwiLCBcIlNwYWluXCIsIFwiTW9yb2Njb1wiLCBcIklyYW5cIl0sXG4gICAgICAgIFtcIkZyYW5jZVwiLCBcIkF1c3RyYWxpYVwiLCBcIlBlcnVcIiwgXCJEZW5tYXJrXCJdLFxuICAgICAgICBbXCJBcmdlbnRpbmFcIiwgXCJJY2VsYW5kXCIsIFwiQ3JvYXRpYVwiLCBcIk5pZ2VyaWFcIl0sXG4gICAgICAgIFtcIkJyYXppbFwiLCBcIlN3aXR6ZXJsYW5kXCIsIFwiQ29zdGEgUmljYVwiLCBcIlNlcmJpYVwiXSxcbiAgICAgICAgW1wiR2VybWFueVwiLCBcIk1leGljb1wiLCBcIlN3ZWRlblwiLCBcIktvcmVhIFJlcHVibGljXCJdLFxuICAgICAgICBbXCJCZWxnaXVtXCIsIFwiUGFuYW1hXCIsIFwiVHVuaXNpYVwiLCBcIkVuZ2xhbmRcIl0sXG4gICAgICAgIFtcIlBvbGFuZFwiLCBcIlNlbmVnYWxcIiwgXCJDb2xvbWJpYVwiLCBcIkphcGFuXCJdLFxuICAgIF07XG5cbiAgICBsZXQgZ3JvdXBMZXR0ZXIgPSBbXCJBXCIsIFwiQlwiLCBcIkNcIiwgXCJEXCIsIFwiRVwiLCBcIkZcIiwgXCJHXCIsIFwiSFwiXTtcblxuICAgIGFsbFRlYW1zLmZvckVhY2goIChncm91cFRlYW1zTmFtZXMsaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHRlYW1zOiBUZWFtW10gPSBbXTtcbiAgICAgICAgZ3JvdXBUZWFtc05hbWVzLmZvckVhY2godGVhbU5hbWUgPT4ge1xuICAgICAgICAgICAgdGVhbXMucHVzaChuZXcgVGVhbSh0ZWFtTmFtZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGdyb3VwID0gbmV3IEdyb3VwIChcIkdyb2VwIFwiICsgZ3JvdXBMZXR0ZXJbaW5kZXhdLCB0ZWFtcyk7XG4gICAgICAgIHRvdXJuYW1lbnQuZ3JvdXBzLnB1c2goZ3JvdXApO1xuICAgIH0pO1xuXG4gICAgbGV0IHJvdW5kcz1bXG4gICAgICAgIHtuYW1lOlwiUm91bmQgb2YgMTZcIixudW1iZXJPZk1hdGNoZXM6OH0sXG4gICAgICAgIHtuYW1lOlwiUXVhcnRlciBGaW5hbFwiLG51bWJlck9mTWF0Y2hlczo0fSxcbiAgICAgICAge25hbWU6XCJTZW1pIEZpbmFsXCIsbnVtYmVyT2ZNYXRjaGVzOjJ9LFxuICAgICAgICB7bmFtZTpcIkZpbmFsXCIsbnVtYmVyT2ZNYXRjaGVzOjF9XG4gICAgICAgIF07XG5cbiAgICByb3VuZHMuZm9yRWFjaCgocm91bmREYXRhKSA9PiB7XG4gICAgICAgIGxldCBrbm9ja091dFJvdW5kID0gbmV3IEtub2NrT3V0Um91bmQocm91bmREYXRhLm5hbWUsIHJvdW5kRGF0YS5udW1iZXJPZk1hdGNoZXMpO1xuICAgICAgICB0b3VybmFtZW50LnJvdW5kcy5wdXNoKGtub2NrT3V0Um91bmQpO1xuICAgIH0pO1xuXG5cbiAgICAvLyBGT1IgREVWIFBVUlBPU0VTOlxuICAgIC8vIHRvdXJuYW1lbnQuZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgLy8gICAgIGdyb3VwLm1hdGNoZXMuZm9yRWFjaCgobWF0Y2gsaW5kZXgpID0+IHtcbiAgICAvLyAgICAgICAgIGlmKGluZGV4IDwgNSl7XG4gICAgLy8gICAgICAgICAgICAgbWF0Y2guaG9tZVRlYW1TY29yZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSo1KTtcbiAgICAvLyAgICAgICAgICAgICBtYXRjaC5vdXRUZWFtU2NvcmUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqNSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICBncm91cC5wcm9jZXNzTWF0Y2hlcygpO1xuICAgIC8vIH0pO1xuICAgIC8vIEVORFxuICAgIFxuICAgIHJldHVybiB0b3VybmFtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVRlYW1zKHRlYW1hOiBUZWFtLCB0ZWFtYiA6IFRlYW0pIDogbnVtYmVyIHtcblxuICAgIGlmKHRlYW1hLnBvaW50cyAhPSB0ZWFtYi5wb2ludHMpe1xuICAgICAgICAvL2NvbXBhcmUgb24gcG9pbnRzOlxuICAgICAgICByZXR1cm4gdGVhbWIucG9pbnRzIC0gdGVhbWEucG9pbnRzO1xuICAgIH0gZWxzZSBpZih0ZWFtYS5nZXRHb2Fsc0RpZmZlcmVuY2UoKSAhPSB0ZWFtYi5nZXRHb2Fsc0RpZmZlcmVuY2UoKSl7XG4gICAgICAgIC8vY29tcGFyZSBvbiBnb2FsIGRpZmY6XG4gICAgICAgIHJldHVybiB0ZWFtYi5nZXRHb2Fsc0RpZmZlcmVuY2UoKSAtdGVhbWEuZ2V0R29hbHNEaWZmZXJlbmNlKCk7XG4gICAgfSBlbHNlIGlmKHRlYW1hLmdvYWxzU2NvcmVkICE9IHRlYW1iLmdvYWxzU2NvcmVkKXtcbiAgICAgICAgLy8gb24gZ29hbHMgc2NvcmVkOlxuICAgICAgICByZXR1cm4gdGVhbWIuZ29hbHNTY29yZWQgLSB0ZWFtYS5nb2Fsc1Njb3JlZDtcbiAgICB9XG4gICAgcmV0dXJuIDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdGNoZXNGcm9tVGVhbXModGVhbXMgOiBUZWFtW10sIGFsbE1hdGNoZXMgOiBNYXRjaFtdKSA6IE1hdGNoW10ge1xuICAgIHZhciB0ZWFtTmFtZXMgID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICB0ZWFtcy5mb3JFYWNoKCh0ZWFtKSA9PiB7XG4gICAgICAgdGVhbU5hbWVzLnB1c2godGVhbS5uYW1lKTtcbiAgICB9KTtcblxuICAgIHZhciByZXR1cm5WYWwgOiBNYXRjaCBbXSA9IG5ldyBBcnJheTxNYXRjaD4oKTtcbiAgICBhbGxNYXRjaGVzLmZvckVhY2goKG1hdGNoKSA9PiB7XG4gICAgICAgaWYodGVhbU5hbWVzLmluZGV4T2YobWF0Y2guaG9tZVRlYW1OYW1lKSAhPSAtMSAmJiB0ZWFtTmFtZXMuaW5kZXhPZihtYXRjaC5vdXRUZWFtTmFtZSkgIT0gLTEpe1xuICAgICAgICAgICAgIHJldHVyblZhbC5wdXNoKE9iamVjdC5jcmVhdGUobWF0Y2gpKTtcbiAgICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ViR3JvdXAodGVhbXMgOiBUZWFtW10sIG9yaWdpbmFsR3JvdXAgOiBHcm91cCkgOiAgR3JvdXAge1xuICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICAgZ3JvdXAudGVhbXMgPSBbXVxuICAgIGZvcih2YXIgdCBvZiB0ZWFtcykge1xuICAgICAgICAgZ3JvdXAudGVhbXMucHVzaChPYmplY3QuY3JlYXRlKHQpKTtcbiAgICB9XG4gICAgLy8gZ3JvdXAudGVhbXMgPSB0ZWFtcy5zbGljZSgpO1xuICAgICBncm91cC5tYXRjaGVzID0gZ2V0TWF0Y2hlc0Zyb21UZWFtcyh0ZWFtcyxvcmlnaW5hbEdyb3VwLm1hdGNoZXMgKTtcbiAgICAgZm9yKHZhciB0IG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgIHQucmVzZXQoKTtcbiAgICAgfVxuICAgICByZXR1cm4gZ3JvdXA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyVGVhbXMoZ3JvdXAgOiBHcm91cCwgY29tcGxldGU/IDogYm9vbGVhbikgOiB2b2lkIHtcbiAgICAvL3Jlc2V0IHNvbWUgc3R1ZmY6XG4gICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSBmYWxzZTtcbiAgICBncm91cC5lcXVhbFRlYW1zID0gbmV3IEFycmF5PFRlYW1bXT4oKTtcbiAgICBncm91cC50ZWFtcy5zb3J0KCAodGVhbWEsIHRlYW1iKSA9PiB7XG4gICAgICAgIHZhciBfID0gIGNvbXBhcmVUZWFtcyh0ZWFtYSwgdGVhbWIpO1xuICAgICAgICBpZiggXyA9PSAwKXtcbiAgICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdGVhbSBhIGFuZCB0ZWFtIGIgYXJlIGNvbmNpZGVyZWQgZXF1YWw6XG4gICAgICAgICAgICBncm91cC5hZGRUb0VxdWFsVGVhbXMoW3RlYW1hLCB0ZWFtYl0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH0pO1xuXG4gICAgLy9JRiBub3QgYWxsIG1hdGNoZXMgYXJlIHBsYXllZCwgd2UgY2FuIHNraXBwIHRoZSByZXN0XG4gICAgaWYoIWdyb3VwLmFsbE1hdGNoZXNQbGF5ZWQpe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vY2hlY2sgaWYgdGhlcmUgYXJlIGVxdWFsdGVhbXMsIGFuZCBkbyB3aGF0cyBuZWVkZWQ6XG4gICAgaWYoZ3JvdXAuZXF1YWxUZWFtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgaWYoZ3JvdXAuZXF1YWxUZWFtc1swXS5sZW5ndGggPT0gZ3JvdXAudGVhbXMubGVuZ3RoKXtcbiAgICAgICAgICAgIC8vdGhpcyBtZWFucyBhbGwgIG9mIHRoZSB0ZWFtcyB3ZXJlIGVxdWFsLCBzbyB0aGVyZSBpcyBub3RoaW5nIG1vcmUgdG8gZG86XG4gICAgICAgICAgICBncm91cC5ncm91cE5lZWRzRHJhdyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3dlIG5lZWQgdG8gbWFrZSBhIHN1Ymdyb3VwIGFuZCBkbyB0aGUgb3JkZXJpbmcgYWdhaW46XG4gICAgICAgICAgICBmb3IgKCB2YXIgZXF1YWxUZWFtc1N1Ykdyb3VwIG9mIGdyb3VwLmVxdWFsVGVhbXMpe1xuICAgICAgICAgICAgICAgIGlmKGNvbXBsZXRlID09IHVuZGVmaW5lZCB8fCBjb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgICAgLyogY29uc29sZS5sb2coXCJCZWZvcmUgXCIpO1xuICAgICAgICAgICAgICAgICAgICBncm91cC5wcmludEdyb3VwU3RhbmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAucHJpbnRHcm91cE1hdGNoZXMoKSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgdmFyIHN1Ymdyb3VwID0gZ2V0U3ViR3JvdXAoZXF1YWxUZWFtc1N1Ykdyb3VwLCBncm91cCk7XG4gICAgICAgICAgICAgICAgc3ViZ3JvdXAucHJvY2Vzc01hdGNoZXMoKTtcblxuICAgICAgICAgICAgICAgIC8vd2F0Y2ggb3V0IGhlcmUgZm9yIGluZmluaXRlIGxvb3BzISEhXG4gICAgICAgICAgICAgICAgLyppZiAoY29tcGxldGUgPT0gdW5kZWZpbmVkIHx8IGNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyVGVhbXMoc3ViZ3JvdXAsZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgaWYoIWdyb3VwLmdyb3VwTmVlZHNEcmF3KXtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJUZWFtcyhzdWJncm91cCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN1Ymdyb3VwLmdyb3VwTmVlZHNEcmF3KXtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXBOZWVkc0RyYXcgPSAgdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2FmdGVyIHRoaXMgc3ViZ3JvdXBzIGhhdmUgYmVlbiBvcmRlcmVkLCBzbyBub3cgd2Ugb3JkZXIgdGhlbSBpblxuICAgICAgICAgICAgICAgIC8vc3ViZ3JvdXAucHJpbnRHcm91cFN0YW5kaW5nKCk7XG4gICAgICAgICAgICAgICAgb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cCwgc3ViZ3JvdXApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihjb21wbGV0ZSA9PSB1bmRlZmluZWQgfHwgY29tcGxldGUpe1xuICAgICAgIC8qIGNvbnNvbGUubG9nKFwiRmluYWwgcHJpbnRcIik7XG4gICAgICAgIGdyb3VwLnByaW50R3JvdXBTdGFuZGluZygpO1xuICAgICAgICBncm91cC5wcmludEdyb3VwTWF0Y2hlcygpKi9cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb3JkZXJBY2NvcmRpbmdUb1N1Ykdyb3Vwcyhncm91cDogR3JvdXAsIHN1Ykdyb3VwIDogR3JvdXApe1xuXG5cbiAgICAvL2ZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB0ZWFtOlxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yKHZhciB0ZWFtIG9mIGdyb3VwLnRlYW1zKXtcbiAgICAgICAgaWYoc3ViR3JvdXAuY29udGFpbnNUZWFtV2l0aE5hbWUodGVhbS5uYW1lKSl7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCsrXG4gICAgfVxuXG4gICAgLy9nZXQgY29waWVzIG9mIHRoZSB0ZWFtc1xuICAgIHZhciB0ZWFtc1RvQWRkID0gZ2V0U3ViR3JvdXBGcm9tT3JpZ2luYWxHcm91cChncm91cCxzdWJHcm91cCk7XG5cbiAgICAvL3RoZSBmaXJzdCB0ZWFtIGlzIGluIHBvc2l0aW9uIGluZGV4IGluIHRoZSBvcmlnaW5hbCBncm91cFxuICAgIC8vc28gbm93IHN0YXJ0IHJlcGxhY2luZyBmcm9tIHRoZXJlOlxuICAgIGZvcih2YXIgdGVhbVRvQWRkIG9mIHRlYW1zVG9BZGQudGVhbXMpe1xuICAgICAgICBncm91cC50ZWFtcy5zcGxpY2UoaW5kZXgsIDEsIHRlYW1Ub0FkZCk7XG4gICAgICAgIGluZGV4KytcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0U3ViR3JvdXBGcm9tT3JpZ2luYWxHcm91cCAob3JpZ2luYWxHcm91cCAgOiBHcm91cCwgc3ViR3JvdXAgOiBHcm91cCApIDogIEdyb3Vwe1xuICAgIHZhciByZXR1cm5WYWwgOiBHcm91cCA9IG5ldyBHcm91cCgpO1xuICAgIHJldHVyblZhbC50ZWFtcyA9IFtdO1xuICAgIGZvciAodmFyIHN1Ykdyb3VwVGVhbSAgb2Ygc3ViR3JvdXAudGVhbXMpe1xuICAgICAgICB2YXIgdGVhbVRvQWRkID0gT2JqZWN0LmFzc2lnbih7fSwgb3JpZ2luYWxHcm91cC5nZXRUZWFtKChzdWJHcm91cFRlYW0ubmFtZSkpKTtcbiAgICAgICAgLy92YXIgdGVhbVRvQWRkID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbEdyb3VwLmdldFRlYW0oc3ViR3JvdXBUZWFtLm5hbWUpKTtcbiAgICAgICAgcmV0dXJuVmFsLnRlYW1zLnB1c2godGVhbVRvQWRkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbDtcblxufVxuXG5cbi8qIFxuV2lubmVyIEEgdi4gUnVubmVyLXVwIEIgPSAxIC0gMFxuV2lubmVyIEIgdi4gUnVubmVyLXVwIEEgPSAyIC0gMVxuV2lubmVyIEMgdi4gUnVubmVyLXVwIEQgPSAzIFxuV2lubmVyIEQgdi4gUnVubmVyLXVwIEMgPSA0XG5XaW5uZXIgRSB2LiBSdW5uZXItdXAgRiA9IDVcbldpbm5lciBGIHYuIFJ1bm5lci11cCBFID0gNlxuV2lubmVyIEcgdi4gUnVubmVyLXVwIEggPSA3XG5XaW5uZXIgSCB2LiBSdW5uZXItdXAgRyA9IDggXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvTmV4dFJvdW5kKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSB7XG4gICAgXG4gICAgY29uc3QgYWNoc3RlRmluYWxlcyA9ICB0b3VybmFtZW50LnJvdW5kc1swXTtcblxuICAgIHRvdXJuYW1lbnQuZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBncm91cEluZGV4KSA9PiB7XG5cbiAgICAgICAgaWYoZ3JvdXAuYWxsTWF0Y2hlc1BsYXllZCl7XG4gICAgICAgICAgICBjb25zdCBncm91cFdpbm5lciA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzBdO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBSdW5uZXJVcCA9IHRvdXJuYW1lbnQuZ3JvdXBzW2dyb3VwSW5kZXhdLnRlYW1zWzFdO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmKGdyb3VwSW5kZXglMiA9PSAwKXtcbiAgICAgICAgICAgICAgICAvL2V2ZW4gaW5kZXggc28gZ3JvdXAgd2lubmVyIGluIGhvbWUgaW5kZXgsIHJ1bm5lcnVwIGluIG91dCBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgYWNoc3RlRmluYWxlcy5tYXRjaGVzW2dyb3VwSW5kZXhdLmhvbWVUZWFtTmFtZSA9IGdyb3VwV2lubmVyLm5hbWU7XG4gICAgICAgICAgICAgICAgYWNoc3RlRmluYWxlcy5tYXRjaGVzW2dyb3VwSW5kZXgrMV0ub3V0VGVhbU5hbWUgPSBncm91cFJ1bm5lclVwLm5hbWU7XG4gICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL29kZCBpbmRleCBzbyBncm91cCB3aW5uZXIgaW4gb3V0IGluZGV4KzEsIHJ1bm5lcnVwIGluIGhvbWUgaW5kZXg7XG4gICAgICAgICAgICAgICAgYWNoc3RlRmluYWxlcy5tYXRjaGVzW2dyb3VwSW5kZXhdLmhvbWVUZWFtTmFtZSA9IGdyb3VwV2lubmVyLm5hbWU7XG4gICAgICAgICAgICAgICAgYWNoc3RlRmluYWxlcy5tYXRjaGVzW2dyb3VwSW5kZXgtMV0ub3V0VGVhbU5hbWUgPSBncm91cFJ1bm5lclVwLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG4vKlxuICAgIFdpbm5lciAxIHYuIFdpbm5lciAzID0gQVxuICAgIFdpbm5lciAyIHYuIFdpbm5lciA0ID0gQlxuICAgIFdpbm5lciA1IHYuIFdpbm5lciA3ID0gQ1xuICAgIFdpbm5lciA2IHYuIFdpbm5lciA4ID0gRCBcblxuICAgIFNlbWllczpcbiAgICBXaW5uZXIgMSB2LiBXaW5uZXIgM1xuICAgIFdpbm5lciAyIHYuIFdpbm5lciA0XG5cblxuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvTmV4dEtub2Nrb3V0Um91bmQodG91cm5hbWVudDogVG91cm5hbWVudCwgcm91bmRJbmRleCA6IG51bWJlciwgbWF0Y2hJbmRleDogbnVtYmVyICwgd2lubmluZ1RlYW06IHN0cmluZyl7XG5cbiAgICBpZihyb3VuZEluZGV4ID09IDMpe1xuICAgICAgIC8vIHRoaXMgaXMgdGhlIGZpbmFsXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbWF0Y2hJbmRleFRvQWRkVG87IFxuICAgIGxldCBob21lVGVhbSA9IHRydWVcbiAgICBpZihyb3VuZEluZGV4ID09IDApe1xuICAgICAgICBpZihtYXRjaEluZGV4ID09IDAgfHwgbWF0Y2hJbmRleCA9PSAyKXtcbiAgICAgICAgICAgIG1hdGNoSW5kZXhUb0FkZFRvID0gMFxuICAgICAgICB9IGVsc2UgaWYobWF0Y2hJbmRleCA9PSAxIHx8IG1hdGNoSW5kZXggPT0gMyl7XG4gICAgICAgICAgICBtYXRjaEluZGV4VG9BZGRUbyA9IDFcbiAgICAgICAgfSBlbHNlIGlmKG1hdGNoSW5kZXggPT0gNCB8fCBtYXRjaEluZGV4ID09IDYpe1xuICAgICAgICAgICAgbWF0Y2hJbmRleFRvQWRkVG8gPSAyXG4gICAgICAgIH0gZWxzZSBpZihtYXRjaEluZGV4ID09IDUgfHwgbWF0Y2hJbmRleCA9PSA3KXtcbiAgICAgICAgICAgIG1hdGNoSW5kZXhUb0FkZFRvID0gM1xuICAgICAgICB9ICBcbiAgICAgICAgaWYobWF0Y2hJbmRleCA9PSAyIHx8bWF0Y2hJbmRleCA9PSAzIHx8IG1hdGNoSW5kZXggPT0gNiB8fCBtYXRjaEluZGV4ID09IDcpe1xuICAgICAgICAgICAgaG9tZVRlYW0gPSBmYWxzZTtcbiAgICAgICAgfSAgXG4gICAgfSBlbHNlIGlmKHJvdW5kSW5kZXggPT0gMSl7XG4gICAgICAgIGlmIChtYXRjaEluZGV4ID09IDAgfHwgbWF0Y2hJbmRleCA9PSAyKXtcbiAgICAgICAgICAgIG1hdGNoSW5kZXhUb0FkZFRvID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoSW5kZXhUb0FkZFRvID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hdGNoSW5kZXggPT0gMiB8fG1hdGNoSW5kZXggPT0gMyl7XG4gICAgICAgICAgICBob21lVGVhbSA9IGZhbHNlO1xuICAgICAgICB9IFxuICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoSW5kZXhUb0FkZFRvID0gMDtcbiAgICAgICAgaWYobWF0Y2hJbmRleCA9PSAxKXtcbiAgICAgICAgICAgIGhvbWVUZWFtID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IG1hdGNoVG9BZGRUbyA9IHRvdXJuYW1lbnQucm91bmRzW3JvdW5kSW5kZXgrMV0ubWF0Y2hlc1ttYXRjaEluZGV4VG9BZGRUb107XG4gICAgaWYoaG9tZVRlYW0pe1xuICAgICAgICBtYXRjaFRvQWRkVG8uaG9tZVRlYW1OYW1lID0gd2lubmluZ1RlYW07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWF0Y2hUb0FkZFRvLm91dFRlYW1OYW1lID0gd2lubmluZ1RlYW07XG4gICAgfVxufVxuICBcblxuXG5cbi8vICoqKiBGcm9udGVuZCBIZWxwZXIgbWV0aG9kczogKioqIC8vXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUJhc2VkT25OYW1lKG5ld0dyb3VwIDogR3JvdXAsIGdyb3VwcyA6R3JvdXBbXSkgOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSBmaW5kSW5kZXhPZkdyb3VwQmFzZWRPbk5hbWUobmV3R3JvdXAsIGdyb3Vwcyk7XG4gICAgZ3JvdXBzW2luZGV4XSA9IG5ld0dyb3VwO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5kZXhPZkdyb3VwQmFzZWRPbk5hbWUoZ3JvdXBUb0ZpbmQ6R3JvdXAgLCBncm91cHMgOiBHcm91cFtdKSA6IGFueSB7XG5cbiAgICBmb3IobGV0IGkgaW4gZ3JvdXBzKXtcbiAgICAgICAgaWYoZ3JvdXBzW2ldLmdyb3VwbmFtZSA9PSBncm91cFRvRmluZC5ncm91cG5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyAqKiogRU5EICoqKiAvL1xuIiwiaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudDogVG91cm5hbWVudCkgOnZvaWQge1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gMTtcbiAgICBncm91cEEubWF0Y2hlc1swXS5ob21lVGVhbVNjb3JlID0gMztcblxuICAgIGdyb3VwQS5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0uaG9tZVRlYW1TY29yZSA9IDA7XG5cblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6dm9pZHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgdmFyIGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQS5tYXRjaGVzWzVdLmhvbWVUZWFtU2NvcmUgPSAzO1xuXG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdyb3VwTWF0Y2hTY29yZTNFcXVhbFRlYW1zKHRvdXJuYW1lbnQgOiBUb3VybmFtZW50KSA6IHZvaWQge1xuICAgIC8vc2V0R3JvdXBNYXRjaFNjb3Jlcyh0b3VybmFtZW50KTtcbiAgICB2YXIgZ3JvdXBBID0gdG91cm5hbWVudC5ncm91cHNbMF07XG5cbiAgICBncm91cEEubWF0Y2hlc1swXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzBdLmhvbWVUZWFtU2NvcmUgPSA0O1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbMV0ub3V0VGVhbVNjb3JlID0gMDtcbiAgICBncm91cEEubWF0Y2hlc1sxXS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzJdLm91dFRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBBLm1hdGNoZXNbMl0uaG9tZVRlYW1TY29yZSA9IDM7XG5cbiAgICBncm91cEEubWF0Y2hlc1szXS5vdXRUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQS5tYXRjaGVzWzNdLmhvbWVUZWFtU2NvcmUgPSAxO1xuXG4gICAgZ3JvdXBBLm1hdGNoZXNbNF0ub3V0VGVhbVNjb3JlID0gNDtcbiAgICBncm91cEEubWF0Y2hlc1s0XS5ob21lVGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQS5tYXRjaGVzWzVdLm91dFRlYW1TY29yZSA9IDA7XG4gICAgZ3JvdXBBLm1hdGNoZXNbNV0uaG9tZVRlYW1TY29yZSA9IDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50IDogVG91cm5hbWVudCkgOiB2b2lkIHtcbiAgICAvL3NldEdyb3VwTWF0Y2hTY29yZXModG91cm5hbWVudCk7XG4gICAgdmFyIGdyb3VwQiA9IHRvdXJuYW1lbnQuZ3JvdXBzWzFdO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0uaG9tZVRlYW1TY29yZSA9IDE7XG4gICAgZ3JvdXBCLm1hdGNoZXNbMF0ub3V0VGVhbVNjb3JlID0gNDtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzFdLmhvbWVUZWFtU2NvcmUgPSAzO1xuICAgIGdyb3VwQi5tYXRjaGVzWzFdLm91dFRlYW1TY29yZSA9IDA7XG5cbiAgICBncm91cEIubWF0Y2hlc1syXS5ob21lVGVhbVNjb3JlID0gNDtcbiAgICBncm91cEIubWF0Y2hlc1syXS5vdXRUZWFtU2NvcmUgPSAwO1xuXG4gICAgZ3JvdXBCLm1hdGNoZXNbM10uaG9tZVRlYW1TY29yZSA9IDM7XG4gICAgZ3JvdXBCLm1hdGNoZXNbM10ub3V0VGVhbVNjb3JlID0gMTtcblxuICAgIGdyb3VwQi5tYXRjaGVzWzRdLmhvbWVUZWFtU2NvcmUgPSAwO1xuICAgIGdyb3VwQi5tYXRjaGVzWzRdLm91dFRlYW1TY29yZSA9IDI7XG5cbiAgICBncm91cEIubWF0Y2hlc1s1XS5ob21lVGVhbVNjb3JlID0gMjtcbiAgICBncm91cEIubWF0Y2hlc1s1XS5vdXRUZWFtU2NvcmUgPSAwO1xuXG59IiwiXG5pbXBvcnQge30gZnJvbSAnamFzbWluZSc7XG5pbXBvcnQge2dldE1hdGNoZXNGcm9tVGVhbXMsIGdldFRvdXJuYW1lbnQsIG9yZGVyVGVhbXMsIGFkZFRvTmV4dEtub2Nrb3V0Um91bmR9IGZyb20gXCIuLi9zcmMvc2hhcmVkL3V0aWxzL1RvdXJuYW1lbnRVdGlsc1wiO1xuaW1wb3J0IHtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzLCBzZXRHcm91cE1hdGNoU2NvcmUyRnVsbHlFcXVhbFRlYW1zLCBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyxcbiAgICBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2VlblxufSBmcm9tIFwiLi9TcGVjSGVscGVyc1wiO1xuaW1wb3J0IHtUb3VybmFtZW50fSBmcm9tIFwiLi4vc3JjL3NoYXJlZC9tb2RlbHMvcHJvbm9zdGllay9Ub3VybmFtZW50XCI7XG5cblxuZGVzY3JpYmUoXCJ0aGlzIHdpbGwgdGVzdCB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgZ3JvdXAgbWF0Y2hlczpcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgIHRvdXJuYW1lbnQgOiBUb3VybmFtZW50ID0gZ2V0VG91cm5hbWVudCgpO1xuXG4gICAgaXQoXCJ0b3VybmFtZW50IHNob3VsZCBjb250YWluIGdyb3VwMSBBXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQuZ3JvdXBzWzBdLmdyb3VwbmFtZSkudG9FcXVhbChcIkdyb2VwIEFcIik7XG4gICAgfSk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuXG4gICAgbGV0IGdyb3VwQSA9ICB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcblxuICAgIGxldCB0ZWFtQSA9IHRvdXJuYW1lbnQuZ3JvdXBzWzBdLnRlYW1zWzBdO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDMgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodGVhbUEucG9pbnRzKS50b0VxdWFsKDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEMgaGFzIDEgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbMl0ucG9pbnRzKS50b0VxdWFsKDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEQgaGFzIDIgcG9pbnRzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QodG91cm5hbWVudC5ncm91cHNbMF0udGVhbXNbM10ucG9pbnRzKS50b0VxdWFsKDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIHNjb3JlZCAzIGdvYWxzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLmdvYWxzU2NvcmVkKS50b0JlKDYpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIGNvbmNpZXZlZCA0IGdvYWxzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLmdvYWxzQ29uY2lldmVkKS50b0JlKDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0ZWFtIEEgaGFzIDEgZHJhd2VkIG1hdGNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KHRlYW1BLm1hdGNoZXNEcmF3ZWQpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdChcInRlYW0gQSBoYXMgMSB3b24gbWF0Y2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBlY3QodGVhbUEubWF0Y2hlc1dvbikudG9CZSgxKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZShcInRoaXMgd2lsbCB0ZXN0IHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBncm91cCBtYXRjaGVzOlwiLCBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyICB0b3VybmFtZW50IDogVG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICBzZXRHcm91cE1hdGNoU2NvcmVzKHRvdXJuYW1lbnQpO1xuICAgIHZhciBncm91cEEgPSAgdG91cm5hbWVudC5ncm91cHNbMF07XG4gICAgZ3JvdXBBLnByb2Nlc3NNYXRjaGVzKCk7XG4gICAgb3JkZXJUZWFtcyhncm91cEEpO1xuXG4gICAgaXQoXCJSdXNzaWEgZmlyc3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMF0ubmFtZSkudG9FcXVhbChcIlJ1c3NpYVwiKTtcbiAgICB9KTtcblxuXG4gICAgaXQoXCJFZ3lwdCBzZWNvbmQgXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1sxXS5uYW1lKS50b0VxdWFsKFwiRWd5cHRcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIlVydWd1YXkgbGFzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbMl0ubmFtZSkudG9FcXVhbChcIlVydWd1YXlcIik7XG4gICAgfSk7XG5cbiAgICBpdChcIlNhdWRpIEFyYWJpYSB0aGlyZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbM10ubmFtZSkudG9FcXVhbChcIlNhdWRpIEFyYWJpYVwiKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcImdyb3VwIEE6IFwiICsgZ3JvdXBBKTtcbiAgICB2YXIgZXF1YWxUZWFtcyA9IGdyb3VwQS5nZXRFcXVhbFRlYW1zKCk7XG5cbiAgICBpdChcIkVneXB0IGFuIFVydWd1YXkgYXJlIGNvbmNpZGVyZWQgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICBleHBlY3QoZXF1YWxUZWFtc1swXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgbGV0IGZpcnN0ID0gZXF1YWxUZWFtc1swXVswXS5uYW1lID09IFwiRWd5cHRcIiB8fCAgZXF1YWxUZWFtc1swXVswXS5uYW1lID09IFwiVXJ1Z3VheVwiO1xuICAgICAgIGxldCBzZWNvbmQgPSBlcXVhbFRlYW1zWzBdWzFdLm5hbWUgPT0gXCJFZ3lwdFwiIHx8ICBlcXVhbFRlYW1zWzBdWzFdLm5hbWUgPT0gXCJVcnVndWF5XCI7XG4gICAgICAgZXhwZWN0KGZpcnN0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgZXhwZWN0KHNlY29uZCkudG9CZVRydXRoeSgpO1xuXG4gICAgfSk7XG5cbn0pO1xuXG5kZXNjcmliZShcIndlIHdhbnQgdG8gYmUgYWJsZSB0byBzZWxlY3QgYSBzdWJzZXQgb2YgbWF0Y2hlc1wiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICB2YXIgZ3JvdXBBID0gIHRvdXJuYW1lbnQuZ3JvdXBzWzBdO1xuICAgIHZhciBzdWJNYXRjaGVzID0gIGdldE1hdGNoZXNGcm9tVGVhbXMoW2dyb3VwQS50ZWFtc1sxXSxncm91cEEudGVhbXNbMl0sZ3JvdXBBLnRlYW1zWzNdXSxncm91cEEubWF0Y2hlcylcblxuICAgIGl0KFwid2UgZXhwZWN0IDMgbWF0Y2hlcyB0byBiZSBzZWxlY3RlZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBleHBlY3Qoc3ViTWF0Y2hlcy5sZW5ndGgpLnRvQmUoMyk7XG4gICAgfSk7XG5cbn0pO1xuXG5cbmRlc2NyaWJlKFwiSWYgMyBUZWFtcyBhcmUgZXF1YWwgd2UgbmVlZCBtYWtlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW1cIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmUzRXF1YWxUZWFtcyh0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEEgPSB0b3VybmFtZW50Lmdyb3Vwc1swXTtcbiAgICBncm91cEEucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQSk7XG5cblxuICAgIGl0KFwid2UgZXhwZWN0IDMgdGVhbXMgdG8gYmUgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgZXhwZWN0KGdyb3VwQS5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICAgICBleHBlY3QoZ3JvdXBBLmdldEVxdWFsVGVhbXMoKVswXS5sZW5ndGgpLnRvQmUoMyk7XG5cbiAgICB9KTtcblxuXG4gICAgaXQoXCJSdXNzaWEgc2hvdWxkIGJlIGZpcnN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1swXS5uYW1lKS50b0JlKFwiUnVzc2lhXCIpXG4gICAgfSk7XG5cbiAgICBpdChcIlNhdWRpIEFyYWJpYSBzaG91bGQgYmUgc2Vjb25kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1sxXS5uYW1lKS50b0JlKFwiU2F1ZGkgQXJhYmlhXCIpXG4gICAgfSlcbiAgICBpdChcIlVydWd1YXkgc2hvdWxkIGJlIHRoaXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGdyb3VwQS50ZWFtc1syXS5uYW1lKS50b0JlKFwiVXJ1Z3VheVwiKVxuICAgIH0pXG4gICAgaXQoXCJFZ3lwdCBzaG91bGQgYmUgbGFzdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdChncm91cEEudGVhbXNbM10ubmFtZSkudG9CZShcIkVneXB0XCIpXG4gICAgfSlcblxuXG5cbn0pO1xuXG5kZXNjcmliZShcIklmIDIgb24gMiBUZWFtcyBhcmUgZXF1YWwgd2UgbmVlZCBtYWtlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW1cIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHRvdXJuYW1lbnQgPSBnZXRUb3VybmFtZW50KCk7XG5cbiAgICBzZXRHcm91cE1hdGNoU2NvcmUyb24yRXF1YWxUZWFtc1dpdGhEaWZmZXJlbmNlQmV0d2Vlbih0b3VybmFtZW50KTtcblxuICAgIHZhciBncm91cEIgPSB0b3VybmFtZW50Lmdyb3Vwc1sxXTtcbiAgICBncm91cEIucHJvY2Vzc01hdGNoZXMoKTtcbiAgICBvcmRlclRlYW1zKGdyb3VwQiwgdHJ1ZSk7XG5cblxuICAgIGl0KFwid2UgZXhwZWN0IDIgdGVhbXMgdG8gYmUgZXF1YWxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KGdyb3VwQi5nZXRFcXVhbFRlYW1zKCkubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICBleHBlY3QoZ3JvdXBCLmdldEVxdWFsVGVhbXMoKVswXS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChncm91cEIuZ2V0RXF1YWxUZWFtcygpWzFdLmxlbmd0aCkudG9CZSgyKTtcbiAgICB9KTtcblxufSk7XG5cbmRlc2NyaWJlKFwiaXQgc2hvdWxkIGFkZCB0ZWFtcyB0byBuZXh0IGtub2Nrb3V0cm91bmRcIiwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdG91cm5hbWVudCA9IGdldFRvdXJuYW1lbnQoKTtcbiAgICBjb25zdCB3aW5uaW5nVGVhbSA9IFwid2lubmVyc1wiXG4gICAgYWRkVG9OZXh0S25vY2tvdXRSb3VuZCh0b3VybmFtZW50LCAwLCAwICwgd2lubmluZ1RlYW0pO1xuICAgIGl0KFwic2hvdWxkIGhhdmUgYWRkZWQgdG8gZmlyc3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgZXhwZWN0KHRvdXJuYW1lbnQucm91bmRzWzFdLm1hdGNoZXNbMF0uaG9tZVRlYW1OYW1lKS50b0JlKHdpbm5pbmdUZWFtKTtcbiAgICB9KVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==