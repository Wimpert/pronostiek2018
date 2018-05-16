import { KnockoutMatch } from './../../../../api/src/shared/models/pronostiek/Match';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-round-match',
  templateUrl: './round-match.component.html',
  styleUrls: ['./round-match.component.scss']
})
export class RoundMatchComponent implements OnInit {

  @Input()  match: KnockoutMatch;
  @Output() winningTeam: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  homeTeamWinsChanged(event) : void {
    if(event.checked){
      this.match.outTeamWins = false;
      this.winningTeam.next(this.match.homeTeamName);
    } else {
      this.winningTeam.next(undefined);
    }
  }

  outTeamWinsChanged(event) : void {
    if(event.checked){
      this.match.homeTeamWins = false;
      this.winningTeam.next(this.match.outTeamName);
    } else {
      this.winningTeam.next(undefined);
    }
  }



}
