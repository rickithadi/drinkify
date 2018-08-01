import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AdminServiceService {
    private counterSource = new BehaviorSubject<number>(0);
    counter = this.counterSource.asObservable();
    count: number = 0;
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


}
