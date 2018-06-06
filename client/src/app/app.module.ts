import { CodesService } from './services/codes.service';
import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule,
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
import { RoundsComponent } from './rounds/rounds.component';
import { RoundComponent } from './round/round.component';
import { RoundMatchComponent } from './round-match/round-match.component';
import { CodesComponent } from './codes/codes.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [

  { path: 'pronostiek', component: PronostiekComponent },
  { path: 'signup', component: ProfileComponent },
  { path: 'codes', component: CodesComponent },
  { path: 'users', component: UsersComponent },
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
    GroupMatchComponent,
    RoundsComponent,
    RoundComponent,
    RoundMatchComponent,
    CodesComponent,
    UsersComponent
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
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [UserService, CodesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
