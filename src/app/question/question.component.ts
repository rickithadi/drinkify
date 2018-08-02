import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AdminServiceService } from '../admin-service.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    constructor(private admin: AdminServiceService, private modalService: NgbModal) { }
    ngOnInit() {
    }
    // modal(input: any) {
    //     console.log(input);

    // }

    updateCount() {
        this.admin.incCounter();
    }
    openModal(template: TemplateRef<any>) {
        // this.modalRef = this.modalService.show(template);
        this.modalService.open(template, { centered: true });

    }
    next(input: object, template: TemplateRef<any>) {
        console.log('checkking', input)
        if ('correct_answer' in input) {
            console.log(input.correct_answer);
            this.openModal(template);
        }
        else {
            this.updateCount();
        }
    }
    up() {
        this.updateCount();
    }

}
