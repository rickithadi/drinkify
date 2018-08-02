import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgbModal, NgbModalRef, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { AdminServiceService } from '../admin-service.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Subscription } from 'rxjs/Subscription';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";

import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],

    animations: [
        trigger('colour', [
            state('inactive', style({
                'color': '#606060',
                'background-color': 'transparent'


            })),
            state('active', style({
                'color': '#fff',
                'background-color': '*' // <====

            })),
            transition('inactive <=> active', animate('100ms ease-out'))

        ]),

        trigger('state', [
            state('inactive', style({
                'background-color': 'transparent',
                'transform': 'rotate(180deg)'


            })),
            state('active', style({
                'background-color': 'transparent',
                'transform': '{{transform}}'
                // 'transform': '*'
                // transform: 'rotate(360deg)'

            }),
                { params: { 'transform': 'rotate(180deg)' } }),

            transition('inactive <=> active', animate('2000ms ease-out'))

        ])
    ]
})
export class ContactComponent implements OnInit {
    stop: boolean = false;
    penis: number = 0
    transform: string = 'rotate(240deg)';
    bgColor = 'pink';
    public apiHost: string = '../../assets/never.json'
    countryList: any;
    count: number;
    questions1: any;
    questions2: any;
    result: any = [];
    colourIndex: number = 0;
    colours: string[] = ['chocolate', 'orange', 'LightSlateGray', 'DarkSeaGreen', 'chocolate', 'orange', 'Navy', 'DarkSeaGreen']


    subscription: Subscription;
    state = 'active';
    thing = 'active';
    constructor(private http: HttpClient
        , private admin: AdminServiceService, private route: Router) {

        this.subscription = this.admin.counter
            .subscribe(count => this.count = count);

        this.admin.getReddit('askreddit').subscribe(data => {
            this.questions1 = data['data'].children;

            this.questions1 = this.admin.parseReddit(this.questions1);

            this.result = this.result.concat(this.questions1);

            console.log(this.result);
            this.getAll();
            this.result = this.result.concat(this.countryList);
            this.result = this.shuffle(this.result);
            console.log('final', this.result);

        })
        this.getAll();
        this.result = this.result.concat(this.countryList);
        this.result = this.shuffle(this.result);
        console.log('final', this.result);

    }


    ngOnInit() {
    }
    click() {
        this.penis = this.randomIntFromInterval(360, 900);
        let rotation: string = 'rotate(' + this.penis + 'deg)';
        this.transform = rotation;
        this.state = this.state == 'active' ? 'inactive' : 'active';
        this.change();
        console.log(this.transform);
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];

        }
        return a;

    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);

    }
    question() {
        console.log('quest')
    }

    change() {
        if (this.colourIndex < 8) {

            this.bgColor = this.colours[this.colourIndex];
            this.colourIndex = this.colourIndex + 1
        }
        else {
            this.colourIndex = 0;

            this.bgColor = this.colours[this.colourIndex];
        }
    }
    getAll(): Promise<Object> {
        return this.http.get(this.apiHost, { responseType: 'text' })
            .toPromise()
            .then(response => this.extractData(response)).catch((err) => {
                console.log(err);


            });


    }
    extractData(res: any) {
        this.countryList = JSON.parse(res);
        let body = res;
        console.log(this.countryList);
        return body || {};


    }



}
