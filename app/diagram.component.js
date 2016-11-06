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
var AllObservations = (function () {
    function AllObservations(fhirProvider) {
        var _this = this;
        this.fhirProvider = fhirProvider;
        this.observationsCleanedList = [];
        this.date = "";
        this.value = "";
        this.reference = "";
        this.text = "";
        fhirProvider.getObservations().subscribe(function (data) {
            console.log("All Observations before inserting");
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var obsRes = data[i].resource;
                if (obsRes.status == "preliminary") {
                    _this.fillProperties(obsRes);
                    var obs = new OneObservationCleaned(_this.date, _this.value, _this.reference, _this.text);
                    _this.observationsCleanedList.push(obs);
                }
                else if (obsRes.status == "final") {
                    _this.fillProperties(obsRes);
                    var obs = new OneObservationCleaned(_this.date, _this.value, _this.reference, _this.text);
                    _this.observationsCleanedList.push(obs);
                }
            }
            console.log("nach for in constructor");
            console.log(_this.observationsCleanedList);
        });
        console.log(this.observationsCleanedList);
    }
    AllObservations.prototype.fillProperties = function (obsRes) {
        if (typeof obsRes.issued !== 'undefined') {
            this.date = obsRes.issued.toString();
        }
        if (typeof obsRes.valueQuantity !== 'undefined') {
            this.value = obsRes.valueQuantity.value;
        }
        if (typeof obsRes.referenceRange !== 'undefined') {
            this.reference = obsRes.referenceRange[0];
        }
        if (typeof obsRes.code !== 'undefined') {
            this.text = obsRes.code.text.toString();
        }
    };
    AllObservations.prototype.getAllObs = function () {
        console.log("getter");
        console.log(this.observationsCleanedList);
        return this.observationsCleanedList;
    };
    return AllObservations;
}());
exports.AllObservations = AllObservations;
var DiagramComponent = (function () {
    function DiagramComponent() {
        this.observationsCleanedList = [];
        this.config = {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {}
        };
        this.observations = new AllObservations(new fhirProvider_service_1.FhirProvider());
        this.observationsCleanedList = this.observations.getAllObs();
        this.labels = [];
        this.datasets = [];
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
        this.fillDatasets();
        this.config.data.labels = this.labels;
        this.config.data.datasets = this.datasets;
        this.config.options = this.options;
    }
    DiagramComponent.prototype.fillDatasets = function () {
        console.log("blalalalal");
        console.log(this.observationsCleanedList.length);
        for (var i = 0; i < this.observationsCleanedList.length; i++) {
            if (this.observationsCleanedList[i].value !== "") {
                var currentOb = this.observationsCleanedList[i];
                this.labels.push(currentOb.date);
                console.log("date " + this.observationsCleanedList[i].date);
                this.datasets.push({
                    label: currentOb.text,
                    fill: false,
                    backgroundColor: "rgba(155, 0, 0, 1)",
                    borderColor: "rgba(155, 0, 0, 1)",
                    data: [currentOb.value]
                });
            }
        }
    };
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