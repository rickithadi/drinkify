import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";

import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    payload: {};
    form: FormGroup;

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: Router) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            ref: [null],
            comment: [null, Validators.required]
        });
    }
    isFieldValid(field: string) {
        return !this.form.get(field).valid && this.form.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            "has-error": this.isFieldValid(field),
            "has-feedback": this.isFieldValid(field)
        };
    }

    onSubmit() {
        console.log(this.form);
        if (this.form.valid) {
            this.payload = this.form.value;

            console.log("form submitted", this.payload);
            this.route.navigate(["/success"]);
            return this.http
                .post("/contact", this.payload)
                .subscribe(data => { });
            // this.sendComment(JSON.stringify(this.form);
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    reset() {
        this.form.reset();
    }


}
