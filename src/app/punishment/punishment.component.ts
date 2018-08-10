import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from '../questions.service';

import { AdminServiceService } from '../admin-service.service';
@Component({
    selector: 'app-punishment',
    templateUrl: './punishment.component.html',
    styleUrls: ['./punishment.component.css']
})
export class PunishmentComponent implements OnInit {
    @Input() hide?: boolean;
    skipCount = 0;
    punishments = ['One sip', 'Half a cup', 'Finish your cup', 'Full cup', 'Shot']

    pL1 = ['One sip', 'two sips', 'three sips']
    pL2 = ['three sips', 'two sips', 'four sips']
    pL3 = ['three sips', 'half a cup', 'four sips']
    pL4 = ['full cup', 'half a cup', 'four sips']
    pL5 = ['full cup', 'half a cup', 'shot', 'Undo a button', 'full cup and a buddha clap']
    punishments2 = ['Half a cup', 'Finish your cup', 'Full cup', 'Shot']
    punishments3 = ['Finish your cup', 'Full cup', 'Shot']
    punishments4 = ['Full cup', '2 Shots', 'shot', 'Undo two buttons']
    mod: number;
    index: number;
    current: string = this.punishments[0];
    double: string;
    triple: string;
    toh: string;
    disable: boolean = false;
    constructor(private q: QuestionsService, private admin: AdminServiceService) {
        // this.current = this.chooseOne(this.current, this.punishments);
        this.mod = this.q.getMod();
    }

    ngOnInit() {
        this.checkModifier();
        console.log('hidden', this.hide);
        if (this.hide == true) {
            this.disable = true;
        }
        // this.current = this.chooseOne(this.current, this.punishments);
        // this.index = this.randomIntFromInterval(0, this.punishments.length);
        // this.current = this.punishments[this.index];
    }
    chooseOne(which: string, input: any[]) {
        this.index = this.randomIntFromInterval(0, input.length);
        which = input[this.index];
        return which;

    }
    randomIntFromInterval(min, max) {
        max = max - 1;;
        return Math.floor(Math.random() * (max - min + 1) + min);

    }
    checkSkip(input) {

        this.current = this.chooseOne(this.current, this.punishments);
        console.log('current', input)
        if (input === 0) {
            console.log('skip 1')

            this.double = this.chooseOne(this.double, this.punishments2);
        } else if (input === 1) {

            console.log('skip 2')

            this.triple = this.chooseOne(this.triple, this.punishments3);
        } else if (input === 2) {

            console.log('skip 3')

            this.toh = this.chooseOne(this.toh, this.punishments4);
            this.disable = true;
            console.log('disable', this.disable);

            this.admin.setShowFalse();
        }
        else {
            console.log('no more');
            this.skipCount = 0
            this.disable = false;
            // this.admin.setShow();
        }

        this.skipCount = this.skipCount + 1;
    }
    skip() {
        this.checkSkip(this.skipCount);
        this.admin.AincCounter();
        // this.doubleTime();
    }
    checkModifier() {
        if (this.mod === 1) {
            console.log('hit', this.mod)
            this.current = this.chooseOne(this.current, this.pL1);
        }
        if (this.mod === 2) {

            console.log('hit', this.mod)
            this.current = this.chooseOne(this.current, this.pL2);
        } if (this.mod === 3) {

            console.log('hit', this.mod)
            this.current = this.chooseOne(this.current, this.pL3);
        } if (this.mod === 4) {

            console.log('hit', this.mod)
            this.current = this.chooseOne(this.current, this.pL4);
        } if (this.mod === 5) {

            console.log('hit toh', this.mod)
            this.current = this.chooseOne(this.current, this.pL5);
        }
    }
}
