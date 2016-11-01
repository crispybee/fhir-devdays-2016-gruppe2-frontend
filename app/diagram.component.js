"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DiagramComponent = (function () {
    function DiagramComponent() {
        // let MONTHS: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.config = {
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
                title: {
                    display: true,
                    text: 'Lab result'
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
    }
    DiagramComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = 400;
        this.canvas.height = 400;
        var context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
    };
    __decorate([
        core_1.ViewChild('canvas'), 
        __metadata('design:type', core_1.ElementRef)
    ], DiagramComponent.prototype, "canvasRef", void 0);
    DiagramComponent = __decorate([
        core_1.Component({
            selector: 'diagram-component',
            templateUrl: 'app/html/diagram.html'
        }), 
        __metadata('design:paramtypes', [])
    ], DiagramComponent);
    return DiagramComponent;
}());
exports.DiagramComponent = DiagramComponent;
//# sourceMappingURL=diagram.component.js.map