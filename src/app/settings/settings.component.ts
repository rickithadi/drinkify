import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';

import "rxjs/Rx";
import { Subscription } from 'rxjs/Subscription';

import { HttpClient, HttpClientModule } from "@angular/common/http";
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    radioModel = 'Middle';
    data: any[] = [];
    never: any[] = [];
    rabak: any = [];
    alcohol: any = [];
    awkward: any = [];
    dirty: any = [];
    goodie: any = [];

    public neverString: any = '../../assets/questions/never/never.json';
    public rabakString: any = '../../assets/questions/never/rabak.json';
    public alcoholString: any = '../../assets/questions/never/alcohol.json';
    public awkwardString: any = '../../assets/questions/never/awkward.json';
    public dirtyString: any = '../../assets/questions/never/dirty.json';
    public goodieString: any = '../../assets/questions/never/goodie.json';

    constructor(private http: HttpClient, private q: QuestionsService) {
    }

    ngOnInit() {
        this.assign();
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];

        }
        return a;

    }
    getAll(input: any, assignTo: any) {
        return this.http.get(input)
            .toPromise()
            .then(response => this.extractData(response, assignTo)).catch((err) => {
                console.log(err);


            });


    }
    extractData(res: any, input: any) {
        input = res;
        let body = res;
        // console.log(input);
        return body || {};


    }
    assign() {
        this.getAll(this.goodieString, this.goodie).then(data => {
            this.goodie = data;

        })

        this.getAll(this.neverString, this.never).then(data => {
            this.never = data;

        })
        this.getAll(this.rabakString, this.rabak).then(data => {
            this.rabak = data;

        })
        this.getAll(this.alcoholString, this.alcohol).then(data => {
            this.alcohol = data;

        })
        this.getAll(this.dirtyString, this.dirty).then(data => {
            this.dirty = data;

        })
        this.getAll(this.awkwardString, this.awkward).then(data => {
            this.awkward = data;

        })

    }



    level1() {
        this.data = [];
        this.data = this.goodie;
        console.log('level 1', this.data);
        this.q.setQ(this.data);
        return this.data;
    }

    level2() {
        this.data = [];
        this.data = this.alcohol.concat(this.awkward, this.never);
        this.shuffle(this.data);
        console.log('level 2', this.data);

        this.q.setQ(this.data);
        return this.data;
    }
    level3() {
        this.data = [];
        this.data = this.alcohol.concat(this.dirty, this.rabak);

        this.shuffle(this.data);
        console.log('level 3', this.data);

        this.q.setQ(this.data);
        return this.data;
    }

}
