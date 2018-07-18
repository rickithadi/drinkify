import { Component, Injectable } from '@angular/core';
import { AdminServiceService } from './admin-service.service';
import { CanActivate } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
}
export class AlwaysAuthGuard implements CanActivate {
    canActivate() {
        console.log('alwaysAuthGuard');
        return true;
    }
}


@Injectable()
export class OnlyLoggedInGuard implements CanActivate {
    constructor(private admin: AdminServiceService) { }
    canActivate() {
        console.log('OnlyLoggedInGuard');
        if (this.admin.check()) {
            return true;
        } else {
            window.alert('you dont have permission');
            return false;
        }
    }
}
