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
var SidebarPatientsComponent = (function () {
    function SidebarPatientsComponent() {
        this.searchList = new sidebarSearchFilter_service_1.SidebarSearchFilter;
        this.dataPool = [
            new sidebarSearchFilter_service_1.Entry('Tom Doe'),
            new sidebarSearchFilter_service_1.Entry('Max Mustermann'),
            new sidebarSearchFilter_service_1.Entry('Dr. Hans Wurst'),
            new sidebarSearchFilter_service_1.Entry('Martina Mustermann'),
            new sidebarSearchFilter_service_1.Entry('Test 0'),
            new sidebarSearchFilter_service_1.Entry('Test 1'),
            new sidebarSearchFilter_service_1.Entry('Test 2'),
            new sidebarSearchFilter_service_1.Entry('Test 3'),
            new sidebarSearchFilter_service_1.Entry('Test 4'),
            new sidebarSearchFilter_service_1.Entry('Test 5'),
            new sidebarSearchFilter_service_1.Entry('Test 6'),
            new sidebarSearchFilter_service_1.Entry('Test 7'),
            new sidebarSearchFilter_service_1.Entry('Test 8'),
            new sidebarSearchFilter_service_1.Entry('Test 9'),
            new sidebarSearchFilter_service_1.Entry('Test 10'),
            new sidebarSearchFilter_service_1.Entry('Test 11'),
            new sidebarSearchFilter_service_1.Entry('Test 12'),
            new sidebarSearchFilter_service_1.Entry('Test 13'),
            new sidebarSearchFilter_service_1.Entry('Test 14'),
            new sidebarSearchFilter_service_1.Entry('Test 15')
        ];
        this.shownDataPool = [];
        this.dataPool.push(new sidebarSearchFilter_service_1.Entry('Added new Patient'));
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
        __metadata('design:paramtypes', [])
    ], SidebarPatientsComponent);
    return SidebarPatientsComponent;
}());
exports.SidebarPatientsComponent = SidebarPatientsComponent;
//# sourceMappingURL=sidebarPatients.component.js.map