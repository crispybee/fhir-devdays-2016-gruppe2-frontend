import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

class Entry {
constructor(
    public description:string) { }
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