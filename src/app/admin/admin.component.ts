import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/Rx";
import { OrderPipe } from 'ngx-order-pipe';

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    result: any;
    reverse: boolean = false;
    modalRef: BsModalRef;
    localBlogs: any;
    constructor(private http: HttpClient,
        private modalService: BsModalService) { }

    ngOnInit() {
        this.getBlogs()
            .subscribe(data => {
                this.result = data
                console.log(this.result);
            })
    }

    getBlogs() {
        return this.http
            .get('http://localhost:8080/blogs')
            .map(res => res, this.result);
    }
    modal(input: any) {
        console.log(input);
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    delete(input: any) {

    }
    updateContent(input: any) {

        console.log('updated', input);
        var url = 'http://localhost:8080/blog';
        return this.http.post(url, input)
            .subscribe(data => { });
    }

}
