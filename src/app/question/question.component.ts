import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { AdminServiceService } from '../admin-service.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    @Input() question: any;
    constructor(private admin: AdminServiceService, private modalService: NgbModal) { }
    ngOnInit() {
    }
    modal(input: any) {
        console.log(input);

    }
    updateCount() {
        this.admin.incCounter();
    }
    openModal(template: TemplateRef<any>) {
        // this.modalRef = this.modalService.show(template);
        this.modalService.open(template, { centered: true });
        this.updateCount();

    }
}
