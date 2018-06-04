import { CodesService } from './../services/codes.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {

  codes$ : Observable<any>

  constructor(private codeService: CodesService) { }

  ngOnInit() {
    this.codes$ = this.codeService.getAllCodes()
  }

}
