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
var diagram_component_1 = require("./diagram.component");
var CanvasPatientDetailComponent = (function () {
    function CanvasPatientDetailComponent(fhirProvider, router) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.data = [];
        this.allObservationsOfPatient = [];
        this.allObservationsCleaned = [];
        this.canvasDetailTitle = "Patient Name Placeholder";
        this.sectionTitle = "Observations:";
        router.queryParams.subscribe(function (queryId) {
            var id = queryId['identifier'];
            console.log("Given patient ID:", queryId);
            _this.patientId = id;
            fhirProvider.getPatient(id).subscribe(function (data) {
                var patient = data[0].resource;
                console.log("Patient with ID " + id, patient);
                _this.canvasDetailTitle = patient.name[0].given[0] + " " + patient.name[0].family[0];
                fhirProvider.getObservationsByPatientId(_this.patientId).subscribe(function (observationData) {
                    console.log("All Observations having a reference to patient ID " + _this.patientId, observationData);
                    if (observationData != null) {
                        for (var i = 0; i < observationData.length; i++) {
                            var obsRes = observationData[i].resource;
                            //if (obsRes.subject.reference === this.referenceToPatient) {
                            _this.allObservationsOfPatient.push(obsRes);
                        }
                        console.log("Patient Id in under component");
                        console.log(_this.patientId);
                        console.log("all observations");
                        console.log(_this.allObservationsOfPatient);
                        for (var i = 0; i < _this.allObservationsOfPatient.length; i++) {
                            var date = void 0;
                            var value = void 0;
                            var reference = void 0;
                            var text = void 0;
                            if (typeof _this.allObservationsOfPatient[i].issued !== 'undefined') {
                                date = Date.parse(_this.allObservationsOfPatient[i].issued.toString());
                            }
                            if (typeof _this.allObservationsOfPatient[i].valueQuantity.value !== 'undefined') {
                                value = parseFloat(_this.allObservationsOfPatient[i].valueQuantity.value.toString());
                            }
                            if (typeof _this.allObservationsOfPatient[i].referenceRange !== 'undefined') {
                                reference = _this.allObservationsOfPatient[i].referenceRange[0];
                            }
                            if (_this.allObservationsOfPatient[i].code) {
                                text = _this.allObservationsOfPatient[i].code.coding[0].display + " in " + _this.allObservationsOfPatient[i].valueQuantity.unit.toString();
                            }
                            _this.allObservationsCleaned.push(new diagram_component_1.OneObservationCleaned(i + 1, date, value, reference, text));
                        }
                        console.log("LISTE: ", _this.allObservationsCleaned);
                    }
                });
            });
        });
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