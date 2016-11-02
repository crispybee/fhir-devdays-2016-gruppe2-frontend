import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

declare var FHIR:any;
declare var jQuery:any;


@Injectable()
export class FhirProvider {

    // serviceURL:string = 'https://fhir-open-api-dstu2.smarthealthit.org';
    serviceURL:string = 'https://fhir.iap.hs-heilbronn.de/baseDstu2';
    smart:any;

    constructor() {
        this.init(this.serviceURL);
    }

    /**
     * Converts a jquery deferred object to an {@link Observable}.
     *
     * @param deferred
     * @returns {Observable<any>}
     */
    deferredToObservable(deferred): Observable<any> {
        return Observable.fromPromise(deferred.promise());
    }

    protected handleError(error:Error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    public getDiagnosticReports():Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "DiagnosticReport", query: {
				_profile: "http://hl7.no/fhir/StructureDefinition/LabDiagnosticReportNorway"
			}
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getObservations():Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "Observation", query: {
				_profile: "http://hl7.no/fhir/StructureDefinition/LabObservationNorway"
			}
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getOrganizations():Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "Organization", query: {
				_profile: "http://hl7.no/fhir/StructureDefinition/LabOrganizationNorway"
			}
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getPractitioners():Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "Practitioner", query: {
				_profile: "http://hl7.no/fhir/StructureDefinition/LabPractitionerNorway"
			}
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

	public getPatients():Observable<fhir.BundleEntry[]> {
		return this.deferredToObservable(this.smart.api.search({
			type: "Patient", query: {
                _profile: "http://hl7.no/fhir/StructureDefinition/LabPatientNorway"
            }
		})).map(res => <fhir.BundleEntry[]> res.data.entry)
			.catch(this.handleError);
	}

    /**
     * Initializes the smart on fhir client
     *
     * @param serviceURL
     */
    init(serviceURL) {
        // FHIR client library can be used as usual
        this.smart = new FHIR.client({
            serviceUrl: serviceURL,
            auth: {
                type: 'none'
            }
        });
    }
}