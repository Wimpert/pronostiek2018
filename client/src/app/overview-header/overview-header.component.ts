import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overview-header',
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss']
})
export class OverviewHeaderComponent implements OnInit {

  @Input() data : string[];

  constructor() { }

  ngOnInit() {
    // this.data.forEach(_ => console.log(_));
  }

}
