export class Entry {
	constructor(public description:string) { }
}

export class SidebarSearchFilter {

	constructor() {
	}

	getMatchedNamesInArray(inputArray: Entry[], substring: string): Entry[] {
		let listOfMatchedNames: Entry[] = [];
		let pattern: RegExp = new RegExp('\\b' + substring, 'i');

		inputArray.forEach(function (entry) {
			let contains: boolean = pattern.test(entry.description);

			if (contains === true) {
				listOfMatchedNames.push(new Entry(entry.description));
			}
		});

		return listOfMatchedNames;
	}
}