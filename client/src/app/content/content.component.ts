import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  sideNavOpen : boolean;

  constructor() { }

  ngOnInit() {

    this.sideNavOpen = false;
  }

  sideNavToggled(){
    console.log("here");
    this.sideNavOpen = !this.sideNavOpen;
  }

}
