import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';

declare var FHIR: any;
declare var jQuery: any;


@Injectable()
export class FhirProvider {

    // serviceURL:string = 'https://fhir-open-api-dstu2.smarthealthit.org';
    serviceURL: string = 'https://fhir-api-dstu2.smarthealthit.org';
    smart: any;

    smartPromise: Promise<any>;

    constructor(private http: Http) {

        // this.init();
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

    protected handleError(error: Error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    public getDiagnosticReports(): Observable<fhir.BundleEntry[]> {
        console.log("smart", this.smart);
        return this.deferredToObservable(this.smart.api.search({
            type: "DiagnosticReport", query: {
                _profile: "http://hl7.no/fhir/StructureDefinition/LabDiagnosticReportNorway"
            }
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getObservations(): Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "Observation", query: {
                _profile: "http://hl7.no/fhir/StructureDefinition/LabObservationNorway"
            }
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getOrganizations(): Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "Organization", query: {
                _profile: "http://hl7.no/fhir/StructureDefinition/LabOrganizationNorway"
            }
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getPractitioners(): Observable<fhir.BundleEntry[]> {
        return this.deferredToObservable(this.smart.api.search({
            type: "Practitioner", query: {
                _profile: "http://hl7.no/fhir/StructureDefinition/LabPractitionerNorway"
            }
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);
    }

    public getPatients(): Observable<fhir.BundleEntry[]> {
        // if(this.smart) {
        return this.deferredToObservable(this.smart.api.search({
            type: "Patient", query: {
                // _profile: "http://hl7.no/fhir/StructureDefinition/LabPatientNorway"
            }
        })).map(res => <fhir.BundleEntry[]> res.data.entry)
            .catch(this.handleError);

        // else {
        //     return this.smartInitialized.flatMap((smart) => {
        //         return this.deferredToObservable(smart.api.search({
        //             type: "Patient", query: {
        //                 _profile: "http://hl7.no/fhir/StructureDefinition/LabPatientNorway"
        //             }
        //         })).map(res => <fhir.BundleEntry[]> res.data.entry)
        //             .catch(this.handleError);
        //     });
        // }
        // return Observable.fromPromise(this.smartPromise).flatMap((smart) => {
        //     return this.deferredToObservable(smart.api.search({
        //         type: "Patient", query: {
        //             _profile: "http://hl7.no/fhir/StructureDefinition/LabPatientNorway"
        //         }
        //     })).map(res => <fhir.BundleEntry[]> res.data.entry)
        //         .catch(this.handleError);
        // });
    }

    /**
     * Initializes the smart on fhir client
     *
     * @param serviceURL
     */
    public init() {

        let _this = this;

        // make call to authorization server to get a valid auth token
// get the URL parameters received from the authorization server
//         var state = this.getUrlParameter("state");  // session key
        // var code = this.getUrlParameter("code");    // authorization code
        //noinspection TypeScriptUnresolvedVariable
        console.log("state", state);
        //noinspection TypeScriptUnresolvedVariable
        console.log("code", code);
        // load the app parameters stored in the session
        //noinspection TypeScriptUnresolvedVariable
        var params = JSON.parse(sessionStorage[state]);  // load app session
        console.log(params);

        var tokenUri = params.tokenUri;
        var clientId = params.clientId;
        var secret = params.secret;
        var serviceUri = params.serviceUri;

        var redirectUri = params.redirectUri;
        // var tokenUri = "https://authorize-dstu2.smarthealthit.org/token";
        // var clientId = "40243f28-c52f-489d-8ec2-96c2ae0c1084";
        // var secret = null;
        // var serviceUri = "https://fhir-api-dstu2.smarthealthit.org";
        //
        // var redirectUri = "http://localhost:3000/index.html";

        // Prep the token exchange call parameters
        //noinspection TypeScriptUnresolvedVariable
        var data = {
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri
        };
        var options;
        if (!secret) {
            data['client_id'] = clientId;
        }
        options = {
            url: tokenUri,
            type: 'POST',
            data: data
        };
        if (secret) {
            options['headers'] = {'Authorization': 'Basic ' + btoa(clientId + ':' + secret)};
        }
        // obtain authorization token from the authorization service using the authorization code
        jQuery.ajax(options).done(function (res) {// should get back the access token and the patient ID
            var accessToken = res.access_token;
            var patientId = res.patient;
            console.log("res", res);


            // and now we can use these to construct standard FHIR
            // REST calls to obtain patient resources with the
            // SMART on FHIR-specific authorization header...
            // Let's, for example, grab the patient resource and
            // print the patient name on the screen

            // init me
            // FHIR client library can be used as usual
            _this.smart = new FHIR.client({
                serviceUrl: _this.serviceURL,
                auth: {
                    type: 'bearer',
                    token: accessToken
                }
            });
        });
    }
}