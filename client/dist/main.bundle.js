webpackJsonp(["main"],{

/***/ "../../../../../../api/src/shared/models/Constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HOME_TEAM_WINS */
/* unused harmony export OUT_TEAM_WINS */
/* unused harmony export MATCH_IS_DRAW */
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
                __WEBPACK_IMPORTED_MODULE_14__content_content_component__["a" /* ContentComponent */]
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
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatSidenavModule */],
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
        console.log("here");
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

module.exports = "<p>\n  {{pronostiek$ | async | json}}\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/pronostiek/pronostiek.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

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