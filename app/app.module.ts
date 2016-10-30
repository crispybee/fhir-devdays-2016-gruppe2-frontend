import { NgModule } 						from '@angular/core';
import { BrowserModule } 					from '@angular/platform-browser';
import { AppComponent } 					from './app.component';
import { NavBarComponent } 					from './navBar.component';
import { SidebarLoadingComponent } 			from './sidebarLoading.component';
import { SidebarPatientsComponent } 		from './sidebarPatients.component';
import { CanvasLoadingComponent } 			from "./canvasLoading.component";
import { CanvasPatientOverviewComponent } 	from './canvasPatientOverview.component';
import { CanvasPatientDetailComponent } 	from "./canvasPatientDetail.component";
import { DefaultComponent } 				from './default.component';
import { PageNotFoundComponent } 			from './pageNotFound.component';
import { FhirProvider } 					from './fhirProvider.service';
import { routing, appRoutingProvider }  	from './app.routing';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {CanvasChartComponent} from './canvasChart.component'


@NgModule({
	imports: [ BrowserModule, routing , ChartsModule],
	providers: [ appRoutingProvider, FhirProvider ],
	declarations: [ AppComponent, SidebarLoadingComponent, SidebarPatientsComponent, NavBarComponent, CanvasLoadingComponent, CanvasPatientOverviewComponent, CanvasPatientDetailComponent, DefaultComponent, PageNotFoundComponent, CanvasChartComponent],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}