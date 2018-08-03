import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgbModal, NgbModalRef, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminServiceService } from '../admin-service.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Component, OnInit, Input, TemplateRef } from '@angular/core';
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
    @Input() question: any;
    stop: boolean = false;
    public mr: NgbModalRef;
    penis: number = 0
    transform: string = 'rotate(240deg)';
    bgColor = 'transparent';
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
    thing = 'inactive';
    constructor(private http: HttpClient
        , private modalService: NgbModal
        , private admin: AdminServiceService, private route: Router) {

    }


    ngOnInit() {
    }
    click() {
        this.penis = this.randomIntFromInterval(360, 900);
        let rotation: string = 'rotate(' + this.penis + 'deg)';
        this.transform = rotation;
        this.state = this.state == 'active' ? 'inactive' : 'active';
        // this.change();
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
    updateCount() {
        this.admin.incCounter();
    }
    openModal(template: TemplateRef<any>) {
        this.updateCount();
        this.mr = this.modalService.open(template, { size: 'lg', centered: true });
        // this.updateCount();
        // this.modalService.open(template, { size: 'lg', centered: true });
        // this.mr = this.modalService.open(template, { centered: true });

    }
    closeModal() {
        this.mr.close();
    }

    up() {
        this.updateCount();
        this.closeModal();
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
}
