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
        trigger('state', [
            state('inactive', style({
                'background-color': 'blue',
                'transform': 'rotate(0)'


            })),
            state('active', style({
                'background-color': 'pink',
                'transform': '{{transform}}'
                // 'transform': '*'
                // transform: 'rotate(360deg)'

            }),
                { params: { 'transform': 'rotate(180deg)' } }),

            transition('inactive <=> active', animate('1000ms ease-out'))

        ])
    ]
})
export class ContactComponent implements OnInit {
    stop: boolean = false;
    penis: number = 200
    transform: string = 'rotate(240deg)';
    bgColor = 'pink';
    state = 'active';
    constructor(private http: HttpClient,
        private route: Router) { }

    ngOnInit() {
    }
    click() {
        this.penis = this.penis + 30;
        let rotation: string = 'rotate(' + this.penis + 'deg)';
        this.transform = rotation;
        this.state = this.state == 'active' ? 'inactive' : 'active';
        console.log(this.transform);
    }

    animateMe() {


        this.state = (this.state === 'default' ? 'rotated' : 'default');


    }




}
