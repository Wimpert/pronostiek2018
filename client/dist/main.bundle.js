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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Match__ = __webpack_require__("../../../../../../api/src/shared/models/pronostiek/Match.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Constants__ = __webpack_require__("../../../../../../api/src/shared/models/Constants.ts");


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
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* Match */](this.teams[0], this.teams[1]));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* Match */](this.teams[2], this.teams[3]));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* Match */](this.teams[0], this.teams[2]));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* Match */](this.teams[3], this.teams[1]));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* Match */](this.teams[3], this.teams[0]));
        this.matches.push(new __WEBPACK_IMPORTED_MODULE_0__Match__["a" /* Match */](this.teams[1], this.teams[2]));
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
                if (matchOutCome == __WEBPACK_IMPORTED_MODULE_1__Constants__["b" /* HOME_TEAM_WINS */]) {
                    homeTeam.points += 3;
                    homeTeam.matchesWon++;
                    outTeam.matchesLost++;
                }
                else if (matchOutCome == __WEBPACK_IMPORTED_MODULE_1__Constants__["d" /* OUT_TEAM_WINS */]) {
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
    return Group;
}());



/***/ }),

/***/ "../../../../../../api/src/shared/models/pronostiek/Match.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Match; });
/* unused harmony export KnockoutMatch */
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
    function Match(homeTeam, outTeam) {
        this.homeTeamScore = undefined;
        this.outTeamScore = undefined;
        this.homeTeamName = homeTeam.name;
        this.outTeamName = outTeam.name;
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialog */]])
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
                __WEBPACK_IMPORTED_MODULE_18__group_match_group_match_component__["a" /* GroupMatchComponent */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_10__signup_signup_component__["a" /* SignUpDialogComponent */], __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                ),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["k" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatExpansionModule */],
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

module.exports = "<app-header (toggleSideNav)=\"sideNavToggled()\"></app-header>\n<mat-sidenav-container class=\"content-container\">\n  <mat-sidenav mode=\"over\" [opened]=\"sideNavOpen\">Sidenav content</mat-sidenav>\n  <mat-sidenav-content>\n    <h1>Main content</h1>\n    <router-outlet></router-outlet>\n  </mat-sidenav-content>\n</mat-sidenav-container>\n"

/***/ }),

/***/ "../../../../../src/app/content/content.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content-container {\n  position: absolute;\n  top: 80px;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n", ""]);

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

module.exports = "{{groupMatch.homeTeamName}} vs. {{groupMatch.outTeamName}}\n\n"

/***/ }),

/***/ "../../../../../src/app/group-match/group-match.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Match__["a" /* Match */])
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

module.exports = "<div class=\"group-matches-container\" >\n  <app-group-match *ngFor=\"let match of group.matches\" [groupMatch]=\"match\" ></app-group-match>\n</div>\n<div class=\"group-standing-container\">\n  Stadings\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/group/group.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n\n.group-matches-container, .group-standing-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  min-width: 250px;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  border: solid blue 1px; }\n", ""]);

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
    }
    GroupComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__api_src_shared_models_pronostiek_Group__["a" /* Group */])
    ], GroupComponent.prototype, "group", void 0);
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

module.exports = "<mat-accordion>\n  <mat-expansion-panel *ngFor=\"let group of groups\">\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        {{group.groupname}}\n      </mat-panel-title>\n    </mat-expansion-panel-header>\n    <app-group [group]=\"group\" ></app-group>\n  </mat-expansion-panel>\n</mat-accordion>\n"

/***/ }),

/***/ "../../../../../src/app/groups/groups.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: 90%; }\n\n:host > mat-accordion {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/groups/groups.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsComponent; });
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

var GroupsComponent = /** @class */ (function () {
    function GroupsComponent() {
    }
    GroupsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Array)
    ], GroupsComponent.prototype, "groups", void 0);
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

module.exports = "<mat-toolbar>\n\n  <button class=\"icon-button material-icons\" (click)=\"toggleSideNavPressed()\">menu</button>\n  <span>Pronostiek</span>\n  <button (click)=\"logout()\">logout</button>\n</mat-toolbar>\n"

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

module.exports = "<mat-dialog-content>\n  <div>\n    <mat-form-field>\n      <input matInput placeholder=\"username or email\" [(ngModel)]=\"username\">\n    </mat-form-field>\n    <mat-form-field>\n      <input matInput placeholder=\"password\" type=\"password\" [(ngModel)]=\"password\">\n    </mat-form-field>\n    <mat-checkbox [(ngModel)]=\"remember\">Keep me logged in.</mat-checkbox>\n    <div class=\"button-row\">\n      <button color=\"primary\" mat-raised-button (click)=\"dialogRef.close()\">Annuleren</button>\n      <button  type=\"submit\" mat-raised-button  [disabled]=\"(!username && !password)\" (click)=\"login()\">Login</button>\n    </div>\n  </div>\n</mat-dialog-content>\n"

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
    function LoginComponent(dialogRef, _userService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this._userService = _userService;
        this.remember = false;
        this.subscribtion = this._userService.userIsLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["h" /* tap */])(function (value) {
            if (value) {
                _this.dialogRef.close();
            }
        })).subscribe();
    }
    LoginComponent.prototype.login = function () {
        this._userService.login(this.username, this.password, this.remember);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<form  novalidate [formGroup]=\"profileFormGroup\" (ngSubmit)=\"onSubmit()\">\n  <div class=\"input-row\">\n    <mat-form-field>\n      <input matInput placeholder=\"Voornaam*\" formControlName=\"firstNameFormControl\" [(ngModel)]=\"user.firstname\">\n      <mat-error>required</mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"input-row\"> <mat-form-field>\n      <input matInput placeholder=\"Achternaam*\" formControlName=\"lastNameFormControl\" [(ngModel)]=\"user.lastname\">\n      <mat-error >required</mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n  <mat-form-field >\n    <input matInput placeholder=\"Username*\" formControlName=\"userNameFormControl\" [(ngModel)]=\"user.username\">\n    <mat-error *ngIf=\"profileFormGroup.get('userNameFormControl').errors &&\n                        profileFormGroup.get('userNameFormControl').errors.required\">required</mat-error>\n    <mat-error *ngIf=\"profileFormGroup.get('userNameFormControl').errors &&\n                        profileFormGroup.get('userNameFormControl').errors.userNameInUse\">\n      username is in use\n    </mat-error>\n  </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n    <mat-form-field >\n      <input matInput placeholder=\"email*\"  formControlName=\"emailFormControl\" type=\"email\" [(ngModel)]=\"user.email\">\n      <mat-error *ngIf=\"profileFormGroup.get('emailFormControl').errors &&\n                        profileFormGroup.get('emailFormControl').errors.required\">required</mat-error>\n      <mat-error *ngIf=\"profileFormGroup.get('emailFormControl').errors &&\n                        profileFormGroup.get('emailFormControl').errors.email\">invalid email</mat-error>\n      <mat-error *ngIf=\"profileFormGroup.get('emailFormControl').errors &&\n                        profileFormGroup.get('emailFormControl').errors.emailInUse\">\n        Email in use\n      </mat-error>\n    </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n  <mat-form-field >\n    <input matInput placeholder=\"password*\" formControlName=\"passwordFormControl\" type=\"password\" [(ngModel)]=\"user.password\">\n    <mat-error>There is an error</mat-error>\n  </mat-form-field>\n  </div>\n  <div class=\"input-row\">\n  <mat-form-field >\n    <input matInput placeholder=\"Confirm password*\" formControlName=\"confirmPasswordFormControl\" type=\"password\">\n    <mat-error *ngIf=\"profileFormGroup.get('confirmPasswordFormControl').errors &&\n                        profileFormGroup.get('confirmPasswordFormControl').errors.required\">required</mat-error>\n    <mat-error *ngIf=\"profileFormGroup.get('confirmPasswordFormControl').errors &&\n                        profileFormGroup.get('confirmPasswordFormControl').errors.MatchPassword\">\n      Password do not match!\n    </mat-error>\n  </mat-form-field>\n  </div>\n  <div class=\"button-row\">\n    <button color=\"primary\" mat-raised-button (click)=\"canceled.emit()\">Annuleren</button>\n    <button  type=\"submit\" mat-raised-button>Ok</button>\n  </div>\n</form>\n"

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
        this._userService.userIsLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["h" /* tap */])(function (value) {
            if (value) {
                _this.userUpdated.next("user updated");
            }
        }));
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.createForm();
        //copy the value:
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
        //TODO VALIDATION ON PASSWORD !!
        //this._userService.createUser(this.user);
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

module.exports = "<!--{{pronostiek$ | async | json}}-->\n<app-groups [groups]=\"(pronostiek$ | async)?.tournament?.groups\"></app-groups>\n"

/***/ }),

/***/ "../../../../../src/app/pronostiek/pronostiek.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n", ""]);

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
    }
    PronostiekComponent.prototype.ngOnInit = function () {
        this.pronostiek$ = this._userService.getPronostiek();
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
            return new __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_ErrorObservable__["a" /* ErrorObservable */]("alarm alarm");
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_src_shared_models_Constants__ = __webpack_require__("../../../../../../api/src/shared/models/Constants.ts");
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
        this.loginRequest$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        this.logoutRequest$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        this.userCreateRequest$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        this.unauthorizedResponse$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["a" /* Subject */]();
        this.userLoggedIn$ = this.loginRequest$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["g" /* switchMap */])(function (body) {
            return _this._httpClient.post(_this._baseUrl + "login", body, { withCredentials: true }).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["b" /* map */])(function (value) {
                return value.id !== undefined;
            }));
        }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["d" /* share */])());
        this.userCreated$ = this.userCreateRequest$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["g" /* switchMap */])(function (user) {
            return _this._httpClient.post(_this._baseUrl + "signup", user).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["b" /* map */])(function (user) {
                return user.id !== undefined;
            }));
        }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["d" /* share */])());
        this.userLoggedOut$ = this.logoutRequest$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["g" /* switchMap */])(function (_) {
            return _this._httpClient.get(_this._baseUrl + "logout", { withCredentials: true });
        }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["d" /* share */])());
        this.userIsLoggedIn$ = this.userLoggedIn$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["c" /* merge */])(this.userLoggedOut$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["b" /* map */])(function (value) { return !value; }))), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["c" /* merge */])(this.userCreated$), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["c" /* merge */])(this.unauthorizedResponse$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["b" /* map */])(function (value) { return !value; }))), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["f" /* startWith */])(document.cookie.indexOf(__WEBPACK_IMPORTED_MODULE_5__api_src_shared_models_Constants__["a" /* COOKIE_NAME */]) >= 0), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["e" /* shareReplay */])(1)
        //tap(value => {console.log("isloggedin: " + value)})
        );
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
    UserService.prototype.createUser = function (user) {
        this.userCreateRequest$.next(user);
    };
    UserService.prototype.handle401 = function () {
        console.log("hi");
        this.unauthorizedResponse$.next(true);
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

module.exports = "<mat-dialog-content>\n<app-profile [user]=\"this.user\" (canceled)=\"close()\"  (userUpdated)=\"userSaveSuccessfully(user)\"></app-profile>\n</mat-dialog-content>\n"

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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_material__["f" /* MatDialogRef */], Object, __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]])
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