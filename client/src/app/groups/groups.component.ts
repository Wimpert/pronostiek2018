import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";
import {replaceBasedOnName, addToNextRound} from "../../../../api/src/shared/utils/TournamentUtils";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit , OnChanges {


  @Input() groups : Group[];
  @Output() groupsChanged: EventEmitter<any> = new EventEmitter<any>();
  private panelsOpen: boolean[] = [];


  constructor() {
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.groups.currentValue && this.panelsOpen.length == 0){
      this.groups.forEach((group, index) => {
        addToNextRound(undefined, index);
        this.panelsOpen[index] = false;
      })
    }
  }

  panelIsOpen(index) : boolean {
    if(!this.panelsOpen || this.panelsOpen.length < index){
      return false;
    }
    return this.panelsOpen[index];
  }

  groupChanged(group : Group){
    replaceBasedOnName(group,this.groups)
    this.groupsChanged.emit(this.groups);
  }

  closedPanel(index) {
    this.panelsOpen[index] = false;
  }

  openedPanel(index) {
    this.panelsOpen[index] = true;
  }





}
