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
    function OneObservationCleaned(counter, date, value, referenceRange, text) {
        this.counter = counter;
        this.date = date;
        this.value = value;
        this.referenceRange = referenceRange;
        this.text = text;
        if (value >= this.referenceRange.high && this.referenceRange.value.high != null) {
            console.log("high");
            status = "high";
        }
        else if (value <= this.referenceRange.low && this.referenceRange.low != null) {
            console.log("low");
            status = "low";
        }
        else {
            console.log("normal");
            status = "normal";
        }
    }
    return OneObservationCleaned;
}());
exports.OneObservationCleaned = OneObservationCleaned;
var DiagramComponent = (function () {
    function DiagramComponent(fhirProvider) {
        var _this = this;
        this.allObservationsOfPatient = [];
        this.observationsCleanedList = [];
        this.value = 0;
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
            fhirProvider.getObservationsByPatientId(_this.patientId).subscribe(function (data2) {
                if (data2 != null) {
                    for (var i = 0; i < data2.length; i++) {
                        var obsRes = data2[i].resource;
                        _this.allObservationsOfPatient.push(obsRes);
                    }
                    console.log("all observations");
                    console.log(_this.allObservationsOfPatient);
                    for (var j = 0; j < _this.allObservationsOfPatient.length; j++) {
                        var observation = _this.allObservationsOfPatient[j];
                        if (observation.valueQuantity) {
                            // if (observation.status == "preliminary") {
                            //     this.fillProperties(observation);
                            //     let obs: OneObservationCleaned = new OneObservationCleaned(
                            //         this.date,
                            //         this.value,
                            //         this.reference,
                            //         this.text);
                            //
                            //     this.observationsCleanedList.push(obs);
                            // }
                            if (observation.status == "final") {
                                _this.fillProperties(observation);
                                var obs = new OneObservationCleaned(0, _this.date, _this.value, _this.reference, _this.text);
                                _this.observationsCleanedList.push(obs);
                            }
                        }
                    }
                    _this.labels = [];
                    _this.datasets = [];
                    _this.options = {
                        maintainAspectRatio: true,
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
                                        labelString: 'date',
                                        type: 'linear'
                                    },
                                    scaleOverride: true,
                                    scaleSteps: 10,
                                    scaleStepWidth: 50,
                                    scaleStartValue: 0
                                }],
                            yAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'value',
                                        type: 'linear'
                                    },
                                    scaleOverride: true,
                                    scaleSteps: 10,
                                    scaleStepWidth: 50,
                                    scaleStartValue: 0
                                }]
                        },
                    };
                    _this.fillDatasets(_this.observationsCleanedList, _this.datasets);
                    _this.config.data.labels = _this.labels;
                    _this.config.data.datasets = _this.datasets;
                    _this.config.options = _this.options;
                    _this.chart.update();
                }
            });
        });
    }
    DiagramComponent.prototype.fillProperties = function (obsRes) {
        if (obsRes.issued) {
            this.date = Date.parse(obsRes.issued.toString());
        }
        if (obsRes.valueQuantity.value) {
            this.value = parseFloat(obsRes.valueQuantity.value.toString());
        }
        if (obsRes.referenceRange) {
            this.reference = obsRes.referenceRange[0];
        }
        if (obsRes.code) {
            this.text = obsRes.code.coding[0].display + " in " + obsRes.valueQuantity.unit.toString();
        }
    };
    DiagramComponent.prototype.fillDatasets = function (observationList, datasets) {
        for (var i = 0; i < observationList.length; i++) {
            var currentOb = observationList[i];
            this.labels.push(currentOb.date);
            var datasetsize = datasets.length;
            //check if there is already data
            if (datasetsize > 0) {
                for (var h = 0; h < datasetsize; h++) {
                    var contained = void 0;
                    for (var k = 0; k < datasetsize; k++) {
                        if (!contained) {
                            if (datasets[k].label === currentOb.text) {
                                contained = true;
                            }
                        }
                    }
                    //check if there is already data with same label
                    if (contained) {
                        datasets[h].data.push(currentOb.value);
                        console.log("YAY 1");
                        console.log(currentOb.text);
                        console.log(datasets);
                    }
                    else {
                        var color = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ", 1)";
                        datasets.push({
                            label: currentOb.text,
                            fill: false,
                            backgroundColor: color,
                            borderColor: color,
                            data: [currentOb.value],
                            showLine: true,
                        });
                        console.log("YAY 2");
                        console.log(currentOb.text);
                        console.log(datasets);
                    }
                }
            }
            else {
                var color = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ", 1)";
                datasets.push({
                    label: currentOb.text,
                    fill: false,
                    backgroundColor: color,
                    borderColor: color,
                    data: [currentOb.value],
                    showLine: true,
                });
                console.log("YAY 3");
                console.log(currentOb.text);
                console.log(datasets);
            }
        }
        this.labels.sort(function (n1, n2) {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });
    };
    DiagramComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.canvasRef.nativeElement;
        var context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
    };
    __decorate([
        core_1.Input('patientId'), 
        __metadata('design:type', String)
    ], DiagramComponent.prototype, "patientId", void 0);
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