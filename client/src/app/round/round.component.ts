import { KnockOutRound } from './../../../../api/src/shared/models/pronostiek/KnockOutRound';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() round: KnockOutRound;

  constructor() { }

  ngOnInit() {
  }

}
