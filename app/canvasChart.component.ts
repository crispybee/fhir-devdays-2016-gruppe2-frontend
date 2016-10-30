/**
 * Created by Jenshika on 29.10.2016.
 */

import { Component } 	from '@angular/core';
//import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';



import 'chartjs';


@Component({
    selector: 'canvas-chart-component',
    templateUrl: 'app/html/canvasChart.html'
})
export class CanvasChartComponent {
    canvasChartTitle: string;

// lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    constructor() {

    }

}
