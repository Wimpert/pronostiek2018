import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Pronostiek';


  constructor(private authService : AuthService){}

  fakeLogin() {
    this.authService.toggleLogin();
  }


}
