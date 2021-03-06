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

import { Router } from '@angular/router';
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
    public picoloHostCasual = '../../assets/questions/drink/casual.json'
    public picoloHostMild = '../../assets/questions/drink/chill.json'
    public picoloHostList = '../../assets/questions/drink/lit.json'
    piq: any;;
    picolo: any;
    donezo: boolean = false;
    picolo1: any;
    picolo2: any;
    picolo3: any;
    colourIndex: number = 0;
    colours: string[] = ['chocolate', 'orange', 'LightSlateGray', 'DarkSeaGreen', 'chocolate', 'orange', 'pink', 'DarkSeaGreen']
    bgColor = 'DarkSeaGreen';

    subscription: Subscription;
    Asubscription: Subscription;
    Bsubscription: Subscription;
    constructor(private route: Router, private q: QuestionsService, private http: HttpClient, private admin: AdminServiceService) {
        this.subscription = this.admin.counter
            .subscribe(count => this.count = count);

        this.Asubscription = this.admin.Acounter
            .subscribe(Acount => this.Acount = Acount);

        this.Bsubscription = this.admin.show
            .subscribe(show => this.show = show);

        this.resultArrow = this.q.getQ();

        this.triviaBoyz();
        this.piq = this.q.getPicolo();
        this.result = this.result.concat(this.piq);
        this.result = this.shuffle(this.result);
        console.log(' picolo result', this.result);



    }

    ngOnInit() {
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();

    }
    change() {
        this.done();
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
        for (let i = 0; i < cats.length; i++) {
            this.getAll(cats[i]).then(data => {
                this.result = this.result.concat(data.results);
                this.result = this.shuffle(this.result);;
                console.log('subscripttion', this.result)
                // this.piq = this.q.getPicolo();
                // this.result = this.result.concat(this.piq);
                // this.result = this.shuffle(this.result);
                // console.log('result', this.result);
            })

        }

        // console.log('after', new);
        // this.flatten(hold);;

    }

    done() {
        if (this.Acount + this.count > 50) {
            console.log('donezo')
            this.route.navigate(["donezo"]);
        }
    }

}



