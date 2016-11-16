import { Component } from '@angular/core';
import integer = fhir.integer;
import {Entry} from "./sidebarSearchFilter.service";
import {FhirProvider} from "./fhirProvider.service";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
    selector: 'canvas-overview-component',
    templateUrl: 'app/html/canvasOverview.html'
})
export class CanvasPatientOverviewComponent {
    canvasOverviewTitle: string;
    sectionTitle: string;
    patientFirstName: string = "Loading...";
    patientLastName: string = "";
    patientText: string = "Loading...";
	patientTextStatus: string = "Loading...";
	patientId: string = "Loading...";
	patientIdentifier: string = "Loading...";
	patientIdentifier2: string = "Loading...";
	patientIdentifier3: string = "Loading...";
	patientLastUpdated: string = "Loading...";
	patientProfileUrl: string = "Loading...";
	patientVersionId: string = "Loading...";


    constructor(private fhirProvider: FhirProvider, private router: ActivatedRoute) {
        this.sectionTitle = "Personal Data";

		router.queryParams.subscribe(queryId => {
			let id: string = queryId['identifier'];
			console.log("queryParams:", queryId);

			fhirProvider.getPatient(id).subscribe(data => {
				let patient = <fhir.Patient>data[0].resource;

				this.canvasOverviewTitle = patient.resourceType + ":";
				this.patientFirstName = patient.name[0].given[0];
				this.patientLastName = patient.name[0].family[0];
				this.patientText = patient.text.div;
				this.patientTextStatus = patient.text.status;
				this.patientId = patient.id;
				this.patientIdentifier = patient.identifier[0].system;
				this.patientIdentifier2 = patient.identifier[0].use;
				this.patientIdentifier3 = patient.identifier[0].value;
				this.patientLastUpdated = patient.meta.lastUpdated;
				this.patientProfileUrl = patient.meta.profile[0];
				this.patientVersionId = patient.meta.versionId;

			});
		});
    }
}