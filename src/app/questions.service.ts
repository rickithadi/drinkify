import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx'

import { HttpClient, HttpClientModule } from "@angular/common/http";

@Injectable()
export class QuestionsService {

    arrowQuestions: any[] = [];
    constructor(private http: HttpClient) {
    }

    setQ(input: any) {
        this.arrowQuestions = input;
        console.log('set to', this.arrowQuestions);
    }
    getQ() {
        return this.arrowQuestions;
    }

}
