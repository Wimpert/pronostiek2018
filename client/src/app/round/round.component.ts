import { KnockOutRound } from './../../../../api/src/shared/models/pronostiek/KnockOutRound';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() round: KnockOutRound;
  @Output() matchInRoundChanged: EventEmitter<{winner: string, matchIndex: number}> =  new EventEmitter();

  constructor() { }

  ngOnInit() {}

  winningTeamChanged(winningTeam: string, matchIndex: number){
    this.matchInRoundChanged.next({winner: winningTeam, matchIndex: matchIndex});
  }

}
