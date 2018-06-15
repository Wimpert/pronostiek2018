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

  isComplete = true;

  constructor() { }

  ngOnInit() {
    this.pronostiek.matches.forEach((match) => {
      if(match.homeTeamScore == undefined || match.outTeamScore == undefined) {
        this.isComplete = false;
      }
    });
    if(this.isComplete){
      this.pronostiek.knockoutRounds.forEach((round) => {
        round.matches.forEach((match) => {
        if(!match.homeTeamWins && !match.outTeamWins) {
          this.isComplete = false;
        }
      })
      });
      
    }
  }

  isKnockoutMatch(match: any): boolean{
    console.log(match);
    return false;
  }

 

}
