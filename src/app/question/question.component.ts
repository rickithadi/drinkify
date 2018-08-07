import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AdminServiceService } from '../admin-service.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgbModal, NgbModalRef, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],



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
export class QuestionComponent implements OnInit {
    @Input() question: any;
    show: boolean;
    hide: boolean = true;
    Bsubscription: Subscription;
    public mr: NgbModalRef;
    constructor(private admin: AdminServiceService, private modalService: NgbModal
        // , private mr: NgbModalRef

    ) {
        this.Bsubscription = this.admin.show
            .subscribe(show => this.show = show);

    }

    ngOnInit() {

        console.log("show=", this.show);
    }
    // modal(input: any) {
    //     console.log(input);

    // }

    updateCount() {
        this.admin.incCounter();
    }
    openModal(template: TemplateRef<any>) {
        this.mr = this.modalService.open(template, { size: 'lg', centered: true });

        // this.modalService.open(template, { size: 'lg', centered: true });
        // this.mr = this.modalService.open(template, { centered: true });

    }
    closeModal() {
        this.mr.close();
    }
    next(input: object, template: TemplateRef<any>) {
        console.log('checkking', input)
        if ('correct_answer' in input) {
            this.openModal(template);
        }
        else {
            this.updateCount();
        }
    }
    up() {
        this.updateCount();
        this.closeModal();
    }

}
