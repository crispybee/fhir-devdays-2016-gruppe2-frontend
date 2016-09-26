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
var sidebarList_component_1 = require('./sidebarList.component');
var navBar_component_1 = require('./navBar.component');
var canvas_component_1 = require('./canvas.component');
var fhirProvider_service_1 = require('./fhirProvider.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            providers: [fhirProvider_service_1.FhirProvider],
            declarations: [app_component_1.AppComponent, sidebarList_component_1.SidebarListComponent, navBar_component_1.NavBarComponent, canvas_component_1.CanvasComponent],
            bootstrap: [app_component_1.AppComponent, sidebarList_component_1.SidebarListComponent, navBar_component_1.NavBarComponent, canvas_component_1.CanvasComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map