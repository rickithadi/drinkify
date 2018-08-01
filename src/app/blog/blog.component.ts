import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { OrderPipe } from 'ngx-order-pipe';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/Rx";
import { AdminServiceService } from '../admin-service.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    localBlogs: any;
    result: any;
    modalRef: BsModalRef;
    count: number;
    subscription: Subscription;
    constructor(private http: HttpClient, private admin: AdminServiceService, private modalService: BsModalService, ) {
    }

    ngOnInit() {
        this.subscription = this.admin.counter
            .subscribe(count => this.count = count);
        this.getTrivia().subscribe(data => {
            this.result = data['results']
            console.log(this.result);


        })
    }
    modal(input: any) {
        console.log(input);
    }
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();

    }
    getTrivia() {
        return this.http.get("https://opentdb.com/api.php?amount=20&difficulty=easy&type=boolean").map(res => res, this.result);
    }
}
