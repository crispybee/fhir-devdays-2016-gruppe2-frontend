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
var fhirProvider_service_1 = require('./fhirProvider.service');
var dateAgeCalculator_1 = require('./dateAgeCalculator');
var Entry = (function () {
    function Entry(description) {
        this.description = description;
    }
    return Entry;
}());
var SidebarListComponent = (function () {
    function SidebarListComponent(fhirProvider) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.patientFirstName = 'Hans';
        this.patientMiddleName = 'Hack';
        this.patientLastName = 'Wurst';
        this.patientBirthday = '00.00.0000';
        this.patientGender = 'male';
        this.calculatedAge = 0;
        this.dataPool = [
            new Entry('Blood sugar'),
            new Entry('Cholesterine'),
            new Entry('EKG'),
            new Entry('EEG'),
            new Entry('BMI'),
            new Entry('Test 1'),
            new Entry('Test 2'),
            new Entry('Test 3'),
            new Entry('Test 4'),
            new Entry('Test 5'),
            new Entry('Test 6'),
        ];
        fhirProvider.init('https://fhir.iap.hs-heilbronn.de/baseDstu2');
        fhirProvider.getPatients().subscribe(function (data) {
            console.log(data);
            var patient = data[0].resource;
            var dateToAge = new dateAgeCalculator_1.DateToAge(patient.birthDate);
            _this.patientFirstName = patient.name[0].given[0];
            _this.patientMiddleName = '';
            _this.patientLastName = patient.name[0].family[0];
            _this.patientBirthday = dateToAge.getReadableDate();
            _this.patientGender = patient.gender;
            _this.calculatedAge = dateToAge.getAge();
        });
    }
    SidebarListComponent = __decorate([
        core_1.Component({
            selector: 'sidebar-list',
            templateUrl: 'app/html/sidebarlist.html'
        }), 
        __metadata('design:paramtypes', [fhirProvider_service_1.FhirProvider])
    ], SidebarListComponent);
    return SidebarListComponent;
}());
exports.SidebarListComponent = SidebarListComponent;
//# sourceMappingURL=sidebarList.component.js.map