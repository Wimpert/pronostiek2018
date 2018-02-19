import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatInputModule} from '@angular/material';


import {AppComponent, SignUpDialogComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { PronostiekComponent } from './pronostiek/pronostiek.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AuthService} from "./auth.service";
import {ReactiveFormsModule} from "@angular/forms";

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
    SignUpDialogComponent
  ],
  entryComponents: [SignUpDialogComponent],
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
    ReactiveFormsModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
