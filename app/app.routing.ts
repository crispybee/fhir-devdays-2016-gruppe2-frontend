import {Routes, RouterModule}            from "@angular/router";
import {ModuleWithProviders}                from "@angular/core";
import {NavBarComponent}                    from "./navBar.component";
import {SidebarLoadingComponent}            from "./sidebarLoading.component";
import {SidebarPatientsComponent}        from "./sidebarPatients.component";
import {CanvasLoadingComponent}            from "./canvasLoading.component";
import {CanvasPatientDetailComponent}    from "./canvasPatientDetail.component";
import {CanvasPatientOverviewComponent}   from "./canvasPatientOverview.component";
import {DefaultComponent}                from "./default.component";
import {PageNotFoundComponent}            from "./pageNotFound.component";


export const appRoutes: Routes = [
    {
        path: '',
        component: NavBarComponent
    },
    {
        path: 'sidebar',
        outlet: 'sidebar',
        children: [
            {
                path: '',
                component: SidebarLoadingComponent
            },
            {
                path: 'sidebar-patients',
                component: SidebarPatientsComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    },
    {
        path: 'canvas',
        outlet: 'canvas',
        children: [
            {
                path: '',
                component: CanvasLoadingComponent
            },
            {
                path: 'canvas-patient-overview',
                component: CanvasPatientOverviewComponent
            },
            {
                path: 'canvas-patient-detail',
                component: CanvasPatientDetailComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const appRoutingProvider: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});