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
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var NorwayObjectValidator = (function () {
    function NorwayObjectValidator(http) {
        this.http = http;
        this.serviceUrl = "https://fhir.iap.hs-heilbronn.de/norwayvalidator/validate/";
        // this.serviceUrl = url;
    }
    NorwayObjectValidator.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Rx_1.Observable.throw(error || 'Server error');
    };
    NorwayObjectValidator.prototype.extractData = function (res) {
        var body = res.json();
        console.log("body:");
        console.log(body);
        return body.data || {};
    };
    NorwayObjectValidator.prototype.sendToValidatorService = function (fhirProfileType, jsonObject) {
        // todo: add Access-Control-Allow-Origin: * ???
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        // TODO: Hier ist noch ein Fehler
        /*return jQuery.post(this.serviceUrl + fhirProfileType, jsonObject, function (data) {
            console.log(data);
        }, "json");*/
        console.log("This will be sent to the validator service:");
        console.log(JSON.stringify(jsonObject));
        return this.http.post(this.serviceUrl + fhirProfileType, JSON.stringify(jsonObject), options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    NorwayObjectValidator.prototype.checkAnswer = function (answer) {
        if (answer.hasOwnProperty("issues")) {
            return true;
        }
        else {
            return false;
        }
    };
    NorwayObjectValidator.prototype.validateNorwayDiagnosticReport = function (diagnosticReport) {
        var urlAddition = "DiagnosticReport";
        var answer;
        // todo: send diagnosticReport to validator service and check answer
        console.log("RES:");
        this.sendToValidatorService(urlAddition, diagnosticReport).subscribe(function (issuesReturn) { return console.log(issuesReturn); }, function (error) { return console.log("Error:", error); });
        /*
        
                let check: boolean = this.checkAnswer(answer);
        
                if (check === false) {
        
                } else {
        
                }
        */
        return true;
    };
    NorwayObjectValidator.prototype.validateNorwayObservation = function () {
    };
    NorwayObjectValidator.prototype.validateNorwayOrganization = function () {
    };
    NorwayObjectValidator.prototype.validateNorwayPractitioner = function () {
    };
    NorwayObjectValidator.prototype.validateNorwayPatient = function () {
    };
    NorwayObjectValidator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NorwayObjectValidator);
    return NorwayObjectValidator;
}());
exports.NorwayObjectValidator = NorwayObjectValidator;
//# sourceMappingURL=norwayObjectValidator.service.js.map