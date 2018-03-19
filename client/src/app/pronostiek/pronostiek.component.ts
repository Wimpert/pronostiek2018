import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";
import {Pronostiek} from "../../../../api/src/shared/models/pronostiek/Pronostiek";

@Component({
  selector: 'app-pronostiek',
  templateUrl: './pronostiek.component.html',
  styleUrls: ['./pronostiek.component.scss']
})
export class PronostiekComponent implements OnInit {

  pronostiek$ : Observable<Pronostiek>;

  constructor(private _userService : UserService) {}

  ngOnInit() {
    this.pronostiek$ = this._userService.getPronostiek();
  }

}
