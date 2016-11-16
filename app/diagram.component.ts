import {Component, ElementRef, ViewChild} from '@angular/core';
import {FhirProvider} from "./fhirProvider.service";
import Observation = fhir.Observation;
import decimal = fhir.decimal;

declare var Chart: any;

export class OneObservationCleaned {
    public date: string;
    public value: decimal;
    public referenceRange: any;
    public text: string;

    constructor(date: string, value: decimal, referenceRange: any, text: string) {
        this.date = date;
        this.value = value;
        this.referenceRange = referenceRange;
        this.text = text;
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
			for (let i = 0; i < data.length; i++) {
				let obsRes = <fhir.Observation>data[i].resource;
				//if (obsRes.subject.reference === this.referenceToPatient) {
					this.allObservationsOfPatient.push(obsRes);
				//}
			}

			for (let j = 0; j < this.allObservationsOfPatient.length; j++) {
				let observation: fhir.Observation = this.allObservationsOfPatient[j];
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
        this.fillDatasets(this.observationsCleanedList, this.datasets);

        this.config.data.labels = this.labels;
        this.config.data.datasets = this.datasets;
        this.config.options = this.options;
        this.chart.update();
		});
    }


	fillProperties(obsRes: fhir.Observation) {
		if (typeof obsRes.issued !== 'undefined') {
			this.date = obsRes.issued.toString();
		}
		if (typeof obsRes.valueQuantity.value !== 'undefined') {
			this.value = parseFloat(obsRes.valueQuantity.value.toString());
		}
		if (typeof obsRes.referenceRange !== 'undefined') {
			this.reference = obsRes.referenceRange[0];
		}
		if (typeof obsRes.code.text !== 'undefined') {
			this.text = obsRes.code.text;
		}
	}

    fillDatasets(observationList: OneObservationCleaned[], datasets:any[]) {
        for (let i = 0; i < observationList.length; i++) {
                let currentOb = observationList[i];
                this.labels.push(currentOb.date);

                // console.log("date " + observationList[i].date);
				// console.log("DATASET:");
				// console.log(datasets);
				// console.log(datasets.length);

                let datasetsize = datasets.length;
                //check if there is already data
                if (datasetsize > 0) {
                    for (let h = 0; h < datasetsize; h++) {
                        //check if there is already data with same label
                        if (datasets[h].label === currentOb.text)
                        {
                            datasets[h].data.push(currentOb.value);
							console.log("YAY");
                        } else
                        {
                            datasets.push({
                                label: currentOb.text,
                                fill: false,
                                backgroundColor: "rgba(0, 155, 0, 1)",
                                borderColor: "rgba(155, 0, 0, 1)",
                                data: [0,currentOb.value],
                                showLine:true,
                                onResize:function(){},
                            })
                            console.log("YAY");
                        }
                    }
                }
                else
                {
                    datasets.push({
                        label: currentOb.text,
                        fill: false,
                        backgroundColor: "rgba(0, 0, 155, 1)",
                        borderColor: "rgba(155, 0, 0, 1)",
                        data: [0,currentOb.value],
                        showLine:true,
                        onResize:function(){},
                    });
                    console.log("YAY");
                }
            }
        //this.chart.resize(this.chart.render, true);
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement;
        this.canvas.height = 200;
        let context = this.canvas.getContext('2d');
        this.chart = new Chart(context, this.config);
        //this.chart.resize(this.chart.render, true);
        //(this.chart.update();
       
    }

}
