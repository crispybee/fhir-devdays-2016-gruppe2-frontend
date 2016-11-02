import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Headers, RequestOptions, Http, Response} from "@angular/http";

declare var jQuery: any;


@Injectable()
export class NorwayObjectValidator {

	private serviceUrl: string = "https://fhir.iap.hs-heilbronn.de/norwayvalidator/validate/";

	constructor(private http: Http) {
		// this.serviceUrl = url;
	}

	private handleError(error: Response | any) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.error(error);
		return Observable.throw(error || 'Server error');
	}

	private extractData(res: Response) {
		let body = res.json();
		console.log("body:");
		console.log(body);
		return body.data || { };
	}

	private sendToValidatorService(fhirProfileType: string, jsonObject: any) : Observable<Response> {
		// todo: add Access-Control-Allow-Origin: * ???
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let options = new RequestOptions({
			headers: headers
		});

		// TODO: Hier ist noch ein Fehler

		/*return jQuery.post(this.serviceUrl + fhirProfileType, jsonObject, function (data) {
			console.log(data);
		}, "json");*/

		console.log("This will be sent to the validator service:");
		console.log(JSON.stringify(jsonObject));

		return this.http.post(this.serviceUrl + fhirProfileType, JSON.stringify(jsonObject), options)
						.map(res => res.json())
						.catch(this.handleError);
	}

	private checkAnswer(answer: any) : boolean {
		if (answer.hasOwnProperty("issues"))
		{
			return true;
		} else {
			return false;
		}
	}

	public validateNorwayDiagnosticReport(diagnosticReport: fhir.DiagnosticReport) : boolean {
		let urlAddition: string = "DiagnosticReport";
		let answer: any;

		// todo: send diagnosticReport to validator service and check answer
		console.log("RES:");
		this.sendToValidatorService(urlAddition, diagnosticReport).subscribe(
			issuesReturn => console.log(issuesReturn),
			error => console.log("Error:", error)
		);

/*

		let check: boolean = this.checkAnswer(answer);

		if (check === false) {

		} else {

		}
*/
		return true;
	}

	public validateNorwayObservation() {

	}

	public validateNorwayOrganization() {

	}

	public validateNorwayPractitioner() {

	}

	public validateNorwayPatient() {

	}

}