import { Component } from '@angular/core';
import {Clippy} from "./clippy.service";


@Component({
    selector: 'navbar-component',
    templateUrl: 'app/html/navbar.html'
})
export class NavBarComponent {
    navBarTitle: string;

    constructor(private clippy: Clippy) {
        this.navBarTitle = "Dr. Gregory House";
    }
}