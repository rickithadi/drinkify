import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: string;
    pass: string;
    constructor(private admin: AdminServiceService, private route: Router) { }

    ngOnInit() {
    }

    // loginCheck(user: string, pass: string) {
    //     if (user == 'admin' && pass == '123xyz') {
    //         this.admin.loginSuccess();
    //         this.route.navigate(["admin"]);
    //     }
    //     else {
    //         alert('piss off');
    //     }
    // }
}
