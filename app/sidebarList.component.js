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
var Entry = (function () {
    function Entry(description) {
        this.description = description;
    }
    return Entry;
}());
var SidebarListComponent = (function () {
    function SidebarListComponent() {
        this.patientFirstName = 'Hans';
        this.patientMiddleName = 'Hack';
        this.patientLastName = 'Wurst';
        this.patientBirthday = '01.01.1987';
        this.patientGender = 'male';
        this.calculatedAge = 29;
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
            new Entry('Test 7'),
            new Entry('Test 8'),
            new Entry('Test 9'),
            new Entry('Test 10'),
            new Entry('Test 11'),
            new Entry('Test 12'),
            new Entry('Test 13'),
            new Entry('Test 14'),
            new Entry('Test 15')
        ];
    }
    SidebarListComponent = __decorate([
        core_1.Component({
            selector: 'sidebar-list',
            templateUrl: 'app/sidebarlist/sidebarlist.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarListComponent);
    return SidebarListComponent;
}());
exports.SidebarListComponent = SidebarListComponent;
//# sourceMappingURL=sidebarList.component.js.map