import { KnockOutRound } from './../../../../api/src/shared/models/pronostiek/KnockOutRound';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})
export class RoundsComponent implements OnInit {

  @Input() rounds: KnockOutRound[];

  constructor() { }

  ngOnInit() {
  }

}
