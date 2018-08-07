import { Component, OnInit, TemplateRef } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { OrderPipe } from 'ngx-order-pipe';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/Rx";
import { AdminServiceService } from '../admin-service.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Subscription } from 'rxjs/Subscription';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
    ,
    animations: [
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(360deg)' })),
            transition('rotated => default',
                animate('5500ms ease-out')),
            transition('default => rotated', animate('400ms ease-in'))])
        , trigger('state', [
            state('inactive', style({
                'color': '#606060',
                'background-color': 'pink'


            })),
            state('active', style({
                'color': '#fff',
                'background-color': '*' // <====

            })),
            transition('inactive <=> active', animate('100ms ease-out'))

        ])
    ]


})
export class BlogComponent implements OnInit {
    result: any = [];
    resultArrow: any = [];
    state = 'active';
    questions: any;
    questions1: any;
    show: boolean;
    count: number;
    Acount: number;
    public picoloHost = '../../assets/questions/drink/picolo.json'
    picolo: any;
    colourIndex: number = 0;
    colours: string[] = ['chocolate', 'orange', 'LightSlateGray', 'DarkSeaGreen', 'chocolate', 'orange', 'pink', 'DarkSeaGreen']
    bgColor = 'DarkSeaGreen';

    subscription: Subscription;
    Asubscription: Subscription;
    Bsubscription: Subscription;
    constructor(private q: QuestionsService, private http: HttpClient, private admin: AdminServiceService) {
        this.subscription = this.admin.counter
            .subscribe(count => this.count = count);

        this.Asubscription = this.admin.Acounter
            .subscribe(Acount => this.Acount = Acount);

        this.Bsubscription = this.admin.show
            .subscribe(show => this.show = show);

        this.resultArrow = this.q.getQ();

        this.triviaBoyz();
    }

    ngOnInit() {
        // this.resultArrow = this.q.getQ();
        // console.log('wtf', this.resultArrow);
        // this.triviaBoyz();
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();

    }
    change() {
        if (this.colourIndex < 8) {

            this.bgColor = this.colours[this.colourIndex];
            this.colourIndex = this.colourIndex + 1
        }
        else {
            if (this.show == false) {
                this.admin.setShowTrue();
            }
            else if (this.show == true) {
                this.admin.setShowFalse();
            }

            // this.show = !this.show;
            this.colourIndex = 0;

            this.bgColor = this.colours[this.colourIndex];
        }
    }
    bang() {
        this.result = this.shuffle(this.result);
        // console.log(this.result);
    }
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];

        }
        return a;

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
    triviaBoyz() {
        let cats: string[] = this.q.getCat();
        console.log('this shit', cats)
        for (let i = 0; i < cats.length; i++) {
            this.getAll(cats[i]).then(data => {
                this.result = this.result.concat(data.results);

                console.log('result', this.result);
            })

        }
        this.getAll(this.picoloHost).then(data => {
            this.result = this.result.concat(data);
            this.result = this.shuffle(this.result)
            console.log(' final result', this.result);
        })



        // console.log('after', new);
        // this.flatten(hold);;
        console.log(this.result)

    }


}



