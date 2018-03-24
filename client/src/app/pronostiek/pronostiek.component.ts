import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";
import {Pronostiek} from "../../../../api/src/shared/models/pronostiek/Pronostiek";
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";
import {merge, switchMap, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-pronostiek',
  templateUrl: './pronostiek.component.html',
  styleUrls: ['./pronostiek.component.scss']
})
export class PronostiekComponent implements OnInit {

  pronostiek$ : Observable<Pronostiek>;
  pronostiekToSave: Pronostiek;
  pronostiekSaved$: Observable<Pronostiek>;
  savePronostiekEvent$: Subject<string> = new Subject();


  constructor(private _userService : UserService) {}

  ngOnInit() {

    this.pronostiekSaved$ = this.savePronostiekEvent$.pipe(
      switchMap(_ => this._userService.savePronostiek(this.pronostiekToSave))
    )

    this.pronostiek$ = this._userService.getPronostiek().pipe(
      tap(value => this.pronostiekToSave = value),
      merge(this.pronostiekSaved$)
    )
  }

  savePronosiek() {
      this.savePronostiekEvent$.next("save");
  }

  groupsChanged(groups : Group[]) {
    console.log(groups);
    this.pronostiekToSave.tournament.groups = groups;
  }

  roundsChanged(rounds) : void{
    console.log(rounds);
  }

}
