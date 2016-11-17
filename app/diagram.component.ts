import {Component, ElementRef, ViewChild, Input} from '@angular/core';
import {FhirProvider} from "./fhirProvider.service";
import Observation = fhir.Observation;
import decimal = fhir.decimal;
import date = fhir.date;
import integer = fhir.integer;


declare var Chart: any;

export class OneObservationCleaned {
	public counter: number;
    public date: any;
    public value: decimal;
    public referenceRange: any;
    public text: string;
    public status: string;



    constructor(counter: number, date: string, value: decimal, referenceRange: any, text: string) {
		this.counter = counter;
        this.date = date;
        this.value = value;
        this.referenceRange = referenceRange;
        this.text = text;

        if( value>= this.referenceRange.high && this.referenceRange.value.high!=  null)
        {console.log("high");
            status="high";}
        else if(value <= this.referenceRange.low && this.referenceRange.low != null)
        {console.log("low");
            status="low";}
        else{console.log("normal")
            status="normal";}

    }
}


@Component({
    selector: 'diagram-component',
    templateUrl: 'app/html/diagram.html'
})
export class DiagramComponent {
    @Input('patientId') patientId: string;
    @ViewChild('canvas') canvasRef: ElementRef;
    private canvas: any;
    private chart;

    public allObservationsOfPatient: fhir.Observation[] = [];
    public observationsCleanedList: OneObservationCleaned[] = [];
    date: any;
    value: decimal = 0;
    reference: any = "";
    text: any = "Not specified";
    referenceToPatient: string = "";

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

    constructor(fhirProvider: FhirProvider) {

        fhirProvider.getObservations().subscribe(data => {

            fhirProvider.getObservationsByPatientId(this.patientId).subscribe(data2 => {
                if (data2 != null) {

                            for (let i = 0; i < data.length; i++) {
                                let obsRes = <fhir.Observation>data[i].resource;
                                this.allObservationsOfPatient.push(obsRes)
                            }
                            console.log("Patient Id in under component");
                            console.log(this.patientId);

                            console.log("all observations");
                            console.log(this.allObservationsOfPatient);

                            for (let j = 0; j < this.allObservationsOfPatient.length; j++) {
                                let observation: fhir.Observation = this.allObservationsOfPatient[j];
                                if (typeof observation.valueQuantity !== "undefined") {
                                    if (observation.status == "preliminary") {
                                        this.fillProperties(observation);
                                        let obs: OneObservationCleaned = new OneObservationCleaned(
                                            0,
                                            this.date,
                                            this.value,
                                            this.reference,
                                            this.text);

                                        this.observationsCleanedList.push(obs);
                                    }
                                    if (observation.status == "final") {
                                        this.fillProperties(observation);
                                        let obs: OneObservationCleaned = new OneObservationCleaned(
                                            0,
                                            this.date,
                                            this.value,
                                            this.reference,
                                            this.text);

                                        this.observationsCleanedList.push(obs);
                                    }
                                }
                            }
                        }
                    }

                    this.labels = [];
                    this.datasets = [];
                    this.options = {
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
                    this.fillDatasets(this.observationsCleanedList, this.datasets);
                    this.config.data.labels = this.labels;
                    this.config.data.datasets = this.datasets;
                    this.config.options = this.options;
                    this.chart.update();


                }
            });


        });
    }


    fillProperties(obsRes: fhir.Observation) {
        if (obsRes.issued) {
            this.date = Date.parse(obsRes.issued.toString());

        }
        if ( obsRes.valueQuantity.value) {
            this.value = parseFloat(obsRes.valueQuantity.value.toString());
        }
        if (obsRes.referenceRange ) {
            this.reference = obsRes.referenceRange[0];
        }
        if ( obsRes.code) {
            this.text = obsRes.code.coding[0].display + " in " + obsRes.valueQuantity.unit.toString();
        }
    }

    fillDatasets(observationList: OneObservationCleaned[], datasets: any[]) {
        for (let i = 0; i < observationList.length; i++) {
            let currentOb = observationList[i];
            this.labels.push(currentOb.date);
            let datasetsize = datasets.length;
            //check if there is already data
            if (datasetsize > 0) {
                for (let h = 0; h < datasetsize; h++) {
                    let contained:boolean;
                    for (let k = 0; k < datasetsize; k++) {
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

                    } else {
                        let color: string = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ", 1)";
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
                let color: string = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ", 1)";
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
        this.labels.sort((n1,n2) => {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });

    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        let context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);

    }

}