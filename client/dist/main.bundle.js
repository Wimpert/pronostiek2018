webpackJsonp(["main"],{

/***/ "../../../../../../api/src/shared/models/Constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HOME_TEAM_WINS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OUT_TEAM_WINS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MATCH_IS_DRAW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COOKIE_NAME; });
var HOME_TEAM_WINS = 1;
var OUT_TEAM_WINS = 2;
var MATCH_IS_DRAW = 0;
var COOKIE_NAME = "j_uid";


/***/ }),

/***/ "../../../../../../api/src/shared/models/User.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());



/***/ }),

/***/ "../../../../../../api/src/shared/models/pronostiek/Group.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Group; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Team__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Team.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Match__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Match.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Constants__ = __webpack_require__("../../../../../../api/src/shared/models/Constants.ts");



var Group = /** @class */ (function () {
    function Group(groupname, teams) {
        this.allMatchesPlayed = false;
        this.groupNeedsDraw = false;
        this.groupname = groupname;
        this.teams = teams;
        if (this.teams) {
            this.initMatches();
        }
    }
    Group.prototype.initMatches = function () {
        this.matches = [];
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */](this.teams[0].name, this.teams[1].name));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */](this.teams[2].name, this.teams[3].name));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */](this.teams[0].name, this.teams[2].name));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */](this.teams[3].name, this.teams[1].name));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */](this.teams[3].name, this.teams[0].name));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */](this.teams[1].name, this.teams[2].name));
    };
    Group.prototype.processMatches = function () {
        var _this = this;
        this.allMatchesPlayed = true;
        this.teams.forEach(function (team) {
            team.reset();
        });
        this.matches.forEach(function (match) {
            if (match.outTeamScore != undefined && match.homeTeamScore != undefined) {
                //this means match is played, so let do what we need to do:
                var matchOutCome = match.getOutCome();
                var homeTeam = _this.getTeam(match.homeTeamName);
                var outTeam = _this.getTeam(match.outTeamName);
                if (matchOutCome == __WEBPACK_IMPORTED_MODULE_2__Constants__["b" /* HOME_TEAM_WINS */]) {
                    homeTeam.points += 3;
                    homeTeam.matchesWon++;
                    outTeam.matchesLost++;
                }
                else if (matchOutCome == __WEBPACK_IMPORTED_MODULE_2__Constants__["d" /* OUT_TEAM_WINS */]) {
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
                _this.allMatchesPlayed = false;
            }
        });
        //if all played matches are done, we put the points:
        this.teams.forEach(function (team) {
            team.points = team.matchesWon * 3 + team.matchesDrawed;
        });
    };
    //this get the corresponding to the teamname passed to the method:
    Group.prototype.getTeam = function (name) {
        for (var _i = 0, _a = this.teams; _i < _a.length; _i++) {
            var team = _a[_i];
            if (team.name == name) {
                return team;
            }
        }
    };
    Group.prototype.printGroupStanding = function () {
        this.teams.forEach(function (team) {
            console.log(team.name + "  w:" + team.matchesWon + "  d:" + team.matchesDrawed + " l:" + team.matchesLost + " s:" + team.goalsScored + " c:" + team.goalsConcieved + " P:" + team.points);
        });
        console.log("All played: " + this.allMatchesPlayed);
    };
    Group.prototype.printGroupMatches = function () {
        this.matches.forEach(function (match) {
            console.log(match.homeTeamName + " - " + match.outTeamName + " : " + match.homeTeamScore + " - " + match.outTeamScore);
        });
    };
    Group.prototype.getEqualTeams = function () {
        return this.equalTeams;
    };
    Group.prototype.getAllMatchesPlayed = function () {
        return this.allMatchesPlayed;
    };
    Group.prototype.addToEqualTeams = function (teamsToAdd) {
        if (this.getEqualTeams().length == 0) {
            // first, just add it:
            this.equalTeams.push(teamsToAdd);
        }
        else {
            var added = false;
            // we need to check is one of the 2 teams already is in on of the arrays that was already added:
            for (var _i = 0, _a = this.equalTeams; _i < _a.length; _i++) {
                var alreadyAddedTeams = _a[_i];
                //check if it contains one of them:
                var indexOfExistingTeam = 0;
                for (var _b = 0, teamsToAdd_1 = teamsToAdd; _b < teamsToAdd_1.length; _b++) {
                    var teamToAdd = teamsToAdd_1[_b];
                    //if it already in there, just add the other one as well and we are done:
                    if (alreadyAddedTeams.lastIndexOf(teamToAdd) != -1) {
                        break;
                    }
                    indexOfExistingTeam++;
                }
                //if this is 2, this means we did not find the team in alreadyAddedTeams
                if (indexOfExistingTeam != 2) {
                    //if is 0 or 1, we found is, so we need to add the other team.
                    var indexOfTeamToAdd = indexOfExistingTeam == 1 ? 0 : 1;
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
    };
    /**
     * This is purely for helping method:
     */
    Group.prototype.containsTeamWithName = function (name) {
        for (var _i = 0, _a = this.teams; _i < _a.length; _i++) {
            var team = _a[_i];
            if (team.name == name) {
                return true;
            }
        }
        return false;
    };
    Group.prototype.deserialize = function (input) {
        var group = new Group();
        Object.assign(group, input);
        var newTeams = [];
        group.teams.forEach(function (team) {
            newTeams.push(__WEBPACK_IMPORTED_MODULE_0__Team__["a" /* Team */].deserialize(team));
        });
        group.teams = newTeams;
        var newMatches = [];
        group.matches.forEach(function (match) {
            newMatches.push(__WEBPACK_IMPORTED_MODULE_1__Match__["b" /* Match */].deserialize(match));
        });
        group.matches = newMatches;
        return group;
    };
    return Group;
}());



/***/ }),

/***/ "../../../../../../api/src/shared/models/pronostiek/KnockOutRound.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KnockOutRound; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Match__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Match.ts");

var KnockOutRound = /** @class */ (function () {
    function KnockOutRound(name, numberOfMatches) {
        this.name = name;
        this.matches = [];
        for (var i = 0; i < numberOfMatches; i++) {
            this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* KnockoutMatch */](undefined, undefined));
        }
    }
    return KnockOutRound;
}());



/***/ }),

/***/ "../../../../../../api/src/shared/models/pronostiek/Match.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Match; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KnockoutMatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Constants__ = __webpack_require__("../../../../../../api/src/shared/models/Constants.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Match = /** @class */ (function () {
    function Match(homeTeamName, outTeamName) {
        this.homeTeamScore = undefined;
        this.outTeamScore = undefined;
        this.homeTeamName = homeTeamName;
        this.outTeamName = outTeamName;
    }
    Match.prototype.getOutCome = function () {
        if (this.homeTeamScore > this.outTeamScore) {
            return __WEBPACK_IMPORTED_MODULE_0__Constants__["b" /* HOME_TEAM_WINS */];
        }
        else if (this.outTeamScore > this.homeTeamScore) {
            return __WEBPACK_IMPORTED_MODULE_0__Constants__["d" /* OUT_TEAM_WINS */];
        }
        return __WEBPACK_IMPORTED_MODULE_0__Constants__["c" /* MATCH_IS_DRAW */];
    };
    Match.deserialize = function (input) {
        var m = new Match(input.homeTeamName, input.outTeamName);
        Object.assign(m, input);
        return m;
    };
    return Match;
}());

var KnockoutMatch = /** @class */ (function (_super) {
    __extends(KnockoutMatch, _super);
    function KnockoutMatch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.homeTeamPenaltyScore = undefined;
        _this.outTeamPenaltyScore = undefined;
        return _this;
    }
    KnockoutMatch.prototype.getOutCome = function () {
        var outCome = _super.prototype.getOutCome.call(this);
        if (outCome == __WEBPACK_IMPORTED_MODULE_0__Constants__["c" /* MATCH_IS_DRAW */]) {
            //This means match was with penals ...
            if (this.homeTeamPenaltyScore > this.outTeamPenaltyScore) {
                return __WEBPACK_IMPORTED_MODULE_0__Constants__["b" /* HOME_TEAM_WINS */];
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_0__Constants__["d" /* OUT_TEAM_WINS */];
            }
        }
        return outCome;
    };
    return KnockoutMatch;
}(Match));



/***/ }),

/***/ "../../../../../../api/src/shared/models/pronostiek/Team.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Team; });
var Team = /** @class */ (function () {
    function Team(name) {
        this.points = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.matchesDrawed = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
        this.subGroupIndex = 0;
        this.name = name;
    }
    Team.prototype.reset = function () {
        this.points = 0;
        this.matchesDrawed = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.goalsScored = 0;
        this.goalsConcieved = 0;
        this.subGroupIndex = 0;
    };
    Team.prototype.getGoalsDifference = function () {
        return this.goalsScored - this.goalsConcieved;
    };
    Team.deserialize = function (input) {
        var name = input.name;
        var team = new Team(name);
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
    };
    return Team;
}());



/***/ }),

/***/ "../../../../../../api/src/shared/models/pronostiek/Tournament.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tournament; });
var Tournament = /** @class */ (function () {
    function Tournament() {
        this.groups = [];
        this.rounds = [];
    }
    return Tournament;
}());



/***/ }),

/***/ "../../../../../../api/src/shared/utils/TournamentUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getTournament */
/* unused harmony export compareTeams */
/* unused harmony export getMatchesFromTeams */
/* unused harmony export getSubGroup */
/* harmony export (immutable) */ __webpack_exports__["a"] = orderTeams;
/* unused harmony export addToNextRound */
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceBasedOnName;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_pronostiek_Team__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Team.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_pronostiek_Group__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Group.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_pronostiek_Tournament__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Tournament.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_pronostiek_KnockOutRound__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/KnockOutRound.ts");




function getTournament() {
    console.log("***** Pronostiek generation Starting ****");
    var tournament = new __WEBPACK_IMPORTED_MODULE_2__models_pronostiek_Tournament__["a" /* Tournament */]();
    var allTeams = [
        ["Russia", "Saudi Arabia", "Egypt", "Uruguay"],
        ["Portugal", "Spain", "Morocco", "Iran"],
        ["France", "Australia", "Peru", "Denmark"],
        ["Argentina", "Iceland", "Croatia", "Nigeria"],
        ["Brazil", "Switzerland", "Costa Rica", "Serbia"],
        ["Germany", "Mexico", "Sweden", "Korea Republic"],
        ["Belgium", "Panama", "Tunisia", "England"],
        ["Poland", "Senegal", "Colombia", "Japan"],
    ];
    var groupLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];
    allTeams.forEach(function (groupTeamsNames, index) {
        var teams = [];
        groupTeamsNames.forEach(function (teamName) {
            teams.push(new __WEBPACK_IMPORTED_MODULE_0__models_pronostiek_Team__["a" /* Team */](teamName));
        });
        var group = new __WEBPACK_IMPORTED_MODULE_1__models_pronostiek_Group__["a" /* Group */]("Groep " + groupLetter[index], teams);
        tournament.groups.push(group);
    });
    var rounds = [
        { name: "Round of 16", numberOfMatches: 8 },
        { name: "Quarter Final", numberOfMatches: 4 },
        { name: "Semi Final", numberOfMatches: 2 },
        { name: "Final", numberOfMatches: 1 }
    ];
    rounds.forEach(function (roundData) {
        var knockOutRound = new __WEBPACK_IMPORTED_MODULE_3__models_pronostiek_KnockOutRound__["a" /* KnockOutRound */](roundData.name, roundData.numberOfMatches);
        tournament.rounds.push(knockOutRound);
    });
    return tournament;
}
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
function getMatchesFromTeams(teams, allMatches) {
    var teamNames = new Array();
    teams.forEach(function (team) {
        teamNames.push(team.name);
    });
    var returnVal = new Array();
    allMatches.forEach(function (match) {
        if (teamNames.indexOf(match.homeTeamName) != -1 && teamNames.indexOf(match.outTeamName) != -1) {
            returnVal.push(Object.create(match));
        }
    });
    return returnVal;
}
function getSubGroup(teams, originalGroup) {
    var group = new __WEBPACK_IMPORTED_MODULE_1__models_pronostiek_Group__["a" /* Group */]();
    group.teams = [];
    for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
        var t = teams_1[_i];
        group.teams.push(Object.create(t));
    }
    // group.teams = teams.slice();
    group.matches = getMatchesFromTeams(teams, originalGroup.matches);
    for (var _a = 0, _b = group.teams; _a < _b.length; _a++) {
        var t = _b[_a];
        t.reset();
    }
    return group;
}
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
    group.teams.sort(function (teama, teamb) {
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
            for (var _i = 0, _a = group.equalTeams; _i < _a.length; _i++) {
                var equalTeamsSubGroup = _a[_i];
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
function orderAccordingToSubGroups(group, subGroup) {
    //find the index of the first team:
    var index = 0;
    for (var _i = 0, _a = group.teams; _i < _a.length; _i++) {
        var team = _a[_i];
        if (subGroup.containsTeamWithName(team.name)) {
            break;
        }
        index++;
    }
    //get copies of the teams
    var teamsToAdd = getSubGroupFromOriginalGroup(group, subGroup);
    //the first team is in position index in the original group
    //so now start replacing from there:
    for (var _b = 0, _c = teamsToAdd.teams; _b < _c.length; _b++) {
        var teamToAdd = _c[_b];
        group.teams.splice(index, 1, teamToAdd);
        index++;
    }
}
function getSubGroupFromOriginalGroup(originalGroup, subGroup) {
    var returnVal = new __WEBPACK_IMPORTED_MODULE_1__models_pronostiek_Group__["a" /* Group */]();
    returnVal.teams = [];
    for (var _i = 0, _a = subGroup.teams; _i < _a.length; _i++) {
        var subGroupTeam = _a[_i];
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
    var index = findIndexOfGroupBasedOnName(newGroup, groups);
    groups[index] = newGroup;
}
function findIndexOfGroupBasedOnName(groupToFind, groups) {
    for (var i in groups) {
        if (groups[i].groupname == groupToFind.groupname) {
            return i;
        }
    }
}
// *** END *** //


/***/ }),

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"(showWelcome$ | async); else content\" id=\"welcome-screen\">\n  <h3>\n    Welkom op de pronostiek!\n  </h3>\n <img width=\"auto\" alt=\"De Jackies\"  src=\"../assets/images/logo_jackies.jpg\">\n  <div>\n    <button color=\"primary\" mat-raised-button (click)=\"openSignupDialog()\">Schrijf je in</button>\n    <button color=\"primary\" mat-raised-button (click)=\"openLoginDialog()\">Meld je aan</button>\n  </div>\n</div>\n\n\n<ng-template #content>\n <div id=\"content-container\">\n    <app-content></app-content>\n  </div>\n</ng-template>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100%; }\n\n::ng-deep.input-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  max-height: 80px; }\n\n::ng-deep.input-row mat-form-field {\n  width: 100%;\n  padding-left: 2px;\n  padding-right: 2px;\n  -ms-flex-negative: 1;\n      flex-shrink: 1; }\n\n::ng-deep.button-row {\n  margin-top: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n\n::ng-deep.button-row button {\n  margin-right: 10px;\n  margin-top: 2px;\n  margin-bottom: 2px; }\n\n#welcome-screen {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 100%;\n  height: 100%; }\n\n#welcome-screen > * {\n  padding: 10px; }\n\n#welcome-screen > div > button {\n  margin: 0px 10px 0px 10px; }\n\n#welcome-screen > img {\n  max-height: 40%; }\n\n#content-container {\n  width: 100%;\n  height: 100%; }\n\n.hidden {\n  display: none;\n  visibility: hidden; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup_component__ = __webpack_require__("../../../../../src/app/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = /** @class */ (function () {
    function AppComponent(_userService, matDialog) {
        this._userService = _userService;
        this.matDialog = matDialog;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.showWelcome$ = this._userService.userIsLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["b" /* map */])(function (value) { return !value; }));
    };
    AppComponent.prototype.openLoginDialog = function () {
        //let loginDialogRef =
        this.matDialog.open(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */], {
            width: 'auto',
            height: 'auto',
            maxWidth: '80%',
            maxHeight: '80%',
            minWidth: '300px'
        });
    };
    AppComponent.prototype.openSignupDialog = function () {
        //let signUpdialogRef =
        this.matDialog.open(__WEBPACK_IMPORTED_MODULE_2__signup_signup_component__["a" /* SignUpDialogComponent */], {
            width: 'auto',
            height: 'auto',
            maxWidth: '80%',
            maxHeight: '80%',
            minWidth: '300px'
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatDialog */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pronostiek_pronostiek_component__ = __webpack_require__("../../../../../src/app/pronostiek/pronostiek.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__signup_signup_component__ = __webpack_require__("../../../../../src/app/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__content_content_component__ = __webpack_require__("../../../../../src/app/content/content.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_http_interceptor__ = __webpack_require__("../../../../../src/app/services/http.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__groups_groups_component__ = __webpack_require__("../../../../../src/app/groups/groups.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__group_group_component__ = __webpack_require__("../../../../../src/app/group/group.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__group_match_group_match_component__ = __webpack_require__("../../../../../src/app/group-match/group-match.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__rounds_rounds_component__ = __webpack_require__("../../../../../src/app/rounds/rounds.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__round_round_component__ = __webpack_require__("../../../../../src/app/round/round.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__round_match_round_match_component__ = __webpack_require__("../../../../../src/app/round-match/round-match.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var appRoutes = [
    { path: 'pronostiek', component: __WEBPACK_IMPORTED_MODULE_6__pronostiek_pronostiek_component__["a" /* PronostiekComponent */] },
    { path: 'profile/:id', component: __WEBPACK_IMPORTED_MODULE_5__profile_profile_component__["a" /* ProfileComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_6__pronostiek_pronostiek_component__["a" /* PronostiekComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_6__pronostiek_pronostiek_component__["a" /* PronostiekComponent */],
                __WEBPACK_IMPORTED_MODULE_8__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_10__signup_signup_component__["a" /* SignUpDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_14__content_content_component__["a" /* ContentComponent */],
                __WEBPACK_IMPORTED_MODULE_16__groups_groups_component__["a" /* GroupsComponent */],
                __WEBPACK_IMPORTED_MODULE_17__group_group_component__["a" /* GroupComponent */],
                __WEBPACK_IMPORTED_MODULE_18__group_match_group_match_component__["a" /* GroupMatchComponent */],
                __WEBPACK_IMPORTED_MODULE_19__rounds_rounds_component__["a" /* RoundsComponent */],
                __WEBPACK_IMPORTED_MODULE_20__round_round_component__["a" /* RoundComponent */],
                __WEBPACK_IMPORTED_MODULE_21__round_match_round_match_component__["a" /* RoundMatchComponent */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_10__signup_signup_component__["a" /* SignUpDialogComponent */], __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                ),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["k" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["c" /* HttpClientModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__services_user_service__["a" /* UserService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_15__services_http_interceptor__["a" /* Interceptor */],
                    multi: true
                }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/content/content.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header (toggleSideNav)=\"sideNavToggled()\"></app-header>\n<mat-sidenav-container class=\"content-container\">\n  <mat-sidenav mode=\"over\" [opened]=\"sideNavOpen\">Sidenav content</mat-sidenav>\n  <mat-sidenav-content>\n    <router-outlet></router-outlet>\n  </mat-sidenav-content>\n</mat-sidenav-container>\n"

/***/ }),

/***/ "../../../../../src/app/content/content.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content-container {\n  position: absolute;\n  top: 80px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #e1e1e1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content/content.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContentComponent = /** @class */ (function () {
    function ContentComponent() {
    }
    ContentComponent.prototype.ngOnInit = function () {
        this.sideNavOpen = false;
    };
    ContentComponent.prototype.sideNavToggled = function () {
        this.sideNavOpen = !this.sideNavOpen;
    };
    ContentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-content',
            template: __webpack_require__("../../../../../src/app/content/content.component.html"),
            styles: [__webpack_require__("../../../../../src/app/content/content.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ContentComponent);
    return ContentComponent;
}());



/***/ }),

/***/ "../../../../../src/app/group-match/group-match.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"match-container\">\n  <span class=\"team-container  hometeam-container\">\n    <span class=\"left-team-name\">{{groupMatch.homeTeamName}}</span>\n    <input type=\"number\" [ngModel]=\"groupMatch.homeTeamScore\" (change)=\"homeTeamScoreChanged($event)\" class=\"score-field\">\n  </span>\n  <span>-</span>\n  <span class=\"team-container outteam-container\">\n    <input type=\"number\" [ngModel]=\"groupMatch.outTeamScore\" (change)=\"outTeamScoreChanged($event)\" class=\"score-field\">\n    <span class=\"right-team-name\">{{groupMatch.outTeamName}}</span>\n  </span>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/group-match/group-match.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".team-container {\n  width: 45%;\n  padding: 5px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row; }\n\n.hometeam-container {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n\n.outteam-container {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/group-match/group-match.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupMatchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Match__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Match.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupMatchComponent = /** @class */ (function () {
    function GroupMatchComponent() {
    }
    GroupMatchComponent.prototype.ngOnInit = function () {
    };
    GroupMatchComponent.prototype.outTeamScoreChanged = function (event) {
        if (event.srcElement && event.srcElement.value) {
            this.groupMatch.outTeamScore = Number(event.srcElement.value);
        }
        else {
            this.groupMatch.outTeamScore = undefined;
        }
    };
    GroupMatchComponent.prototype.homeTeamScoreChanged = function (event) {
        if (event.srcElement && event.srcElement.value) {
            this.groupMatch.homeTeamScore = Number(event.srcElement.value);
        }
        else {
            this.groupMatch.homeTeamScore = undefined;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Match__["b" /* Match */])
    ], GroupMatchComponent.prototype, "groupMatch", void 0);
    GroupMatchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-group-match',
            template: __webpack_require__("../../../../../src/app/group-match/group-match.component.html"),
            styles: [__webpack_require__("../../../../../src/app/group-match/group-match.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupMatchComponent);
    return GroupMatchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/group/group.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"group-matches-container\" >\n  <app-group-match *ngFor=\"let match of group.matches\" [groupMatch]=\"match\" (change)=\"matchChanged()\" ></app-group-match>\n</div>\n<div class=\"group-standing-container\">\n  <div>\n    NAME:  w - l - d - s - c - p\n  </div>\n  <div *ngFor=\"let team of group.teams\">\n    {{team.name}}: {{team.matchesWon}} - {{team.matchesLost}} - {{team.matchesDrawed}} - {{team.goalsScored}} - {{team.goalsConcieved}} - {{team.points}}\n  </div>\n  <div>\n    {{group.groupNeedsDraw}}\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/group/group.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n\n.group-matches-container, .group-standing-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  border: solid blue 1px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/group/group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Group__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Group.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_src_shared_utils_TournamentUtils__ = __webpack_require__("../../../../../../api/src/shared/utils/TournamentUtils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupComponent = /** @class */ (function () {
    function GroupComponent() {
        this.groupChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    GroupComponent.prototype.ngOnInit = function () {
        this.group = new __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Group__["a" /* Group */]().deserialize(this.group);
    };
    GroupComponent.prototype.matchChanged = function () {
        this.group.processMatches();
        Object(__WEBPACK_IMPORTED_MODULE_2__api_src_shared_utils_TournamentUtils__["a" /* orderTeams */])(this.group);
        this.groupChanged.emit(this.group);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Group__["a" /* Group */])
    ], GroupComponent.prototype, "group", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */])
    ], GroupComponent.prototype, "groupChanged", void 0);
    GroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-group',
            template: __webpack_require__("../../../../../src/app/group/group.component.html"),
            styles: [__webpack_require__("../../../../../src/app/group/group.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupComponent);
    return GroupComponent;
}());



/***/ }),

/***/ "../../../../../src/app/groups/groups.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-accordion>\n  <mat-expansion-panel *ngFor=\"let group of groups; let index = index;\"\n                       (opened)=\"openedPanel(index)\" (closed)=\"closedPanel(index)\"\n                        [expanded]=\"panelIsOpen(index)\">\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        {{group.groupname}}\n      </mat-panel-title>\n      <mat-panel-description>\n        <span *ngIf=\"group.allMatchesPlayed\" class=\"material-icons\">done</span>\n      </mat-panel-description>\n    </mat-expansion-panel-header>\n    <app-group [group]=\"group\" (groupChanged)=\"groupChanged($event)\" ></app-group>\n  </mat-expansion-panel>\n</mat-accordion>\n"

/***/ }),

/***/ "../../../../../src/app/groups/groups.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  width: 90%; }\n\n:host > mat-accordion {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/groups/groups.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_src_shared_utils_TournamentUtils__ = __webpack_require__("../../../../../../api/src/shared/utils/TournamentUtils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupsComponent = /** @class */ (function () {
    function GroupsComponent() {
        this.groupsChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.panelsOpen = [];
    }
    GroupsComponent.prototype.ngOnInit = function () {
    };
    GroupsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.groups.currentValue && this.panelsOpen.length == 0) {
            this.groups.forEach(function (group, index) {
                _this.panelsOpen[index] = false;
            });
        }
    };
    GroupsComponent.prototype.panelIsOpen = function (index) {
        if (!this.panelsOpen || this.panelsOpen.length < index) {
            return false;
        }
        return this.panelsOpen[index];
    };
    GroupsComponent.prototype.groupChanged = function (group) {
        Object(__WEBPACK_IMPORTED_MODULE_1__api_src_shared_utils_TournamentUtils__["b" /* replaceBasedOnName */])(group, this.groups);
        this.groupsChanged.emit(this.groups);
    };
    GroupsComponent.prototype.closedPanel = function (index) {
        this.panelsOpen[index] = false;
    };
    GroupsComponent.prototype.openedPanel = function (index) {
        this.panelsOpen[index] = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Array)
    ], GroupsComponent.prototype, "groups", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */])
    ], GroupsComponent.prototype, "groupsChanged", void 0);
    GroupsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-groups',
            template: __webpack_require__("../../../../../src/app/groups/groups.component.html"),
            styles: [__webpack_require__("../../../../../src/app/groups/groups.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupsComponent);
    return GroupsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n  <button class=\"icon-button material-icons\" (click)=\"toggleSideNavPressed()\">menu</button>\n  <span>Pronostiek</span>\n  <button (click)=\"logout()\">logout</button>\n</mat-toolbar>\n"

/***/ }),

/***/ "../../../../../src/app/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-toolbar {\n  background: yellow;\n  height: 80px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService) {
        this.userService = userService;
        this.toggleSideNav = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.logout = function () {
        this.userService.logout();
    };
    HeaderComponent.prototype.toggleSideNavPressed = function () {
        this.toggleSideNav.next("toggle");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */])
    ], HeaderComponent.prototype, "toggleSideNav", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content>\n  <div class=\"error\">\n    {{(userService.userLoginFailedMessage$ | async)?.message}}\n  </div>\n  <div>\n    <mat-form-field>\n      <input matInput placeholder=\"username or email\" [(ngModel)]=\"username\">\n    </mat-form-field>\n    <mat-form-field>\n      <input matInput placeholder=\"password\" type=\"password\" [(ngModel)]=\"password\">\n    </mat-form-field>\n    <mat-checkbox [(ngModel)]=\"remember\">Keep me logged in.</mat-checkbox>\n    <div class=\"button-row\">\n      <button color=\"primary\" mat-raised-button (click)=\"dialogRef.close()\">Annuleren</button>\n      <button  type=\"submit\" mat-raised-button  [disabled]=\"(!username && !password)\" (click)=\"login()\">Login</button>\n    </div>\n  </div>\n\n</mat-dialog-content>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-form-field {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(dialogRef, userService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.userService = userService;
        this.remember = false;
        this.subscribtion = this.userService.userIsLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["i" /* tap */])(function (value) {
            if (value) {
                _this.dialogRef.close();
            }
        }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["d" /* onErrorResumeNext */])()).subscribe();
    }
    LoginComponent.prototype.login = function () {
        this.userService.login(this.username, this.password, this.remember);
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.subscribtion.unsubscribe();
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<form  novalidate [formGroup]=\"profileFormGroup\" (ngSubmit)=\"onSubmit()\">\n  <div class=\"error\">\n    {{(_userService.userSignUpFailedMessage$ | async)?.message}}\n  </div>\n  <div class=\"input-row\">\n    <mat-form-field>\n      <input matInput placeholder=\"Voornaam*\" formControlName=\"firstNameFormControl\" [(ngModel)]=\"user.firstname\">\n      <mat-error>required</mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"input-row\"> <mat-form-field>\n      <input matInput placeholder=\"Achternaam*\" formControlName=\"lastNameFormControl\" [(ngModel)]=\"user.lastname\">\n      <mat-error >required</mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n  <mat-form-field >\n    <input matInput placeholder=\"Username*\" formControlName=\"userNameFormControl\" [(ngModel)]=\"user.username\">\n    <mat-error *ngIf=\"profileFormGroup.get('userNameFormControl').errors &&\n                        profileFormGroup.get('userNameFormControl').errors.required\">required</mat-error>\n    <mat-error *ngIf=\"profileFormGroup.get('userNameFormControl').errors &&\n                        profileFormGroup.get('userNameFormControl').errors.userNameInUse\">\n      username is in use\n    </mat-error>\n  </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n    <mat-form-field >\n      <input matInput placeholder=\"email*\"  formControlName=\"emailFormControl\" type=\"email\" [(ngModel)]=\"user.email\">\n      <mat-error *ngIf=\"profileFormGroup.get('emailFormControl').errors &&\n                        profileFormGroup.get('emailFormControl').errors.required\">required</mat-error>\n      <mat-error *ngIf=\"profileFormGroup.get('emailFormControl').errors &&\n                        profileFormGroup.get('emailFormControl').errors.email\">invalid email</mat-error>\n      <mat-error *ngIf=\"profileFormGroup.get('emailFormControl').errors &&\n                        profileFormGroup.get('emailFormControl').errors.emailInUse\">\n        Email in use\n      </mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n  <mat-form-field >\n    <input matInput placeholder=\"password*\" formControlName=\"passwordFormControl\" type=\"password\" [(ngModel)]=\"user.password\">\n    <mat-error>There is an error</mat-error>\n  </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n  <mat-form-field >\n    <input matInput placeholder=\"Confirm password*\" formControlName=\"confirmPasswordFormControl\" type=\"password\">\n    <mat-error *ngIf=\"profileFormGroup.get('confirmPasswordFormControl').errors &&\n                        profileFormGroup.get('confirmPasswordFormControl').errors.required\">required</mat-error>\n    <mat-error *ngIf=\"profileFormGroup.get('confirmPasswordFormControl').errors &&\n                        profileFormGroup.get('confirmPasswordFormControl').errors.MatchPassword\">\n      Password do not match!\n    </mat-error>\n  </mat-form-field>\n  </div>\n  <div class=\"button-row\">\n    <button color=\"primary\" mat-raised-button (click)=\"canceled.emit()\">Annuleren</button>\n    <button  type=\"submit\" mat-raised-button>Ok</button>\n  </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_User__ = __webpack_require__("../../../../../../api/src/shared/models/User.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(_formBuilder, _userService) {
        var _this = this;
        this._formBuilder = _formBuilder;
        this._userService = _userService;
        this.canceled = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.userUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        //this is dirty;
        this._userService.userIsLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["i" /* tap */])(function (_) {
            console.log(_);
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["i" /* tap */])(function (value) {
            if (value) {
                _this.userUpdated.next("user updated");
            }
        }));
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.confirmPassword = this.user !== undefined ? this.user.password : undefined;
    };
    ProfileComponent.prototype.createForm = function () {
        this.profileFormGroup = this._formBuilder.group({
            firstNameFormControl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required],
            lastNameFormControl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required],
            userNameFormControl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required],
            emailFormControl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].email],
            passwordFormControl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required],
            confirmPasswordFormControl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required]
        }, {
            validator: __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* PasswordValidation */].MatchPassword
        });
    };
    ProfileComponent.prototype.onSubmit = function () {
        if (this.profileFormGroup.valid) {
            this._userService.createUser(this.user);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_User__["a" /* User */])
    ], ProfileComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
        __metadata("design:type", Object)
    ], ProfileComponent.prototype, "canceled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
        __metadata("design:type", Object)
    ], ProfileComponent.prototype, "userUpdated", void 0);
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/profile/profile.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pronostiek/pronostiek.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div id=\"prono-save-button\">\n  <button mat-fab color=\"primary\" (click)=\"savePronosiek()\">Save</button>\n</div>\n<h3>Groepen:</h3>\n<app-groups\n  [groups]=\"(pronostiek$ | async)?.tournament?.groups\"\n  (groupsChanged)=\"groupsChanged($event)\" >\n</app-groups>\n<h3>Knockoutfase:</h3>\n<app-rounds [rounds]=\"(pronostiek$ | async)?.tournament?.rounds\"></app-rounds>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/pronostiek/pronostiek.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pronostiek/pronostiek.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PronostiekComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PronostiekComponent = /** @class */ (function () {
    function PronostiekComponent(_userService) {
        this._userService = _userService;
        this.savePronostiekEvent$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["a" /* Subject */]();
        this.userChangedPronostiek$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["a" /* Subject */]();
    }
    PronostiekComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pronostiekSaved$ = this.savePronostiekEvent$.pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["h" /* switchMap */])(function (_) { return _this._userService.savePronostiek(_this.pronostiekToSave); }));
        this.pronostiek$ = this._userService.getPronostiek().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["i" /* tap */])(function (value) { return _this.pronostiekToSave = value; }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["c" /* merge */])(this.pronostiekSaved$), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["e" /* share */])());
    };
    PronostiekComponent.prototype.savePronosiek = function () {
        this.savePronostiekEvent$.next("save");
    };
    PronostiekComponent.prototype.groupsChanged = function (groups) {
        this.pronostiekToSave.tournament.groups = groups;
        this.userChangedPronostiek$.next();
    };
    PronostiekComponent.prototype.roundsChanged = function (rounds) {
        console.log(rounds);
        this.userChangedPronostiek$.next();
    };
    PronostiekComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-pronostiek',
            template: __webpack_require__("../../../../../src/app/pronostiek/pronostiek.component.html"),
            styles: [__webpack_require__("../../../../../src/app/pronostiek/pronostiek.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]])
    ], PronostiekComponent);
    return PronostiekComponent;
}());



/***/ }),

/***/ "../../../../../src/app/round-match/round-match.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"match-container\">\n  <span class=\"team-container  hometeam-container\">\n    <span class=\"left-team-name\">{{match.homeTeamName}}</span>\n    <input type=\"number\" [ngModel]=\"match.homeTeamScore\" class=\"score-field\">\n  </span>\n  <span>-</span>\n  <span class=\"team-container outteam-container\">\n    <input type=\"number\" [ngModel]=\"match.outTeamScore\"  class=\"score-field\">\n    <span class=\"right-team-name\">{{match.outTeamName}}</span>\n  </span>\n</div>"

/***/ }),

/***/ "../../../../../src/app/round-match/round-match.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".team-container {\n  width: 45%;\n  padding: 5px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row; }\n\n.hometeam-container {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n\n.outteam-container {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/round-match/round-match.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoundMatchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_src_shared_models_pronostiek_Match__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Match.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoundMatchComponent = /** @class */ (function () {
    function RoundMatchComponent() {
    }
    RoundMatchComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__api_src_shared_models_pronostiek_Match__["a" /* KnockoutMatch */])
    ], RoundMatchComponent.prototype, "match", void 0);
    RoundMatchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-round-match',
            template: __webpack_require__("../../../../../src/app/round-match/round-match.component.html"),
            styles: [__webpack_require__("../../../../../src/app/round-match/round-match.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RoundMatchComponent);
    return RoundMatchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/round/round.component.html":
/***/ (function(module, exports) {

module.exports = "<app-round-match *ngFor=\"let match of round.matches\" [match]=\"match\"></app-round-match>\n"

/***/ }),

/***/ "../../../../../src/app/round/round.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/round/round.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_src_shared_models_pronostiek_KnockOutRound__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/KnockOutRound.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoundComponent = /** @class */ (function () {
    function RoundComponent() {
    }
    RoundComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__api_src_shared_models_pronostiek_KnockOutRound__["a" /* KnockOutRound */])
    ], RoundComponent.prototype, "round", void 0);
    RoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-round',
            template: __webpack_require__("../../../../../src/app/round/round.component.html"),
            styles: [__webpack_require__("../../../../../src/app/round/round.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RoundComponent);
    return RoundComponent;
}());



/***/ }),

/***/ "../../../../../src/app/rounds/rounds.component.html":
/***/ (function(module, exports) {

module.exports = "\n<mat-accordion>\n  <mat-expansion-panel *ngFor=\"let round of rounds\">\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        {{round.name}}\n      </mat-panel-title>\n      <mat-panel-description>\n      </mat-panel-description>\n    </mat-expansion-panel-header>\n    <app-round [round]=\"round\" ></app-round>\n  </mat-expansion-panel>\n</mat-accordion>"

/***/ }),

/***/ "../../../../../src/app/rounds/rounds.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  width: 90%; }\n\n:host > mat-accordion {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/rounds/rounds.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoundsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RoundsComponent = /** @class */ (function () {
    function RoundsComponent() {
    }
    RoundsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Array)
    ], RoundsComponent.prototype, "rounds", void 0);
    RoundsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-rounds',
            template: __webpack_require__("../../../../../src/app/rounds/rounds.component.html"),
            styles: [__webpack_require__("../../../../../src/app/rounds/rounds.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RoundsComponent);
    return RoundsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/services/http.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Interceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_ErrorObservable__ = __webpack_require__("../../../../rxjs/_esm5/observable/ErrorObservable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Interceptor = /** @class */ (function () {
    function Interceptor(userSerivce) {
        this.userSerivce = userSerivce;
    }
    Interceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["a" /* catchError */])(function (err) {
            if (err instanceof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpErrorResponse */]) {
                if (err.status === 401) {
                    _this.userSerivce.logout();
                }
            }
            return new __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_ErrorObservable__["a" /* ErrorObservable */](err);
        }));
        ;
    };
    Interceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]])
    ], Interceptor);
    return Interceptor;
}());



/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_src_shared_models_User__ = __webpack_require__("../../../../../../api/src/shared/models/User.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_src_shared_models_Constants__ = __webpack_require__("../../../../../../api/src/shared/models/Constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UserService = /** @class */ (function () {
    function UserService(_httpClient) {
        var _this = this;
        this._httpClient = _httpClient;
        this._baseUrl = __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiUrl;
        this.userLoginFailedMessage$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
        this.userSignUpFailedMessage$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
        this.loginRequest$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
        this.logoutRequest$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
        this.userCreateRequest$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
        this.unauthorizedResponse$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["a" /* Subject */]();
        //TODO: this should not stop on error !:
        this.userLoggedIn$ = this.loginRequest$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["h" /* switchMap */])(function (body) {
            return _this._httpClient.post(_this._baseUrl + "login", body, { withCredentials: true }).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["a" /* catchError */])(function (error) {
                if (error.error && error.error.code) {
                    _this.userLoginFailedMessage$.next(error.error);
                }
                else {
                    _this.userLoginFailedMessage$.next(error);
                }
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(new __WEBPACK_IMPORTED_MODULE_4__api_src_shared_models_User__["a" /* User */]());
            }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["b" /* map */])(function (value) {
                return value.id !== undefined;
            }));
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["e" /* share */])());
        this.userCreated$ = this.userCreateRequest$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["h" /* switchMap */])(function (user) {
            return _this._httpClient.post(_this._baseUrl + "signup", user, { withCredentials: true }).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["a" /* catchError */])(function (error) {
                if (error.error && error.error.code) {
                    _this.userSignUpFailedMessage$.next(error.error);
                }
                else {
                    _this.userSignUpFailedMessage$.next(error);
                }
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].of(new __WEBPACK_IMPORTED_MODULE_4__api_src_shared_models_User__["a" /* User */]());
            }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["i" /* tap */])(function (user) { return console.log(user); }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["b" /* map */])(function (user) {
                return user.id !== undefined;
            }));
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["e" /* share */])());
        this.userLoggedOut$ = this.logoutRequest$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["h" /* switchMap */])(function (_) {
            return _this._httpClient.get(_this._baseUrl + "logout", { withCredentials: true });
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["e" /* share */])());
        this.userIsLoggedIn$ = this.userLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["c" /* merge */])(this.userLoggedOut$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["b" /* map */])(function (value) { return !value; }))), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["c" /* merge */])(this.userCreated$), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["c" /* merge */])(this.unauthorizedResponse$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["b" /* map */])(function (value) { return !value; }))), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["g" /* startWith */])(document.cookie.indexOf(__WEBPACK_IMPORTED_MODULE_7__api_src_shared_models_Constants__["a" /* COOKIE_NAME */]) >= 0), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["f" /* shareReplay */])(1));
    }
    UserService.prototype.login = function (username, password, remeber) {
        this.loginRequest$.next({ username: username, password: password, remember: remeber });
    };
    UserService.prototype.logout = function () {
        this.logoutRequest$.next("logout");
    };
    UserService.prototype.getPronostiek = function () {
        return this._httpClient.get(this._baseUrl + "pronostiek", { withCredentials: true });
    };
    UserService.prototype.savePronostiek = function (pronostiek) {
        return this._httpClient.post(this._baseUrl + "pronostiek", pronostiek, { withCredentials: true });
    };
    UserService.prototype.createUser = function (user) {
        this.userCreateRequest$.next(user);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "../../../../../src/app/signup/sign-up-dialog.html":
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content>\n    <app-profile [user]=\"this.user\" (canceled)=\"close()\"  (userUpdated)=\"userSaveSuccessfully(user)\"></app-profile>\n</mat-dialog-content>\n"

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_src_shared_models_User__ = __webpack_require__("../../../../../../api/src/shared/models/User.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var SignUpDialogComponent = /** @class */ (function () {
    function SignUpDialogComponent(dialogRef, data, _userService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._userService = _userService;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__api_src_shared_models_User__["a" /* User */]();
    }
    SignUpDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SignUpDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    SignUpDialogComponent.prototype.userSaveSuccessfully = function (user) {
        console.log("this is the new user: ");
        console.log(user);
        this.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__profile_profile_component__["a" /* ProfileComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__["a" /* ProfileComponent */])
    ], SignUpDialogComponent.prototype, "profileComponent", void 0);
    SignUpDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'sign-up-dialog',
            template: __webpack_require__("../../../../../src/app/signup/sign-up-dialog.html"),
            styles: [__webpack_require__("../../../../../src/app/signup/signup.component.scss")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_material__["g" /* MatDialogRef */], Object, __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]])
    ], SignUpDialogComponent);
    return SignUpDialogComponent;
}());



/***/ }),

/***/ "../../../../../src/app/utils/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidation; });
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('passwordFormControl').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPasswordFormControl').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmPasswordFormControl').setErrors({ MatchPassword: true });
        }
        else {
            return null;
        }
    };
    return PasswordValidation;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    apiUrl: "http://pronostiek.dejackies.be/api/"
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map