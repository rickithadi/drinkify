import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx'

import { HttpClient, HttpClientModule } from "@angular/common/http";

@Injectable()
export class QuestionsService {

    arrowQuestions: any[] = [];
    triviaCat: any[] = [];
    constructor(private http: HttpClient) {
    }

    setQ(input: any) {
        this.arrowQuestions = input;
        console.log('set to', this.arrowQuestions);
    }
    setcat(input: any) {
        this.triviaCat = input;
        console.log('set to', this.triviaCat);
    }
    getQ() {
        console.log('returning arrow', this.arrowQuestions)
        return this.arrowQuestions;
    }

    getCat() {
        return this.triviaCat;;
    }

}
