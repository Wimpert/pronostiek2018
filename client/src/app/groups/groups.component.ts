import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../../../api/src/shared/models/pronostiek/Group";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Input() groups : Group[];

  constructor() { }

  ngOnInit() {
  }

}
