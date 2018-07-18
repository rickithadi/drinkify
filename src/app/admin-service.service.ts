import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AdminServiceService {


    public isLoggedIn: boolean = false;
    constructor() { }
    check() {
        console.log('cheking');

        if (this.isLoggedIn === true) {
            return true;
        } else {
            return false;
        }
    }

    loginSuccess() {
        this.isLoggedIn = true;
        console.log('login success');
    }
}
