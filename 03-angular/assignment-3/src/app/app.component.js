"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.Url = 'http://localhost:3004/assignments';
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.AssignmentList = [];
        this.calcSums();
    }
    AppComponent.prototype.calcSums = function () {
        this.getAssignmentService();
        this.TotalScoredPoints = 0;
        this.TotalPointsPossible = 0;
        this.TotalPercentGrade = 0;
        this.Grade = "N/A";
        for (var _i = 0, _a = this.AssignmentList; _i < _a.length; _i++) {
            var a = _a[_i];
            this.TotalScoredPoints += a.scored;
            this.TotalPointsPossible += a.possible;
        }
        this.TotalPercentGrade = this.TotalScoredPoints / this.TotalPointsPossible;
        this.Grade = this.calcGrade(this.TotalPercentGrade);
    };
    AppComponent.prototype.getAssignments = function () {
        return this.AssignmentList;
    };
    AppComponent.prototype.getAssignmentService = function () {
        var _this = this;
        return this.http.get(this.Url).toPromise().then(function (val) { return _this.AssignmentList = val.json(); }).catch(this.handleError);
    };
    AppComponent.prototype.addAssignment = function () {
        var newAssignment;
        newAssignment = {
            id: 100,
            assignment: this.AssignmentName,
            scored: this.ScoredPoints,
            possible: this.PointsPossible,
            percent: this.ScoredPoints / this.PointsPossible,
            grade: this.calcGrade(this.ScoredPoints / this.PointsPossible),
        };
        this.addAssignmentService(newAssignment);
        this.getAssignmentService();
        this.calcSums();
    };
    AppComponent.prototype.addAssignmentService = function (newAssignment) {
        return this.http.post(this.Url, JSON.stringify(newAssignment), this.options).toPromise().then(function () { return null; }).catch(this.handleError);
    };
    AppComponent.prototype.deleteAssignment = function (deleted) {
        this.deleteAssignmentService(deleted);
        this.getAssignmentService();
        this.calcSums();
    };
    AppComponent.prototype.deleteAssignmentService = function (deleted) {
        return this.http.delete(this.Url.concat("/" + deleted.id)).toPromise().then(function () { return null; }).catch(this.handleError);
    };
    AppComponent.prototype.calcGrade = function (num) {
        if (num >= .9) {
            return "A";
        }
        if (num >= .8) {
            return "B";
        }
        if (num >= .7) {
            return "C";
        }
        if (num >= .6) {
            return "D";
        }
        return "F";
    };
    AppComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: './app.component.html'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map