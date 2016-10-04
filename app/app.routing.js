"use strict";
var router_1 = require("@angular/router");
var navBar_component_1 = require("./navBar.component");
var sidebarPatientData_component_1 = require("./sidebarPatientData.component");
var canvas_component_1 = require("./canvas.component");
var default_component_1 = require("./default.component");
var pageNotFound_component_1 = require("./pageNotFound.component");
exports.appRoutes = [
    {
        path: '',
        component: navBar_component_1.NavBarComponent
    },
    {
        path: 'sidebar',
        component: sidebarPatientData_component_1.SidebarPatientDataComponent,
        outlet: 'sidebar'
    },
    {
        path: 'canvas',
        component: canvas_component_1.CanvasComponent,
        outlet: 'canvas'
    },
    {
        path: '',
        component: default_component_1.DefaultComponent
    },
    {
        path: '**',
        component: pageNotFound_component_1.PageNotFoundComponent
    }
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(exports.appRoutes);
//# sourceMappingURL=app.routing.js.map