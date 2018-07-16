import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state, group, useAnimation }
    from '@angular/animations';
import { bounce } from 'ng-animate';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('bounce', [transition('* => *', useAnimation(bounce))])
    ]
})
export class HomeComponent implements OnInit {
    bounce: any;
    constructor() { }

    ngOnInit() {
    }
}
