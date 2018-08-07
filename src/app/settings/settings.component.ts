import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { Options } from 'ng5-slider';
import "rxjs/Rx";
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    value: number = 2; options: Options = {
        floor: 0, ceil: 5
        , showSelectionBar: true
    };
    radioModel = 'Middle';
    data: any[] = [];
    never: any[] = [];
    disabled = false; ShowFilter = false; limitSelection = false;
    rabak: any = [];
    alcohol: any = [];
    awkward: any = [];
    dirty: any = [];
    goodie: any = [];
    myForm: FormGroup;
    selectedItems = [];
    dropdownSettings = {};
    public neverString: any = '../../assets/questions/never/never.json';
    public rabakString: any = '../../assets/questions/never/rabak.json';
    public alcoholString: any = '../../assets/questions/never/alcohol.json';
    public awkwardString: any = '../../assets/questions/never/awkward.json';
    public dirtyString: any = '../../assets/questions/never/dirty.json';
    public goodieString: any = '../../assets/questions/never/goodie.json';
    selectedCategories = [];
    ddList = [];
    default =
    [{ id: 9, name: "General Knowledge" }]
    trivia_categories = [{
        id: 9, name: "General Knowledge"
    }, {
        id: 10, name: "Entertainment: Books"
    }, {
        id: 11, name: "Entertainment: Film"
    }, {
        id: 12, name: "Entertainment: Music"
    }, {
        id: 13, name: "Entertainment: Musicals & Theatres"
    }, {
        id: 14, name: "Entertainment: Television"
    }, {
        id: 15, name: "Entertainment: Video Games"
    }, {
        id: 16, name: "Entertainment: Board Games"
    }, {
        id: 17, name: "Science & Nature"
    }, {
        id: 18, name: "Science: Computers"
    }, {
        id: 19, name: "Science: Mathematics"
    }, {
        id: 20, name: "Mythology"
    }, {
        id: 21, name: "Sports"
    }, {
        id: 22, name: "Geography"
    }, {
        id: 23, name: "History"
    }, {
        id: 24, name: "Politics"
    }, {
        id: 25, name: "Art"
    }, {
        id: 26, name: "Celebrities"
    }, {
        id: 27, name: "Animals"
    }, {
        id: 28, name: "Vehicles"
    }, {
        id: 29, name: "Entertainment: Comics"
    }, {
        id: 30, name: "Science: Gadgets"
    }, {
        id: 31, name: "Entertainment: Japanese Anime & Manga"
    }, {
        id: 32, name: "Entertainment: Cartoon & Animations"
    }
    ];
    constructor(private route: Router, private http: HttpClient, private q: QuestionsService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.assign();
        this.level2();
        this.ddList = [{
            id: 9, name: "General Knowledge"
        }, {
            id: 10, name: "Entertainment: Books"
        }, {
            id: 11, name: "Entertainment: Film"
        }, {
            id: 12, name: "Entertainment: Music"
        }, {
            id: 13, name: "Entertainment: Musicals & Theatres"
        }, {
            id: 14, name: "Entertainment: Television"
        }, {
            id: 15, name: "Entertainment: Video Games"
        }, {
            id: 16, name: "Entertainment: Board Games"
        }, {
            id: 17, name: "Science & Nature"
        }, {
            id: 18, name: "Science: Computers"
        }, {
            id: 19, name: "Science: Mathematics"
        }, {
            id: 20, name: "Mythology"
        }, {
            id: 21, name: "Sports"
        }, {
            id: 22, name: "Geography"
        }, {
            id: 23, name: "History"
        }, {
            id: 24, name: "Politics"
        }, {
            id: 25, name: "Art"
        }, {
            id: 26, name: "Celebrities"
        }, {
            id: 27, name: "Animals"
        }, {
            id: 28, name: "Vehicles"
        }, {
            id: 29, name: "Entertainment: Comics"
        }, {
            id: 30, name: "Science: Gadgets"
        }, {
            id: 31, name: "Entertainment: Japanese Anime & Manga"
        }, {
            id: 32, name: "Entertainment: Cartoon & Animations"
        }
        ];

        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false, idField: 'id', textField: 'name', selectAllText: 'Select All', unSelectAllText: 'UnSelect All', itemsShowLimit: 3, allowSearchFilter: false
            , maxHeight: '100'
        };
        this.myForm = this.fb.group({
            city: [this.selectedItems]
        });

    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];

        }
        return a;

    }
    getAll(input: any, assignTo: any) {
        return this.http.get(input)
            .toPromise()
            .then(response => this.extractData(response, assignTo)).catch((err) => {
                console.log(err);


            });


    }
    extractData(res: any, input: any) {
        input = res;
        let body = res;
        // console.log(input);
        return body || {};


    }
    assign() {
        this.getAll(this.goodieString, this.goodie).then(data => {
            this.goodie = data;

        })

        this.getAll(this.neverString, this.never).then(data => {
            this.never = data;

        })
        this.getAll(this.rabakString, this.rabak).then(data => {
            this.rabak = data;

        })
        this.getAll(this.alcoholString, this.alcohol).then(data => {
            this.alcohol = data;

        })
        this.getAll(this.dirtyString, this.dirty).then(data => {
            this.dirty = data;

        })
        this.getAll(this.awkwardString, this.awkward).then(data => {
            this.awkward = data;

        })

    }



    level1() {
        this.data = [];
        this.data = this.goodie;
        console.log('level 1', this.data);
        this.q.setQ(this.data);
        return this.data;
    }

    level2() {
        this.data = [];
        this.data = this.alcohol.concat(this.awkward, this.never);
        this.shuffle(this.data);
        console.log('level 2', this.data);

        this.q.setQ(this.data);
        return this.data;
    }
    level3() {
        this.data = [];
        this.data = this.alcohol.concat(this.dirty, this.rabak);

        this.shuffle(this.data);
        console.log('level 3', this.data);

        this.q.setQ(this.data);
        return this.data;
    }

    onItemSelect(item: any) {
        console.log('onItemSelect', item);
    } onSelectAll(items: any) {
        console.log('onSelectAll', items);
    } toogleShowFilter() {
        this.ShowFilter = !this.ShowFilter; this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
    } handleLimitSelection() {
        if (this.limitSelection) {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
        } else {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
        }
    }
    continue() {

        if (this.radioModel === 'Middle') {
            this.level2();;
        } else if (this.radioModel === 'Left') {
            this.level1();;
        } else if (this.radioModel === 'Right') {
            this.level3();;
        }
        if (this.myForm.value.city = []) {
            console.log('empty, setting to general', this.default)
            this.q.setcat(this.default);
        }
        else {

            this.q.setcat(this.myForm.value.city);
        }
        this.route.navigate(["play"]);
    }
}
