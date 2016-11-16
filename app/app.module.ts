import { NgModule } 						from '@angular/core';
import { BrowserModule } 					from '@angular/platform-browser';
import { AppComponent } 					from './app.component';
import { NavBarComponent } 					from './navBar.component';
import { SidebarLoadingComponent } 			from './sidebarLoading.component';
import { SidebarPatientsComponent } 		from './sidebarPatients.component';
import { CanvasLoadingComponent } 			from "./canvasLoading.component";
import { CanvasPatientOverviewComponent } 	from './canvasPatientOverview.component';
import { CanvasPatientDetailComponent } 	from "./canvasPatientDetail.component";
import { DiagramComponent } 				from "./diagram.component";
import { DefaultComponent } 				from './default.component';
import { PageNotFoundComponent } 			from './pageNotFound.component';
import { FhirProvider } 					from './fhirProvider.service';
import { routing, appRoutingProvider }  	from './app.routing';
import {Clippy} from "./clippy.service";
// import { NorwayObjectValidator } from "./norwayObjectValidator.service";

@NgModule({
	imports: [ BrowserModule, routing ],
	providers: [ appRoutingProvider, FhirProvider, Clippy ],
	declarations: [ AppComponent, SidebarLoadingComponent, SidebarPatientsComponent, NavBarComponent, CanvasLoadingComponent, CanvasPatientOverviewComponent, CanvasPatientDetailComponent, DiagramComponent, DefaultComponent, PageNotFoundComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}