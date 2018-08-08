import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx'

import { HttpClient, HttpClientModule } from "@angular/common/http";

@Injectable()
export class QuestionsService {
    picolo: any[];
    arrowQuestions: any[] = [];
    triviaCat: any[] = [];
    trivia: any[] = [];
    tResult: any[] = [];
    constructor(private http: HttpClient) {
    }
    appendPicolo(input: any) {
        console.log('picolo apepnding with ', input)
        this.picolo = this.picolo.concat(input);
        console.log('now picolo', this.picolo)
    }

    setPicolo(input: any) {
        console.log('picolo set to', input)
        this.picolo = input
    }
    getPicolo() {
        this.picolo = this.shuffle(this.picolo);
        console.log('getting picolo', this.picolo)
        return this.picolo;
    }
    setQ(input: any) {
        this.arrowQuestions = input;
        console.log('set arrow to', this.arrowQuestions);
    }
    setcat(input: any) {
        this.triviaCat = input;
        console.log('set cat  to', this.triviaCat);
        this.tResult = this.getCat();
    }
    getTrivia() {
        console.log('reutnr t', this.tResult)
        return this.tResult;
    }
    getQ() {
        console.log('returning arrow', this.arrowQuestions)
        return this.arrowQuestions;
    }

    getCat() {
        this.extractTrivia(this.triviaCat);
        console.log('id list', this.trivia)
        return this.trivia;
        // console.log('trivia', this.trivia)
        // for (let i = 0; i < this.trivia.length; i++) {
        //     this.getAll(this.trivia[i]).then(data => {
        //         this.tResult = this.tResult.concat(data.results);

        //         console.log('result', this.tResult)
        //     })
        // }

    }
    extractTrivia(input: any) {
        let id = [];
        let url = '../../assets/questions/opentdb/c';
        for (let i = 0; i < input.length; i++) {
            let pushi: string = url + input[i].id + '.json'
            id.push(pushi)
        }
        this.trivia = id;
    }

    getAll(input: any) {
        return this.http.get(input)
            .toPromise()
            .then(response => this.extractData(response)).catch((err) => {
                console.log(err);


            });


    }
    extractData(res: any) {
        let body = res;
        return body || {};


    }
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];

        }
        return a;

    }

}
