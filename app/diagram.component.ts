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


    labels: any;
    datasets: any[];
    options: any;

    config = {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {}
    };

    constructor() {
        this.labels = ["01-01-2001", "02-01-2001", "03-01-2001", "04-01-2001", "05-01-2001", "06-01-2001", "07-01-2001"];
        this.datasets =
            [{
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
            }];

        this.options = {
            responsive: true,
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
                        labelString: 'date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'value'
                    }
                }]
            }
        };

        this.config.data.labels = this.labels;
        this.config.data.datasets = this.datasets;
        this.config.options = this.options;
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = 500;
        this.canvas.height = 600;
        let context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
    }

}
