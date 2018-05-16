import { KnockOutRound } from './../../../../api/src/shared/models/pronostiek/KnockOutRound';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})
export class RoundsComponent {

  @Input() rounds: KnockOutRound[];
  @Output() roundChanged: EventEmitter<{winningTeam:string, matchIndex: number, roundIndex: number}> = new EventEmitter();

  constructor() { }

  matchInRoundChanged(event: {winningTeam:string, matchIndex: number}, roundIndex: number){
    const toEmit = {...event, roundIndex: roundIndex}
    this.roundChanged.next(toEmit);
  }

}
