import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../../api/src/shared/models/pronostiek/Match";

@Component({
  selector: 'app-group-match',
  templateUrl: './group-match.component.html',
  styleUrls: ['./group-match.component.scss']
})
export class GroupMatchComponent implements OnInit {

  @Input() groupMatch : Match;

  constructor() { }

  ngOnInit() {
  }

  outTeamScoreChanged(event :any) {
    if(event.srcElement && event.srcElement.value){
      this.groupMatch.outTeamScore = Number(event.srcElement.value);
    } else {
      this.groupMatch.outTeamScore = undefined;
    }
  }

  homeTeamScoreChanged(event :any) {
    if(event.srcElement && event.srcElement.value){
      this.groupMatch.homeTeamScore = Number(event.srcElement.value);
    } else {
      this.groupMatch.homeTeamScore = undefined;
    }
  }

}
