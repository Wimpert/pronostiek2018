import { KnockoutMatch } from './../../../../api/src/shared/models/pronostiek/Match';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { getCountryCode } from '../../../../api/src/shared/utils/country.codes';

@Component({
  selector: 'app-round-match',
  templateUrl: './round-match.component.html',
  styleUrls: ['./round-match.component.scss']
})
export class RoundMatchComponent implements DoCheck {

  @Input()  match: KnockoutMatch;
  @Output() winningTeam: EventEmitter<string> = new EventEmitter();

  outTeamFlagFileName: string;
  homeTeamFlagFileName: string;

  constructor() {}

  ngDoCheck() {

    console.log(this.match);
    
    if(this.match.homeTeamName){
      this.homeTeamFlagFileName = getCountryCode(this.match.homeTeamName)+'.png';
    }
    if(this.match.outTeamName){
      this.outTeamFlagFileName = getCountryCode(this.match.outTeamName)+'.png';
     }
    }
    

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
