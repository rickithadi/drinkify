import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-punishment',
    templateUrl: './punishment.component.html',
    styleUrls: ['./punishment.component.css']
})
export class PunishmentComponent implements OnInit {
    punishments = ['One sip', 'Half a cup', 'Finish your cup', 'Full cup', 'Shot', 'Pay for the cab home']
    index: number;
    current: string;
    constructor() { }

    ngOnInit() {
        this.index = this.randomIntFromInterval(0, this.punishments.length);
        this.current = this.punishments[this.index];
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);

    }

}
