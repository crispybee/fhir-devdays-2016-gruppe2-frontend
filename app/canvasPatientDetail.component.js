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
var fhirProvider_service_1 = require("./fhirProvider.service");
var router_1 = require("@angular/router");
var CanvasPatientDetailComponent = (function () {
    function CanvasPatientDetailComponent(fhirProvider, router) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.data = [];
        this.canvasDetailTitle = "Patient Name Placeholder";
        this.sectionTitle = "Latest X values";
        fhirProvider.getObservations().subscribe(function (data) {
            console.log(data);
            // for (let i = 0; i < data.length; i++) {
            // 	let observation = <fhir.Observation>data[i].resource;
            // 	let comments: string = observation.comments;
            // 	let observationCode: string = observation.code.coding[0].display;
            //
            // 	this.data.push(observationCode);
            // }
        });
        router.queryParams.subscribe(function (queryId) {
            var id = queryId['identifier'];
            console.log("Given patient ID:", queryId);
            _this.patientId = id;
            fhirProvider.getPatient(id).subscribe(function (data) {
                var patient = data[0].resource;
                console.log("Patient with ID " + id, patient);
            });
        });
    }
    CanvasPatientDetailComponent = __decorate([
        core_1.Component({
            selector: 'canvas-detail-component',
            templateUrl: 'app/html/canvasDetail.html'
        }), 
        __metadata('design:paramtypes', [fhirProvider_service_1.FhirProvider, router_1.ActivatedRoute])
    ], CanvasPatientDetailComponent);
    return CanvasPatientDetailComponent;
}());
exports.CanvasPatientDetailComponent = CanvasPatientDetailComponent;
//# sourceMappingURL=canvasPatientDetail.component.js.map