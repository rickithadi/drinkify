import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, RouterModule, CanActivate } from "@angular/router";
import { Routes } from "@angular/router";

import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import {
    AppComponent, AlwaysAuthGuard,
    OnlyLoggedInGuard
} from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { StuffComponent } from './stuff/stuff.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { NgPipesModule } from 'ngx-pipes';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';

import { SuccessComponent } from './success/success.component';
import { AdminServiceService } from './admin-service.service';
import { TabsModule } from "ngx-bootstrap";
import { QuestionComponent } from './question/question.component';
const appRoutes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "contact", component: ContactComponent },
    { path: "stuff", component: StuffComponent }
    , { path: "auaucyh", component: LoginComponent }
    , { path: "success", component: SuccessComponent },
    { path: "blog", component: BlogComponent }
    , { path: "admin", component: AdminComponent, canActivate: [OnlyLoggedInGuard] }
    ,
    { path: "**", component: HomeComponent }

];
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        StuffComponent,
        BlogComponent,
        ContactComponent,
        FieldErrorDisplayComponent,
        SuccessComponent,
        LoginComponent,
        AdminComponent,
        QuestionComponent
    ],
    imports: [
        TabsModule.forRoot(),
        AngularFontAwesomeModule,
        NgPipesModule,
        ModalModule.forRoot(),
        HttpModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot(),
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [AdminServiceService, AlwaysAuthGuard, OnlyLoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
