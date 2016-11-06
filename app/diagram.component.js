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
var fhirProvider_service_1 = require("./fhirProvider.service");
var ObservationCleaned = (function () {
    function ObservationCleaned(fhirProvider, text) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.text = text;
        fhirProvider.getObservations().subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                var observationResource = data[i].resource;
                if (observationResource.status == "preliminary") {
                    text = observationResource.code.text;
                    _this.effectiveDate = observationResource.effectiveDateTime;
                    console.log("Observationdata");
                    console.log(data);
                    console.log("oneObservation");
                    console.log(observationResource);
                    console.log(text);
                    console.log(_this.effectiveDate);
                }
            }
        });
    }
    return ObservationCleaned;
}());
exports.ObservationCleaned = ObservationCleaned;
var DiagramComponent = (function () {
    function DiagramComponent() {
        this.observation = new ObservationCleaned(new fhirProvider_service_1.FhirProvider(), "");
        this.config = {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {}
        };
        this.labels = [this.observation.effectiveDate, "02-01-2001", "03-01-2001", "04-01-2001", "05-01-2001", "06-01-2001", "07-01-2001"];
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
    DiagramComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = 500;
        this.canvas.height = 600;
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