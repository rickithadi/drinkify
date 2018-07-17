import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/Rx";
@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    localBlogs: any;
    result: any;
    constructor(private http: HttpClient) { }

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
}
