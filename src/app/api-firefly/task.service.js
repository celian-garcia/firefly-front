"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var TaskService = TaskService_1 = (function () {
    function TaskService(http) {
        this.http = http;
        this.taskUrl = 'api/v1/tasks'; // URL to web API
    }
    TaskService.extractData = function (res) {
        console.log(res.json() || {});
        return res.json() || {};
    };
    TaskService.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    TaskService.prototype.getTasks = function () {
        return this.http.get(this.taskUrl)
            .map(TaskService_1.extractData)
            .catch(TaskService_1.handleError);
    };
    TaskService.prototype.getTaskNames = function () {
        return this.http.get(this.taskUrl)
            .map(TaskService_1.extractData)
            .catch(TaskService_1.handleError);
    };
    return TaskService;
}());
TaskService = TaskService_1 = __decorate([
    core_1.Injectable()
], TaskService);
exports.TaskService = TaskService;
var TaskService_1;
