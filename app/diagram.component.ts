import {Component, ElementRef, ViewChild, Input} from '@angular/core';
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
    public allObservationsOfPatient: fhir.Observation[] = [];
    public observationsCleanedList: OneObservationCleaned[] = [];
    date: string = "";
    value: any = "";
    reference: any = "";
    text: any = "";

    constructor(private referenceToPatient: string) {
		let fhirProvider = new FhirProvider();

        fhirProvider.getObservations().subscribe(data => {
                for (let i = 0; i < data.length; i++) {
                    let obsRes = <fhir.Observation>data[i].resource;

                    if (obsRes.subject.reference === referenceToPatient) {
                        this.allObservationsOfPatient.push(obsRes);
                    }
                }

			console.log("Patient-Observation");
			console.log(this.allObservationsOfPatient.length);
			console.log(this.allObservationsOfPatient);

			for (let j = 0; j < this.allObservationsOfPatient.length; j++) {
				let observation: fhir.Observation = this.allObservationsOfPatient[j];

				if (typeof observation.valueQuantity !== "undefined") {
					if (observation.status == "preliminary") {
						this.fillProperties(observation);
						let obs: OneObservationCleaned = new OneObservationCleaned(
							this.date,
							this.value,
							this.reference,
							this.text);

						this.observationsCleanedList.push(obs);
					}
					else if (observation.status == "final") {
						this.fillProperties(observation);
						let obs: OneObservationCleaned = new OneObservationCleaned(
							this.date,
							this.value,
							this.reference,
							this.text);

						this.observationsCleanedList.push(obs);
					}
				}
			}

			console.log("nach for in constructor");
			console.log(this.observationsCleanedList);
		});
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

}


@Component({
    selector: 'diagram-component',
    templateUrl: 'app/html/diagram.html'
})
export class DiagramComponent {

    @ViewChild('canvas') canvasRef: ElementRef;
    private canvas: any;
    private chart;

	public allObservationsOfPatient: fhir.Observation[] = [];
	public observationsCleanedList: OneObservationCleaned[] = [];
	date: string = "";
	value: any = "";
	reference: any = "";
	text: any = "";
	referenceToPatient: string = "Patient/6";
    
    // observationsCleanedList: OneObservationCleaned[];
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
			for (let i = 0; i < data.length; i++) {
				let obsRes = <fhir.Observation>data[i].resource;

				if (obsRes.subject.reference === this.referenceToPatient) {
					this.allObservationsOfPatient.push(obsRes);
				}
			}

			console.log("Patient-Observation");
			console.log(this.allObservationsOfPatient.length);
			console.log(this.allObservationsOfPatient);

			for (let j = 0; j < this.allObservationsOfPatient.length; j++) {
				let observation: fhir.Observation = this.allObservationsOfPatient[j];

				if (typeof observation.valueQuantity !== "undefined") {
					if (observation.status == "preliminary") {
						this.fillProperties(observation);
						let obs: OneObservationCleaned = new OneObservationCleaned(
							this.date,
							this.value,
							this.reference,
							this.text);

						this.observationsCleanedList.push(obs);
					}
					else if (observation.status == "final") {
						this.fillProperties(observation);
						let obs: OneObservationCleaned = new OneObservationCleaned(
							this.date,
							this.value,
							this.reference,
							this.text);

						this.observationsCleanedList.push(obs);
					}
				}
			}

			console.log("nach for in constructor");
			console.log(this.observationsCleanedList);

        this.labels = [];
        this.datasets = [];
		// this.observationsCleanedList = new AllObservations("Patient/6").observationsCleanedList;

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
			this.fillDatasets(this.observationsCleanedList);

        this.config.data.labels = this.labels;
        this.config.data.datasets = this.datasets;
        this.config.options = this.options;

		});
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

    fillDatasets(observationList: OneObservationCleaned[]) {
        console.log("size of obs");
		console.log(observationList.length);
		console.log(observationList);
        for (let i = 0; i < observationList.length; i++) {
            if (observationList[i].value !== "") {
                let currentOb = observationList[i];
                this.labels.push(currentOb.date);

                console.log("date " + observationList[i].date);

				console.log("DATASET:");
				console.log(this.datasets);
				console.log(this.datasets.length);

                //check if there is already data
                if (this.datasets.length > 0) {
                    for (let h = 0; h < this.datasets.length; h++) {

                        //check if there is already data with same label
                        if (this.datasets[h].label === currentOb.text) {
                            this.datasets[h].data.push(currentOb.value);
							console.log("YAY");
                        } else {
                            this.datasets.push({
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
                    this.datasets.push({
                        label: currentOb.text,
                        fill: false,
                        backgroundColor: "rgba(0, 0, 155, 1)",
                        borderColor: "rgba(155, 0, 0, 1)",
                        data: [currentOb.value]
                    });
                }
            }
        }
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        // this.canvas.width = 500;
        this.canvas.height = 200;
        let context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
    }

}
