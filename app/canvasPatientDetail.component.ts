import { Component } 	from '@angular/core';
import { FhirProvider } from "./fhirProvider.service";
import {ActivatedRoute} from "@angular/router";
import {OneObservationCleaned} from "./diagram.component";
import decimal = fhir.decimal;


@Component({
	selector: 'canvas-detail-component',
	templateUrl: 'app/html/canvasDetail.html'
})
export class CanvasPatientDetailComponent {
	canvasDetailTitle: string;
	sectionTitle: string;
	data: string[] = [];
	patientId: string;

	allObservationsOfPatient: fhir.Observation[] = [];
	allObservationsCleaned: OneObservationCleaned[] = [];

	constructor(private fhirProvider: FhirProvider, router: ActivatedRoute) {
		this.canvasDetailTitle = "Patient Name Placeholder";
		this.sectionTitle = "Observations:";

		router.queryParams.subscribe(queryId => {
			let id: string = queryId['identifier'];
			console.log("Given patient ID:", queryId);

			this.patientId = id;

			fhirProvider.getPatient(id).subscribe(data => {
				let patient = <fhir.Patient>data[0].resource;

				console.log("Patient with ID " + id, patient);

				this.canvasDetailTitle = patient.name[0].given[0] + " " + patient.name[0].family[0];

				fhirProvider.getObservationsByPatientId(this.patientId).subscribe(observationData => {
					console.log("All Observations having a reference to patient ID " + this.patientId, observationData);

					if (observationData != null) {

						for (let i = 0; i < observationData.length; i++) {
							let obsRes = <fhir.Observation>observationData[i].resource;
							//if (obsRes.subject.reference === this.referenceToPatient) {
							this.allObservationsOfPatient.push(obsRes);
							//}
						}
						console.log("Patient Id in under component");
						console.log(this.patientId);

						console.log("all observations");
						console.log(this.allObservationsOfPatient);

						for (let i = 0; i < this.allObservationsOfPatient.length; i++) {

							let date: any;
							let value: decimal;
							let reference: any;
							let text: string;


							if (typeof this.allObservationsOfPatient[i].issued !== 'undefined') {
								date = Date.parse(this.allObservationsOfPatient[i].issued.toString());
							}
							if (typeof this.allObservationsOfPatient[i].valueQuantity.value !== 'undefined') {
								value = parseFloat(this.allObservationsOfPatient[i].valueQuantity.value.toString());
							}
							if (typeof this.allObservationsOfPatient[i].referenceRange !== 'undefined') {
								reference = this.allObservationsOfPatient[i].referenceRange[0];
							}
							if (/*typeof this.allObservationsOfPatient[i].code.coding[0].display !== 'undefined' || */this.allObservationsOfPatient[i].code) {
								text = this.allObservationsOfPatient[i].code.coding[0].display + " in " + this.allObservationsOfPatient[i].valueQuantity.unit.toString();
							}

							this.allObservationsCleaned.push(new OneObservationCleaned(i + 1, date, value, reference, text));
						}

						console.log("LISTE: ", this.allObservationsCleaned);

						/*
						for (let j = 0; j < this.allObservationsOfPatient.length; j++) {
							let observation: fhir.Observation = this.allObservationsOfPatient[j];
							if (typeof observation.valueQuantity !== "undefined") {
								if (observation.status == "preliminary") {
									this.fillProperties(observation);
									let obs: OneObservationCleaned = new OneObservationCleaned(
										this.date,
										this.value,
										this.reference,
										this.text);

									this.observationsCleanedList.push(obs);
								}
								if (observation.status == "final") {
									this.fillProperties(observation);
									let obs: OneObservationCleaned = new OneObservationCleaned(
										this.date,
										this.value,
										this.reference,
										this.text);

									this.observationsCleanedList.push(obs);
								}
							}
						}
						*/
					}
				})
			});
		});

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