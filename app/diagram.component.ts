import {Component, ElementRef, ViewChild} from '@angular/core';
import {FhirProvider} from "./fhirProvider.service";
import Observation = fhir.Observation;

declare var Chart: any;

export class OneObservationCleaned {
    public date: string;
    public value: any;
    public referenceRange: any;
    public text: string;

    constructor(date: string, value: any, referenceRange: any, text: string) {
        this.date = date;
        this.value = value;
        this.referenceRange = referenceRange;
        this.text = text;
    }
}

export class AllObservations {
    private observationsCleanedList: OneObservationCleaned[] = [];
    date: string = "";
    value: any = "";
    reference: any = "";
    text: any = "";

    constructor(private fhirProvider: FhirProvider) {
        fhirProvider.getObservations().subscribe(data=> {
            console.log("All Observations before inserting");
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let obsRes: fhir.Observation = <fhir.Observation>data[i].resource;
                if (obsRes.status == "preliminary") {
                    this.fillProperties(obsRes);
                    let obs: OneObservationCleaned = new OneObservationCleaned(
                        this.date,
                        this.value,
                        this.reference,
                        this.text);

                    this.observationsCleanedList.push(obs);
                }
                else if (obsRes.status == "final") {
                    this.fillProperties(obsRes);
                    let obs: OneObservationCleaned = new OneObservationCleaned(
                        this.date,
                        this.value,
                        this.reference,
                        this.text);

                    this.observationsCleanedList.push(obs);
                }
            }
            console.log("nach for in constructor");
            console.log(this.observationsCleanedList);
        });
        console.log(this.observationsCleanedList);
    }

    fillProperties(obsRes: fhir.Observation) {
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
    }

    getAllObs(): OneObservationCleaned[] {
        console.log("getter");
        console.log(this.observationsCleanedList);
        return this.observationsCleanedList;
    }
}
@Component({
    selector: 'diagram-component',
    templateUrl: 'app/html/diagram.html'
})
export class DiagramComponent {

    @ViewChild('canvas') canvasRef: ElementRef;
    private canvas: any;

    private chart;

    observations: AllObservations;
    observationsCleanedList: OneObservationCleaned[] = [];
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
        this.observations = new AllObservations(new FhirProvider());
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


    fillDatasets() {
        console.log("blalalalal");
        console.log(this.observationsCleanedList.length);

        for (let i = 0; i < this.observationsCleanedList.length; i++) {
            if (this.observationsCleanedList[i].value !== "") {
                let currentOb = this.observationsCleanedList[i];
                this.labels.push(currentOb.date);
                console.log("date " + this.observationsCleanedList[i].date);
                //check if there is already data
                if (this.datasets.length > 0) {
                    for (let j = 0; j < this.datasets; j++) {
                        //check if there is already data with same label
                        if (this.datasets[j].label == currentOb.text) {
                            this.datasets[j].data.push(currentOb.value);
                        }
                        else {
                            this.datasets.push({
                                label: currentOb.text,
                                fill: false,
                                backgroundColor: "rgba(155, 0, 0, 1)",
                                borderColor: "rgba(155, 0, 0, 1)",
                                data: [currentOb.value]
                            });
                        }
                    }
                }
                else {
                    this.datasets.push({
                        label: currentOb.text,
                        fill: false,
                        backgroundColor: "rgba(155, 0, 0, 1)",
                        borderColor: "rgba(155, 0, 0, 1)",
                        data: [currentOb.value]
                    });
                }
            }
        }


    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.width = 500;
        this.canvas.height = 600;
        let context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
    }

}
