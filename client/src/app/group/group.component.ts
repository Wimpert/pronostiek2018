import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";
import {orderTeams} from "../../../../api/src/shared/utils/TournamentUtils";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit{



  @Input() group : Group;

  constructor() {}

  ngOnInit(): void {
    console.log(this.group);

    this.group = new Group().deserialize(this.group);
  }

  matchChanged() : void{
    this.group.processMatches();
    orderTeams(this.group);
  }



}
