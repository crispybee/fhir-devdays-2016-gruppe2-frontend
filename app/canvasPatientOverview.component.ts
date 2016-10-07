import { Component } from '@angular/core';


@Component({
    selector: 'canvas-overview-component',
    templateUrl: 'app/html/canvasOverview.html'
})
export class CanvasPatientOverviewComponent {
    canvasOverviewTitle: string;
    sectionTitle: string;
    
    constructor() {
        this.canvasOverviewTitle = "Patient X";
        this.sectionTitle = "Personal Data";
    }
}