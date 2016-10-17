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
var FhirProvider = (function () {
    function FhirProvider() {
        this.serviceURL = 'https://fhir-open-api-dstu2.smarthealthit.org';
        this.init(this.serviceURL);
    }
    /**
     * Converts a jquery deferred object to an {@link Observable}.
     *
     * @param deferred
     * @returns {Observable<any>}
     */
    FhirProvider.prototype.deferredToObservable = function (deferred) {
        return Rx_1.Observable.fromPromise(deferred.promise());
    };
    FhirProvider.prototype.handleError = function (error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Rx_1.Observable.throw(error || 'Server error');
    };
    FhirProvider.prototype.getDiagnosticReports = function () {
        return this.deferredToObservable(this.smart.api.search({
            type: "DiagnosticReport", query: {}
        })).map(function (res) { return res.data.entry; })
            .catch(this.handleError);
    };
    FhirProvider.prototype.getObservations = function () {
        return this.deferredToObservable(this.smart.api.search({
            type: "Observation", query: {}
        })).map(function (res) { return res.data.entry; })
            .catch(this.handleError);
    };
    FhirProvider.prototype.getOrganizations = function () {
        return this.deferredToObservable(this.smart.api.search({
            type: "Organization", query: {}
        })).map(function (res) { return res.data.entry; })
            .catch(this.handleError);
    };
    FhirProvider.prototype.getPractitioners = function () {
        return this.deferredToObservable(this.smart.api.search({
            type: "Practitioner", query: {}
        })).map(function (res) { return res.data.entry; })
            .catch(this.handleError);
    };
    FhirProvider.prototype.getPatients = function () {
        return this.deferredToObservable(this.smart.api.search({
            type: "Patient", query: {}
        })).map(function (res) { return res.data.entry; })
            .catch(this.handleError);
    };
    /**
     * Initializes the smart on fhir client
     *
     * @param serviceURL
     */
    FhirProvider.prototype.init = function (serviceURL) {
        // FHIR client library can be used as usual
        this.smart = new FHIR.client({
            serviceUrl: serviceURL,
            auth: {
                type: 'none'
            }
        });
    };
    FhirProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FhirProvider);
    return FhirProvider;
}());
exports.FhirProvider = FhirProvider;
//# sourceMappingURL=fhirProvider.service.js.map