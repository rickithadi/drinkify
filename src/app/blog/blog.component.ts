import { Component, OnInit, TemplateRef } from '@angular/core';
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
    done: any = [];
    questions: any;
    questions1: any;
    show: boolean;
    questionsArrow: any;
    question2Arrow: any;
    questions2: any;
    count: number;
    public neverHost: string = '../../assets/never.json'
    public picoloHost = '../../assets/picolo.json'
    picolo: any;
    colourIndex: number = 0;
    colours: string[] = ['chocolate', 'orange', 'LightSlateGray', 'DarkSeaGreen', 'chocolate', 'orange', 'Navy', 'DarkSeaGreen']
    bgColor = 'DarkSeaGreen';

    subscription: Subscription;
    constructor(private http: HttpClient, private admin: AdminServiceService) {
        this.subscription = this.admin.counter
            .subscribe(count => this.count = count);

        this.subscription = this.admin.show
            .subscribe(show => this.show = show);

        this.admin.getTrivia()
            .subscribe(data => {
                this.questions = data['results']
                this.result = this.result.concat(this.questions);
                // console.log(this.result);
                this.result = this.shuffle(this.result);
            })
        this.admin.getReddit('changemyview').subscribe(data => {
            this.questions1 = data['data'].children;
            this.questions1 = this.admin.parseReddit(this.questions1);

            this.result = this.result.concat(this.questions1);

            this.result = this.shuffle(this.result);

        })
        this.admin.getReddit('unpopularopinion').subscribe(data => {
            this.questions2 = data['data'].children;
            this.questions2 = this.admin.parseReddit(this.questions2);

            this.result = this.result.concat(this.questions2);

            this.result = this.shuffle(this.result);

            this.result = this.shuffle(this.result);

        })
        this.getAll(this.picoloHost, this.picolo).then(data => {
            this.picolo = data;

            this.result = this.result.concat(this.picolo);
            this.result = this.shuffle(this.result);
        })





        this.admin.getReddit('askreddit').subscribe(data => {
            this.question2Arrow = data['data'].children;
            this.question2Arrow = this.admin.parseReddit(this.question2Arrow);

            this.resultArrow = this.resultArrow.concat(this.question2Arrow);

            this.resultArrow = this.shuffle(this.resultArrow);
            console.log('fuck 1', this.resultArrow);
        })



        this.getAll(this.neverHost, this.questionsArrow).then(data => {
            this.questionsArrow = data;

            this.resultArrow = this.resultArrow.concat(this.questionsArrow);
            this.resultArrow = this.shuffle(this.resultArrow);

            console.log('fuck 2', this.resultArrow);
        })



    }

    ngOnInit() {
        // this.subscription = this.admin.counter
        //     .subscribe(count => this.count = count);

        // this.subscription = this.admin.show
        //     .subscribe(show => this.show = show);

    }
    tf() {

        this.result = this.shuffle(this.result);

        this.resultArrow = this.shuffle(this.resultArrow);



        this.cunt = this.result.concat(this.picolo);
        this.arrowcunt = this.resultArrow.concat(this.countryList);
        console.log('cunt', this.cunt)
        console.log('arrow cunt', this.arrowcunt)
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
        console.log(input);
        return body || {};


    }


}



