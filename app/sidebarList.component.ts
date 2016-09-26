import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FhirProvider } from './fhirProvider.service'
import { DateToAge } from './dateAgeCalculator';


class Entry {
constructor(public description:string) { }
}

@Component({
    selector: 'sidebar-list',
    templateUrl: 'app/sidebarlist/sidebarlist.html'
})
export class SidebarListComponent {
    patientFirstName: string = 'Hans';
    patientMiddleName: string = 'Hack';
    patientLastName: string = 'Wurst';
    patientBirthday: string = '01.01.1987';
    patientGender: string = 'male';
    calculatedAge: number = 29;

    constructor(private fhirProvider: FhirProvider) {
        fhirProvider.init('https://fhir.iap.hs-heilbronn.de/baseDstu2');
        fhirProvider.getPatients().subscribe(data => {
            console.log(data);

            let patient = (<fhir.Patient>data[0].resource);
            let dateToAge = new DateToAge(patient.birthDate);       

            this.patientFirstName = patient.name[0].given[0];
            this.patientMiddleName = '';
            this.patientLastName = patient.name[0].family[0];
            this.patientBirthday = dateToAge.getReadableDate();
            this.patientGender = patient.gender;  
            this.calculatedAge = dateToAge.getAge();
        });
    }

        /*
        this.smart = new FHIR.client({
            serviceUrl: 'https://fhir.iap.hs-heilbronn.de/baseDstu2',
            patientId: '1'
        });

        this.specimen = this.smart.patient.api.search({type: 'Specimen'});        

        this.specimen.done(function(specimens) {
            specimens = JSON.parse(specimens);
            console.log(this.specimen);
        });     */   

    dataPool: Entry[] = [
        new Entry('Blood sugar'),
        new Entry('Cholesterine'),
        new Entry('EKG'),
        new Entry('EEG'),
        new Entry('BMI'),
        new Entry('Test 1'),
        new Entry('Test 2'),
        new Entry('Test 3'),
        new Entry('Test 4'),
        new Entry('Test 5'),
        new Entry('Test 6'),
        new Entry('Test 7'),
        new Entry('Test 8'),
        new Entry('Test 9'),
        new Entry('Test 10'),
        new Entry('Test 11'),
        new Entry('Test 12'),
        new Entry('Test 13'),
        new Entry('Test 14'),
        new Entry('Test 15')
    ];
}