import { Component } from '@angular/core';


@Component({
    selector: 'navbar-component',
    templateUrl: 'app/html/navbar.html'
})
export class NavBarComponent {
    navBarTitle: string;

    constructor() {
        this.navBarTitle = "Patient";
    }
}