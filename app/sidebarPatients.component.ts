import { Component } 					from '@angular/core';
import { Entry, SidebarSearchFilter } 	from "./sidebarSearchFilter.service";


@Component({
	selector: 'sidebar-patients-component',
	templateUrl: 'app/html/sidebarPatients.html'
})
export class SidebarPatientsComponent {
	private searchList: SidebarSearchFilter = new SidebarSearchFilter;

	dataPool: Entry[] = [
		new Entry('Tom Doe'),
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
		new Entry('Test 15')
	];

	shownDataPool: Entry[] = [];

	constructor() {
		this.dataPool.push(new Entry('Added new Patient'));

		this.shownDataPool = this.dataPool;
	}

	onInput(event: any) {
		this.updatePatientList(event.target.value);
	}

	updatePatientList(searchString: string) {
		this.shownDataPool = this.searchList.getMatchedNamesInArray(this.dataPool, searchString);
	}
}