import { NgModule } 		from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { AppComponent } 	from './app.component';
import { SidebarListComponent } 	from './sidebarList.component';
import { FhirProvider } from './fhirProvider.service';

@NgModule({
	imports: [ BrowserModule ],
	providers: [ FhirProvider ],
	declarations: [ AppComponent, SidebarListComponent ],
	bootstrap: [ AppComponent, SidebarListComponent ]
})
export class AppModule {

}