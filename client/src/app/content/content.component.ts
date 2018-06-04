import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  sideNavOpen : boolean;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.sideNavOpen = false;
  }

  sideNavToggled(){
    this.sideNavOpen = !this.sideNavOpen;
  }

}
