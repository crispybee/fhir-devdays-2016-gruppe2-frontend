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
var sidebarSearchFilter_service_1 = require("./sidebarSearchFilter.service");
var fhirProvider_service_1 = require("./fhirProvider.service");
var SidebarPatientsComponent = (function () {
    function SidebarPatientsComponent(fhirProvider) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.searchList = new sidebarSearchFilter_service_1.SidebarSearchFilter;
        this.dataPool = [];
        this.shownDataPool = [];
        this.dataPool.push(new sidebarSearchFilter_service_1.Entry('Local dummy patient', 'dummyIdentifier'));
        fhirProvider.getPatients().subscribe(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var patient = data[i].resource;
                var lastName = patient.name[0].family[0];
                var firstName = patient.name[0].given[0];
                var identifier = patient.identifier[0].value;
                _this.dataPool.push(new sidebarSearchFilter_service_1.Entry(firstName + ' ' + lastName, identifier));
            }
        });
        this.shownDataPool = this.dataPool;
    }
    SidebarPatientsComponent.prototype.onInput = function (event) {
        this.updatePatientList(event.target.value);
    };
    SidebarPatientsComponent.prototype.updatePatientList = function (searchString) {
        this.shownDataPool = this.searchList.getMatchedNamesInArray(this.dataPool, searchString);
    };
    SidebarPatientsComponent = __decorate([
        core_1.Component({
            selector: 'sidebar-patients-component',
            templateUrl: 'app/html/sidebarPatients.html'
        }), 
        __metadata('design:paramtypes', [fhirProvider_service_1.FhirProvider])
    ], SidebarPatientsComponent);
    return SidebarPatientsComponent;
}());
exports.SidebarPatientsComponent = SidebarPatientsComponent;
//# sourceMappingURL=sidebarPatients.component.js.map