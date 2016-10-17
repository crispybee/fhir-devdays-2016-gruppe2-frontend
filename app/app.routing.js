"use strict";
var router_1 = require("@angular/router");
var navBar_component_1 = require("./navBar.component");
var sidebarLoading_component_1 = require("./sidebarLoading.component");
var sidebarPatients_component_1 = require("./sidebarPatients.component");
var canvasLoading_component_1 = require("./canvasLoading.component");
var canvasPatientDetail_component_1 = require("./canvasPatientDetail.component");
var canvasPatientOverview_component_1 = require("./canvasPatientOverview.component");
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
                path: '**',
                component: pageNotFound_component_1.PageNotFoundComponent
            }
        ]
    },
    {
        path: 'canvas',
        outlet: 'canvas',
        children: [
            {
                path: '',
                component: canvasLoading_component_1.CanvasLoadingComponent
            },
            {
                path: 'canvas-patient-overview',
                component: canvasPatientOverview_component_1.CanvasPatientOverviewComponent
            },
            {
                path: 'canvas-patient-detail',
                component: canvasPatientDetail_component_1.CanvasPatientDetailComponent
            },
            {
                path: '**',
                component: pageNotFound_component_1.PageNotFoundComponent
            }
        ]
    },
    {
        path: '**',
        component: pageNotFound_component_1.PageNotFoundComponent
    }
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(exports.appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map