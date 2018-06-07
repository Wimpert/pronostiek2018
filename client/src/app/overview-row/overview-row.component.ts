import { KnockoutMatch } from './../../../../api/src/shared/models/pronostiek/Match';
import { PronostiekViewModel } from './../../../../api/src/shared/models/pronostiek.view.model';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overview-row',
  templateUrl: './overview-row.component.html',
  styleUrls: ['./overview-row.component.scss']
})
export class OverviewRowComponent implements OnInit {

  @Input() pronostiek: PronostiekViewModel

  constructor() { }

  ngOnInit() {
  }

  isKnockoutMatch(match: any): boolean{
    console.log(match);
    return false;
  }

  getWinningTeam(match: KnockoutMatch): string{
    if(match.homeTeamWins){
      return match.homeTeamName;
    } else if(match.outTeamWins){
      return match.outTeamName;
    }
    return "x";
  }

}
