import { KnockoutMatch } from './../../../../api/src/shared/models/pronostiek/Match';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round-match',
  templateUrl: './round-match.component.html',
  styleUrls: ['./round-match.component.scss']
})
export class RoundMatchComponent implements OnInit {

  @Input()  match: KnockoutMatch;

  constructor() {}

  ngOnInit() {}

}
