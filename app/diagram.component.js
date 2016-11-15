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
var OneObservationCleaned = (function () {
    function OneObservationCleaned(date, value, referenceRange, text) {
        this.date = date;
        this.value = value;
        this.referenceRange = referenceRange;
        this.text = text;
    }
    return OneObservationCleaned;
}());
exports.OneObservationCleaned = OneObservationCleaned;
var DiagramComponent = (function () {
    function DiagramComponent(fhirProvider) {
        var _this = this;
        this.allObservationsOfPatient = [];
        this.observationsCleanedList = [];
        this.date = "";
        this.value = "";
        this.reference = "";
        this.text = "Not specified";
        this.referenceToPatient = "";
        this.config = {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {}
        };
        fhirProvider.getObservations().subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                var obsRes = data[i].resource;
                //if (obsRes.subject.reference === this.referenceToPatient) {
                _this.allObservationsOfPatient.push(obsRes);
            }
            for (var j = 0; j < _this.allObservationsOfPatient.length; j++) {
                var observation = _this.allObservationsOfPatient[j];
                if (typeof observation.valueQuantity !== "undefined") {
                    // if (observation.status == "preliminary") {
                    // 	this.fillProperties(observation);
                    // 	let obs: OneObservationCleaned = new OneObservationCleaned(
                    // 		this.date,
                    // 		this.value,
                    // 		this.reference,
                    // 		this.text);
                    //
                    // 	this.observationsCleanedList.push(obs);
                    // }
                    if (observation.status == "final") {
                        _this.fillProperties(observation);
                        var obs = new OneObservationCleaned(_this.date, _this.value, _this.reference, _this.text);
                        _this.observationsCleanedList.push(obs);
                    }
                }
            }
            _this.labels = [];
            _this.datasets = [];
            _this.options = {
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
            _this.fillDatasets(_this.observationsCleanedList, _this.datasets);
            _this.config.data.labels = _this.labels;
            _this.config.data.datasets = _this.datasets;
            _this.config.options = _this.options;
        });
    }
    DiagramComponent.prototype.fillProperties = function (obsRes) {
        if (typeof obsRes.issued !== 'undefined') {
            this.date = obsRes.issued.toString();
        }
        if (typeof obsRes.valueQuantity.value !== 'undefined') {
            this.value = obsRes.valueQuantity.value;
        }
        if (typeof obsRes.referenceRange !== 'undefined') {
            this.reference = obsRes.referenceRange[0];
        }
        if (typeof obsRes.code.text !== 'undefined') {
            this.text = obsRes.code.text;
        }
    };
    DiagramComponent.prototype.fillDatasets = function (observationList, datasets) {
        for (var i = 0; i < observationList.length; i++) {
            if (observationList[i].value !== "") {
                var currentOb = observationList[i];
                this.labels.push(currentOb.date);
                console.log("date " + observationList[i].date);
                console.log("DATASET:");
                console.log(datasets);
                console.log(datasets.length);
                var datasetsize = datasets.length;
                //check if there is already data
                if (datasetsize > 0) {
                    for (var h = 0; h < datasetsize; h++) {
                        //check if there is already data with same label
                        if (datasets[h].label === currentOb.text) {
                            datasets[h].data.push(currentOb.value);
                            console.log("YAY");
                        }
                        else {
                            datasets.push({
                                label: currentOb.text,
                                fill: false,
                                backgroundColor: "rgba(0, 155, 0, 1)",
                                borderColor: "rgba(155, 0, 0, 1)",
                                data: [currentOb.value]
                            });
                        }
                    }
                }
                else {
                    datasets.push({
                        label: currentOb.text,
                        fill: false,
                        backgroundColor: "rgba(0, 0, 155, 1)",
                        borderColor: "rgba(155, 0, 0, 1)",
                        data: [currentOb.value]
                    });
                }
            }
        }
    };
    DiagramComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.height = 200;
        var context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
        this.chart.update();
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
        __metadata('design:paramtypes', [fhirProvider_service_1.FhirProvider])
    ], DiagramComponent);
    return DiagramComponent;
}());
exports.DiagramComponent = DiagramComponent;
//# sourceMappingURL=diagram.component.js.map