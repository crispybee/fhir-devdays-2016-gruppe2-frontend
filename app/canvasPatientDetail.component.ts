import { Component } 	from '@angular/core';


@Component({
	selector: 'canvas-detail-component',
	templateUrl: 'app/html/canvasDetail.html'
})
export class CanvasPatientDetailComponent {
	canvasDetailTitle: string;
	sectionTitle: string;
	data: string[] = [
		'Bla',
		'Blub',
		'Bleb',
		'Blib'
	];

	constructor() {
		this.canvasDetailTitle = "Blood sugar";
		this.sectionTitle = "Latest blood sugar values";
	}
}