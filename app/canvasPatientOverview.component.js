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
var CanvasPatientOverviewComponent = (function () {
    function CanvasPatientOverviewComponent(fhirProvider, router) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.router = router;
        this.canvasOverviewTitle = "Loading...";
        this.sectionTitle = "Loading...";
        this.patientFirstName = "Loading...";
        this.patientLastName = "Loading...";
        this.patientText = "Loading...";
        this.patientTextStatus = "Loading...";
        this.patientId = "Loading...";
        this.patientIdentifier = "Loading...";
        this.patientIdentifier2 = "Loading...";
        this.patientIdentifier3 = "Loading...";
        this.patientLastUpdated = "Loading...";
        this.patientProfileUrl = "Loading...";
        this.patientVersionId = "Loading...";
        this.sectionTitle = "Medical Data:";
        router.queryParams.subscribe(function (queryId) {
            var id = queryId['identifier'];
            console.log("queryParams:", queryId);
            fhirProvider.getPatient(id).subscribe(function (data) {
                var patient = data[0].resource;
                _this.patientFirstName = patient.name[0].given[0];
                _this.patientLastName = patient.name[0].family[0];
                _this.patientText = patient.text.div;
                _this.patientTextStatus = patient.text.status;
                _this.patientId = patient.id;
                _this.patientIdentifier = patient.identifier[0].system;
                _this.patientIdentifier2 = patient.identifier[0].use;
                _this.patientIdentifier3 = patient.identifier[0].value;
                _this.patientLastUpdated = patient.meta.lastUpdated;
                _this.patientProfileUrl = patient.meta.profile[0];
                _this.patientVersionId = patient.meta.versionId;
                _this.canvasOverviewTitle = patient.resourceType + ": " + _this.patientFirstName + " " + _this.patientLastName + " (ID: " + _this.patientId + ")";
                _this.patientTextContainer.nativeElement.innerHTML = _this.patientText;
            });
        });
    }
    __decorate([
        core_1.ViewChild('patientTextContainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], CanvasPatientOverviewComponent.prototype, "patientTextContainer", void 0);
    CanvasPatientOverviewComponent = __decorate([
        core_1.Component({
            selector: 'canvas-overview-component',
            templateUrl: 'app/html/canvasOverview.html'
        }), 
        __metadata('design:paramtypes', [fhirProvider_service_1.FhirProvider, router_1.ActivatedRoute])
    ], CanvasPatientOverviewComponent);
    return CanvasPatientOverviewComponent;
}());
exports.CanvasPatientOverviewComponent = CanvasPatientOverviewComponent;
//# sourceMappingURL=canvasPatientOverview.component.js.map