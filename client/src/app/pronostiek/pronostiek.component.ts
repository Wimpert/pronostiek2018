import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-pronostiek',
  templateUrl: './pronostiek.component.html',
  styleUrls: ['./pronostiek.component.scss']
})
export class PronostiekComponent implements OnInit {

  pronostiek$ : Observable<any>;

  constructor(private _userService : UserService) { }

  ngOnInit() {
    this.pronostiek$ = this._userService.getPronostiek();
  }

}
