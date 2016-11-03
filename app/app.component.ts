import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FhirProvider} from './fhirProvider.service';

@Component({
	selector: 'my-app',
	templateUrl: 'app/html/app.html'
})
export class AppComponent {
	constructor(router: Router, private _fhir : FhirProvider) {
		_fhir.init();
		// router.navigateByUrl('/(sidebar:sidebar//canvas:canvas)');
	}
}