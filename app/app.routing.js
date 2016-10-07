"use strict";
var router_1 = require("@angular/router");
var navBar_component_1 = require("./navBar.component");
var sidebarLoading_component_1 = require("./sidebarLoading.component");
var sidebarPatients_component_1 = require("./sidebarPatients.component");
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
        outlet: 'sidebar',
        children: [
            {
                path: '',
                component: sidebarLoading_component_1.SidebarLoadingComponent
            },
            {
                path: 'sidebar-patients',
                component: sidebarPatients_component_1.SidebarPatientsComponent
            },
            {
                path: 'sidebar-patient-data',
                component: sidebarPatientData_component_1.SidebarPatientDataComponent
            }
        ]
    },
    {
        path: 'canvas',
        outlet: 'canvas',
        children: [
            {
                path: ''
            },
            {
                path: 'canvas-patient-overview',
                component: canvas_component_1.CanvasComponent
            }
        ]
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
exports.routing = router_1.RouterModule.forRoot(exports.appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map