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
    punishments = ['One sip', 'Half a cup', 'Finish your cup', 'Full cup', 'Shot']
    punishments2 = ['Half a cup', 'Finish your cup', 'Full cup', 'Shot']
    punishments3 = ['Finish your cup', 'Full cup', 'Shot']
    punishments4 = ['Full cup', '2 Shots', 'shot']
    index: number;
    current: string;
    double: string;
    triple: string;
    toh: string; finalQlist: any;
    private counterSource = new BehaviorSubject<number>(0);
    counter = this.counterSource.asObservable();
    count: number = 0;
    public isLoggedIn: boolean = false;
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
    incCounter() {
        this.count = this.count + 1;
        this.counterSource.next(this.count);
        console.log(this.count);

    }
    getCounter() {
        return this.counter;
    }

    getReddit(input: string) {
        //gets subreddit as input
        return this.http.get("https://www.reddit.com/r/" + input + "/search.json?q=oop&sort=top&restrict_sr=1");
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

}
