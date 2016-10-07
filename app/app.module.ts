import { NgModule } 					from '@angular/core';
import { BrowserModule } 				from '@angular/platform-browser';
import { AppComponent } 				from './app.component';
import { NavBarComponent } 				from './navBar.component';
import { SidebarLoadingComponent } 		from './sidebarLoading.component';
import { SidebarPatientsComponent } 	from './sidebarPatients.component';
import { SidebarPatientDataComponent } 	from './sidebarPatientData.component';
import { CanvasLoadingComponent } 		from "./canvasLoading.component";
import { CanvasComponent } 				from './canvas.component';
import { DefaultComponent } 			from './default.component';
import { PageNotFoundComponent } 		from './pageNotFound.component';
import { FhirProvider } 				from './fhirProvider.service';
import { routing, appRoutingProvider }  from './app.routing';

@NgModule({
	imports: [ BrowserModule, routing ],
	providers: [ appRoutingProvider, FhirProvider ],
	declarations: [ AppComponent, SidebarLoadingComponent, SidebarPatientDataComponent, SidebarPatientsComponent, NavBarComponent, CanvasLoadingComponent, CanvasComponent, DefaultComponent, PageNotFoundComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}