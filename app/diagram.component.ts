import {Component, ElementRef, ViewChild} from '@angular/core';

declare var Chart: any;


@Component({
	selector: 'diagram-component',
	templateUrl: 'app/html/diagram.html'
})
export class DiagramComponent {

	@ViewChild('canvas') canvasRef: ElementRef;
	private canvas: any;

	private chart;

	// let MONTHS: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	config = {
	type: 'line',
	data: {
		labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7"],
		datasets: [{
			label: "Natrium",
			fill: false,
			backgroundColor: "rgba(155, 0, 0, 1)",
			borderColor: "rgba(155, 0, 0, 1)",
			data: [
				1,
				2,
				3,
				7,
				9,
				4,
				5
			]

		}, {
			label: "Kalium ",
			fill: false,
			backgroundColor: "rgba(0, 0, 155, 1)",
			borderColor: "rgba(0, 0, 155, 1)",
			data: [
				8,
				5,
				8,
				2,
				7,
				8,
				16
			]
		}]
	},
	options: {
		responsive: true,
		title:{
			display:true,
			text:'Lab result'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Day'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
				}
			}]
		}
	}
};

	constructor() {
	}

	ngAfterViewInit() {
		this.canvas = this.canvasRef.nativeElement;
		this.canvas.width = 400;
		this.canvas.height = 400;

		let context = this.canvas.getContext('2d');
		this.chart = new Chart(context, this.config);
	}
}
