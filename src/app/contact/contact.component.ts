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
import { ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],

    animations: [
        trigger('state', [
            state('inactive', style({
                'background-color': 'transparent',
                'transform': '{{transform2}}'


            })
                ,
                { params: { 'transform2': 'rotate(10deg)' } }),



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
    penis: number = 0
    transform: string = 'rotate(0deg)';
    transform2: string = 'rotate(10deg)';
    bgColor = 'transparent';
    countryList: any;
    Acount: number;
    result: any = [];
    colourIndex: number = 0;
    show: boolean;
    @ViewChild('template') private template;
    public mr: NgbModalRef;
    Asubscription: Subscription;
    Bsubscription: Subscription;
    state = 'active';
    thing = 'inactive';
    spin: boolean = false;
    check: number;
    constructor(private http: HttpClient
        , private modalService: NgbModal
        , private admin: AdminServiceService, private route: Router) {


        this.Bsubscription = this.admin.show
            .subscribe(show => this.show = show);
        this.Asubscription = this.admin.Acounter
            .subscribe(Acount => this.Acount = Acount);




    }


    ngOnInit() {
        this.check = this.Acount;
        console.log("arrow", this.question);
        // this.closeModal();
        this.click(20, 20);
    }
    checkFirst() {
        let diff: number = this.Acount - this.check;
        console.log('diff', diff);
        if (this.check < this.Acount) {
            if (diff === 9) {

                console.log('switching');
                console.log(' check', this.check)
                console.log('acount', this.Acount)
                this.spin = false
                console.log('sping is', this.spin)
                this.admin.setShowFalse();
                return;
            }
            else {
                console.log('fire');
                console.log(' check', this.check)
                console.log('acount', this.Acount)
                this.spin = true
                return;
            }
        }
        else {
            console.log('nothing hit check=', this.check)
            console.log('acount', this.Acount)

            this.updateCount();
            return
        }
    }
    click(direction: number, speed: number) {

        this.checkFirst();
        if (this.spin === true) {
            this.penis = 0;
            this.penis = this.randomIntFromInterval(900, 2260);
            console.log('speed', speed)
            speed = speed - 1000;
            // this.penis = speed * 15;
            let rotation: string = 'rotate(' + this.penis + 'deg)';
            let penile = this.penis - 180;
            let rotation2: string = 'rotate(' + penile + 'deg)';
            this.transform = rotation;
            this.transform2 = rotation2;
            this.state = this.state == 'active' ? 'inactive' : 'active';
            // this.change();
            console.log('state is ', rotation);
            // this.Asubscription = this.admin.Acounter
            //     .subscribe(Acount => this.Acount = Acount);
            // this.openModal(template)
            this.openModal(this.template);
            this.updateCount();
        }
        else {

            console.log('noz', this.spin)
        }
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
        this.admin.AincCounter();
    }
    skip() {

        this.admin.AincCounter();
        // this.updateCount();
    }
    openModal(template: TemplateRef<any>) {
        if (this.show === true && this.spin === true) {
            console.log('spin', this.spin)
            console.log('show', this.show)
            setTimeout(() => {
                this.mr = this.modalService.open(template, { size: 'lg', centered: true });


            }, 3000)
        }
        // this.updateCount();
    }
    closeModal() {
        this.mr.dismiss();
    }
    onSwipe(input: any) {
        // console.log('swipper', input)
        let speed = input.velocity;
        let direction = input.direction;
        console.log('speed', speed);
        console.log('direction', direction);
        this.click(direction, speed);
    }

}
