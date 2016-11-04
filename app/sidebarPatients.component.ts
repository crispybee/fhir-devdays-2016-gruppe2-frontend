import { Component } 					from '@angular/core';
import { Entry, SidebarSearchFilter } 	from "./sidebarSearchFilter.service";
import { FhirProvider }                	from "./fhirProvider.service";


@Component({
	selector: 'sidebar-patients-component',
	templateUrl: 'app/html/sidebarPatients.html'
})
export class SidebarPatientsComponent {
	private searchList: SidebarSearchFilter = new SidebarSearchFilter;

	dataPool: Entry[] = [];
	shownDataPool: Entry[] = [];

	constructor(private fhirProvider: FhirProvider) {
		this.dataPool.push(new Entry('Local dummy patient', 'dummyIdentifier'));

		fhirProvider.getDiagnosticReports().subscribe(data => {
			let diagnosticReportResource: fhir.DiagnosticReport = <fhir.DiagnosticReport>data[0].resource;

			console.log("Diagnostic Report:");
			console.log(data);
		});

		fhirProvider.getPatients().subscribe(data => {
			console.log(data);

			for (let i = 0; i < data.length; i++) {
				let patient = <fhir.Patient>data[i].resource;
				let lastName: string = patient.name[0].family[0];
				let firstName: string = patient.name[0].given[0];
				let text: string = patient.name[0].text;
				let identifier: string = patient.identifier[0].value;

				this.dataPool.push(new Entry(firstName + " " + lastName, identifier));
			}
		});

		this.shownDataPool = this.dataPool;
	}

	onInput(event: any) {
		this.updatePatientList(event.target.value);
	}

	updatePatientList(searchString: string) {
		this.shownDataPool = this.searchList.getMatchedNamesInArray(this.dataPool, searchString);
	}
}