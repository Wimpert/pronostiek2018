import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatToolbar,
  MatToolbarModule
} from '@angular/material';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProfileComponent } from './profile/profile.component';
import { PronostiekComponent } from './pronostiek/pronostiek.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignUpDialogComponent} from "./signup/signup.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent } from './login/login.component';
import {UserService} from "./services/user.service";
import { ContentComponent } from './content/content.component';
import {Interceptor} from "./services/http.interceptor";
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { GroupMatchComponent } from './group-match/group-match.component';

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
    SignUpDialogComponent,
    LoginComponent,
    ContentComponent,
    GroupsComponent,
    GroupComponent,
    GroupMatchComponent
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
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
