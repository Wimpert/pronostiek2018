import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  sideBarOpen$ : Observable<boolean>

  constructor() { }

  ngOnInit() {

    //this.
  }

}
