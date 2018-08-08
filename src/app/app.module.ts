import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
import { Ng5SliderModule } from 'ng5-slider';
import {
    AppComponent,
    OnlyLoggedInGuard
} from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { NgPipesModule } from 'ngx-pipes';
import { AdminServiceService } from './admin-service.service';
import { TabsModule } from "ngx-bootstrap";
import { QuestionComponent } from './question/question.component';
import { PunishmentComponent } from './punishment/punishment.component';
import { SettingsComponent } from './settings/settings.component';
import { QuestionsService } from './questions.service';
import { ButtonsModule } from 'ngx-bootstrap';
import { DonezoComponent } from './donezo/donezo.component';
const appRoutes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "settings", component: SettingsComponent },
    { path: "play", component: BlogComponent },
    { path: "donezo", component: DonezoComponent },
    { path: "**", component: HomeComponent }

];
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        BlogComponent,
        ContactComponent,
        QuestionComponent,
        PunishmentComponent,
        SettingsComponent,
        DonezoComponent
    ],
    imports: [
        TabsModule.forRoot(),
        Ng5SliderModule,
        ButtonsModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
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
    providers: [AdminServiceService, QuestionsService, OnlyLoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
