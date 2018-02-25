import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatInputModule} from '@angular/material';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { PronostiekComponent } from './pronostiek/pronostiek.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AuthService} from "./auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignUpDialogComponent} from "./signup/signup.component";
import {HttpClientModule} from "@angular/common/http";
import {ProfileService} from "./services/profile.service";
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [

  { path: 'pronostiek', component: PronostiekComponent },
  { path: 'profile/:id',      component: ProfileComponent },
  { path: '**', component: PronostiekComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ProfileComponent,
    PronostiekComponent,
    HeaderComponent,
    SidebarComponent,
    SignUpDialogComponent,
    LoginComponent
  ],
  entryComponents: [SignUpDialogComponent, LoginComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [AuthService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
