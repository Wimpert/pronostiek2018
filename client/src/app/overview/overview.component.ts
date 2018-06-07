import { PronostiekViewModel } from './../../../../api/src/shared/models/pronostiek.view.model';
import { UserService } from './../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  data$: Observable<PronostiekViewModel[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.data$ = this.userService.geAllPronostiek();
  }

}
