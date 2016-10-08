import { Component } from '@angular/core';
import { Router    } from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Component({
    selector: 'login-component',
    templateUrl: 'app/html/login.html'
})

export class LoginComponent {
    name:string;
    password:string;
    authService:AuthenticationService;
    errorMsg:string;

    constructor() {

    }

    login():void {
        if (!this.authService.login()) {
            this.errorMsg = 'FAiled to login';
        }

    }
    

}