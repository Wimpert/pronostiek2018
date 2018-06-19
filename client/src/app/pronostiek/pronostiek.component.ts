import { TOURNAMENT_START_DATE } from './../../../../api/src/shared/utils/tournament.start.date';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";
import {Pronostiek} from "../../../../api/src/shared/models/pronostiek/Pronostiek";
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";
import {merge, switchMap, tap, share, map} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import { addToNextRound, addToNextKnockoutRound } from '../../../../api/src/shared/utils/TournamentUtils';

@Component({
  selector: 'app-pronostiek',
  templateUrl: './pronostiek.component.html',
  styleUrls: ['./pronostiek.component.scss']
})
export class PronostiekComponent implements OnInit{

  @Input() refPronostiek = false;

  pronostiek$ : Observable<Pronostiek>;
  pronostiekToSave: Pronostiek;
  pronostiekSaved$: Observable<Pronostiek>;
  savePronostiekEvent$: Subject<string> = new Subject();
  userChangedPronostiek$: Subject<void>;
  showSave: boolean = false;


  constructor(private _userService : UserService) {
    this.userChangedPronostiek$ = new Subject<void>();
  }
  

  ngOnInit() {

    this.showSave = new Date() < TOURNAMENT_START_DATE;
   
    if(this.refPronostiek){
      
      this.pronostiekSaved$ = this.savePronostiekEvent$.pipe(
        switchMap(_ => this._userService.saveRefPronostiek(this.pronostiekToSave.tournament)),
        switchMap(_ => this._userService.getRefProno()),
        map(refProno => {
          let prono  = new Pronostiek(undefined);
          prono.tournament = refProno;
          return prono;
        })
      );

      this.pronostiek$ = this._userService.getRefProno().pipe(
        map(refProno => {
          let prono  = new Pronostiek(undefined);
          prono.tournament = refProno;
          return prono;
        }),
        merge(this.pronostiekSaved$),
        tap(value => this.pronostiekToSave = value),
        share()
      );

      
      
    } else {

      this.pronostiekSaved$ = this.savePronostiekEvent$.pipe(
        switchMap(_ => this._userService.savePronostiek(this.pronostiekToSave))
      )

    this.pronostiek$ = this._userService.getPronostiek().pipe(
      merge(this.pronostiekSaved$),
      tap(value => this.pronostiekToSave = value),
      share()
    )
    }
    
   
  }

  savePronosiek() {
      this.savePronostiekEvent$.next("save");
  }

  groupsChanged(groups : Group[]) {
    this.pronostiekToSave.tournament.groups = groups;
    addToNextRound(this.pronostiekToSave.tournament);
    this.userChangedPronostiek$.next();
    // this.savePronostiekEvent$.next();
  }

  roundsChanged(event : {winner: string, matchIndex: number, roundIndex: number}) : void{
    addToNextKnockoutRound(this.pronostiekToSave.tournament, event.roundIndex, event.matchIndex , event.winner);
    this.userChangedPronostiek$.next();
    // this.savePronostiekEvent$.next();
  }

}
