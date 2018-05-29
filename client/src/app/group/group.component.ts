import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";
import {orderTeams} from "../../../../api/src/shared/utils/TournamentUtils";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit{

  @Input() group : Group;
  @Output() groupChanged: EventEmitter<Group> = new EventEmitter<Group>();

  constructor() {}

  ngOnInit(): void {
    this.group = new Group().deserialize(this.group);
  }

  matchChanged() : void{
    this.group.processMatches();
    orderTeams(this.group);
    console.log(this.group.groupNeedsDraw);
     
    this.groupChanged.emit(this.group);
  }





}
