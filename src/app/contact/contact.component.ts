import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(360deg)' })),
            transition('rotated => default',
                animate('5500ms ease-out')),
            transition('default => rotated', animate('400ms ease-in'))])
        , trigger('state', [
            state('inactive', style({
                'color': '#606060',
                'background-color': 'transparent'


            })),
            state('active', style({
                'color': '#fff',
                'background-color': '*' // <====

            })),
            transition('inactive <=> active', animate('100ms ease-out'))

        ])
    ]
})
export class ContactComponent implements OnInit {
    state: string = 'default';
    stop: boolean = false;
    payload: {};
    form: FormGroup;
    bgColor = 'pink';
    constructor(private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: Router) { }

    ngOnInit() {
        this.animateMe();
    }
    click() {
        this.bgColor = 'orange';
    }

    animateMe() {


        this.state = (this.state === 'default' ? 'rotated' : 'default');


    }




}
