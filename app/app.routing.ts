import { Routes, RouterModule }   from "@angular/router";
import { ModuleWithProviders }    from "@angular/core";
import { NavBarComponent }        from "./navBar.component";
import { SidebarListComponent }   from "./sidebarList.component";
import { CanvasComponent }        from "./canvas.component";
import { DefaultComponent }       from "./default.component";
import { PageNotFoundComponent }  from "./pageNotFound.component";


export const appRoutes: Routes = [
	{
		path: '',
		component: NavBarComponent
	},
	{
		path: 'sidebarlist',
		component: SidebarListComponent,
		outlet: 'sidebarlist'
	},
	{
		path: 'canvas',
		component: CanvasComponent,
		outlet: 'canvas'
	},
	{
		path: '',
		component: DefaultComponent
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

export const appRoutingProvider: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);