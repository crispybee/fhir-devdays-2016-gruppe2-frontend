import { Component } from '@angular/core';


@Component({
    selector: 'canvas-component',
    templateUrl: 'app/html/canvas.html'
})
export class CanvasComponent {
    canvasTitle: string;
    sectionTitle: string;
    data: string[] = [
        'Bla',
        'Blub',
        'Bleb',
        'Blib'
    ];
    
    constructor() {
        this.canvasTitle = "Blood sugar";
        this.sectionTitle = "Latest blood sugar values";
    }
}