import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatInputModule} from '@angular/material';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProfileComponent } from './profile/profile.component';
import { PronostiekComponent } from './pronostiek/pronostiek.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignUpDialogComponent} from "./signup/signup.component";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent } from './login/login.component';
import {UserService} from "./services/user.service";

const appRoutes: Routes = [

  { path: 'pronostiek', component: PronostiekComponent },
  { path: 'profile/:id',      component: ProfileComponent },
  { path: '**', component: PronostiekComponent }
];


@NgModule({
  declarations: [
    AppComponent,
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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
