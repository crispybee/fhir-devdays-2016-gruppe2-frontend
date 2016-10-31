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
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			backgroundColor: "rgba(155, 0, 0, 1)",
			borderColor: "rgba(155, 0, 0, 1)",
			data: [
				1,
				2,
				3,
				7,
				9,
				4,
				4
			],
			fill: false,
		}, {
			label: "My Second dataset",
			fill: false,
			backgroundColor: "rgba(0, 0, 155, 1)",
			borderColor: "rgba(0, 0, 155, 1)",
			data: [
				8,
				8,
				8,
				8,
				8,
				8,
				8
			],
		}]
	},
	options: {
		responsive: true,
		title:{
			display:true,
			text:'Chart.js Line Chart'
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
					labelString: 'Month'
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
		this.canvas.width = 300;
		this.canvas.height = 300;

		let context = this.canvas.getContext('2d');
		this.chart = new Chart(context, this.config);
	}
}
