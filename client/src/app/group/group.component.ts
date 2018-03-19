import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent  {


  @Input() group : Group;

  constructor() { }


}
