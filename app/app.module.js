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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var navBar_component_1 = require('./navBar.component');
var sidebarLoading_component_1 = require('./sidebarLoading.component');
var sidebarPatients_component_1 = require('./sidebarPatients.component');
var canvasLoading_component_1 = require("./canvasLoading.component");
var canvasPatientOverview_component_1 = require('./canvasPatientOverview.component');
var canvasPatientDetail_component_1 = require("./canvasPatientDetail.component");
var diagram_component_1 = require("./diagram.component");
var default_component_1 = require('./default.component');
var pageNotFound_component_1 = require('./pageNotFound.component');
var fhirProvider_service_1 = require('./fhirProvider.service');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing],
            providers: [app_routing_1.appRoutingProvider, fhirProvider_service_1.FhirProvider],
            declarations: [app_component_1.AppComponent, sidebarLoading_component_1.SidebarLoadingComponent, sidebarPatients_component_1.SidebarPatientsComponent, navBar_component_1.NavBarComponent, canvasLoading_component_1.CanvasLoadingComponent, canvasPatientOverview_component_1.CanvasPatientOverviewComponent, canvasPatientDetail_component_1.CanvasPatientDetailComponent, diagram_component_1.DiagramComponent, default_component_1.DefaultComponent, pageNotFound_component_1.PageNotFoundComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map