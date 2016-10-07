import { NgModule } 				from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';
import { AppComponent } 			from './app.component';
import { SidebarListComponent } 	from './sidebarList.component';
import { NavBarComponent } 			from './navBar.component';
import { CanvasComponent } 			from './canvas.component';
import { FhirProvider } 			from './fhirProvider.service';
import { LoginComponent}            from './login.component'

@NgModule({
	imports: [ BrowserModule ],
	providers: [ FhirProvider ],
	declarations: [ AppComponent, SidebarListComponent, NavBarComponent, CanvasComponent, LoginComponent ],
	bootstrap: [ AppComponent, SidebarListComponent, NavBarComponent, CanvasComponent ]
})
export class AppModule {

}