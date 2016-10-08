import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'my-app',
	templateUrl: 'app/html/app.html'
})
export class AppComponent {
	constructor(router: Router) {
		// router.navigateByUrl('/(sidebar:sidebar//canvas:canvas)');
	}
}