import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { OrderPipe } from 'ngx-order-pipe';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'app-stuff',
    templateUrl: './stuff.component.html',
    styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit {
    result: any;
    questions: any;
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getReddit().subscribe(data => {
            console.log(data);
            this.result = data;
            this.questions = this.result.data.children;
            console.log(this.questions);

        })


    }
    getReddit() {

        return this.http.get("https://www.reddit.com/r/AskReddit/search.json?q=oop&sort=top&restrict_sr=1")
    }

}
