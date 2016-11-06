import { Component } 	from '@angular/core';
import { FhirProvider } from "./fhirProvider.service";


@Component({
	selector: 'canvas-detail-component',
	templateUrl: 'app/html/canvasDetail.html'
})
export class CanvasPatientDetailComponent {
	canvasDetailTitle: string;
	sectionTitle: string;
	data: string[] = [];

	constructor(private fhirProvider: FhirProvider) {
		this.canvasDetailTitle = "Blood sugar";
		this.sectionTitle = "Latest blood sugar values";

		fhirProvider.getObservations().subscribe(data => {
			console.log(data);

			// for (let i = 0; i < data.length; i++) {
			// 	let observation = <fhir.Observation>data[i].resource;
			// 	let comments: string = observation.comments;
			// 	let observationCode: string = observation.code.coding[0].display;
            //
			// 	this.data.push(observationCode);
			// }
		});
	}
}