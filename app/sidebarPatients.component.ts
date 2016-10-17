import { Component } 					from '@angular/core';
import { Entry, SidebarSearchFilter } 	from "./sidebarSearchFilter.service";
import { FhirProvider }                from "./fhirProvider.service";


@Component({
	selector: 'sidebar-patients-component',
	templateUrl: 'app/html/sidebarPatients.html'
})
export class SidebarPatientsComponent {
	private searchList: SidebarSearchFilter = new SidebarSearchFilter;

	dataPool: Entry[] = [
		/*new Entry('Tom Doe'),
		new Entry('Max Mustermann'),
		new Entry('Dr. Hans Wurst'),
		new Entry('Martina Mustermann'),
		new Entry('Test 0'),
		new Entry('Test 1'),
		new Entry('Test 2'),
		new Entry('Test 3'),
		new Entry('Test 4'),
		new Entry('Test 5'),
		new Entry('Test 6'),
		new Entry('Test 7'),
		new Entry('Test 8'),
		new Entry('Test 9'),
		new Entry('Test 10'),
		new Entry('Test 11'),
		new Entry('Test 12'),
		new Entry('Test 13'),
		new Entry('Test 14'),
		new Entry('Test 15')*/
	];

	shownDataPool: Entry[] = [];

	constructor(private fhirProvider: FhirProvider) {
		this.dataPool.push(new Entry('Local dummy patient', 'dummyIdentifier'));

		fhirProvider.getPatients().subscribe(data => {
			console.log(data);

			for (let i = 0; i < data.length; i++) {
				let patient = <fhir.Patient>data[i].resource;
				let lastName: string = patient.name[0].family[0];
				let firstName: string = patient.name[0].given[0];
				let identifier: string = patient.identifier[0].value;
				this.dataPool.push(new Entry(firstName + ' ' + lastName, identifier));
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