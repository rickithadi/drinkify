import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service'
@Component({
    selector: 'app-donezo',
    templateUrl: './donezo.component.html',
    styleUrls: ['./donezo.component.css']
})
export class DonezoComponent implements OnInit {

    constructor(private admin: AdminServiceService) { }

    ngOnInit() {
        this.admin.resetCounters();
    }

}
