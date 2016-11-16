import { Component } 	from '@angular/core';
import { FhirProvider } from "./fhirProvider.service";
import {ActivatedRoute} from "@angular/router";
import {DiagramComponent} from "./diagram.component";


@Component({
	selector: 'canvas-detail-component',
	templateUrl: 'app/html/canvasDetail.html'
})
export class CanvasPatientDetailComponent {
	canvasDetailTitle: string;
	sectionTitle: string;
	data: string[] = [];
	patientId: string;

	constructor(private fhirProvider: FhirProvider, router: ActivatedRoute) {
		this.canvasDetailTitle = "Patient Name Placeholder";
		this.sectionTitle = "Latest X values";

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

		router.queryParams.subscribe(queryId => {
			let id: string = queryId['identifier'];
			console.log("Given patient ID:", queryId);

			this.patientId = id;

			fhirProvider.getPatient(id).subscribe(data => {
				let patient = <fhir.Patient>data[0].resource;

				console.log("Patient with ID " + id, patient);

				fhirProvider.getObservationsByPatientId(this.patientId).subscribe(data => {
					console.log("All Observations having a reference to patient ID " + this.patientId, data);
				})
			});
		});
	}
}