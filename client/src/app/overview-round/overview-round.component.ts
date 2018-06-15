import { KnockOutRound } from './../../../../api/src/shared/models/pronostiek/KnockOutRound';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overview-round',
  templateUrl: './overview-round.component.html',
  styleUrls: ['./overview-round.component.scss']
})
export class OverviewRoundComponent implements OnInit {

  @Input() round: KnockOutRound;

  constructor() { }

  ngOnInit() {
  }

}
