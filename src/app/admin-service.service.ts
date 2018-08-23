import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AdminServiceService {
    questions: any;
    questions1: any;
    questions2: any;
    index: number;
    private counterSource = new BehaviorSubject<number>(0);
    private AcounterSource = new BehaviorSubject<number>(0);
    counter = this.counterSource.asObservable();
    Acounter = this.AcounterSource.asObservable();
    count: number = 0;

    Acount: number = 0;

    private showSource = new BehaviorSubject<boolean>(false);
    show = this.showSource.asObservable();
    constructor(private http: HttpClient) {
    }
    parseReddit(input: any) {
        var parsed = [];
        for (let i = 0; i < input.length; i++) {
            let tits = { question: input[i].data.title }
            parsed.push(tits);
        }
        return parsed;
    }
    resetCounters() {
        this.Acount = 0;
        this.count = 0;
        this.AcounterSource.next(this.Acount);
        this.counterSource.next(this.count);
        console.log('arrow', this.Acount);


    }
    AincCounter() {
        this.Acount = this.Acount + 1;
        this.AcounterSource.next(this.Acount);
        console.log('arrow', this.Acount);

    }
    AgetCounter() {
        return this.Acount;
    }
    incCounter() {
        this.count = this.count + 1;
        this.counterSource.next(this.count);
        console.log('reg', this.count);

    }
    getCounter() {
        return this.count;
    }

    getTrivia() {
        return this.http.get("https://opentdb.com/api.php?amount=20&difficulty=easy&type=boolean");
    }
    getquestions() {
        console.log();
        return this.questions;
    }
    concatBoyz(array, array1, array2) {

        console.log('1', array);

        console.log('2', array1);
        console.log('3', array2);
        // array2 = array2.concat(array1);
        // console.log('teehee', array2);
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);

    }
    setShowTrue() {

        this.showSource.next(true);
        console.log('show currently at', this.show)
        return this.show;
    }
    setShowFalse() {

        this.showSource.next(false);
        console.log('show currently at', this.show)
        return this.show;
    }
}
