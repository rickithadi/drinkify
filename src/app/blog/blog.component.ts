import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { OrderPipe } from 'ngx-order-pipe';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/Rx";

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    localBlogs: any;
    result: any;
    modalRef: BsModalRef;
    constructor(private http: HttpClient, private modalService: BsModalService, ) { }

    ngOnInit() {
        this.getBlogs()
            .subscribe(data => {
                this.result = data
                console.log(this.result);
            })
    }
    getBlogs() {
        return this.http
            .get('/blogs')
            .map(res => res, this.result);
    }
    modal(input: any) {
        console.log(input);
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
}
