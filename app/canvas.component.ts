import { Component }    from '@angular/core';
import { NgClass }      from '@angular/common';


@Component({
    selector: 'canvas-component',
    templateUrl: 'app/html/canvas.html'
})
export class CanvasComponent {
    canvasTitle: string;
    sectionTitle: string;
    
    constructor() {
        this.canvasTitle = "Blood sugar";
        this.sectionTitle = "Latest blood sugar values";
    }
}