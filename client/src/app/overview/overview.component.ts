import { map } from 'rxjs/operators';
import { Match } from './../../../../api/src/shared/models/pronostiek/Match';
import { filter } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
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
  headerData$: Observable<string[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
    this.data$ = this.userService.geAllPronostiek()

    this.headerData$ = this.data$.pipe(
      map( data => {
        let returnVal = []
        data[0].matches.forEach((match: Match) => {
          let string = match.homeTeamName + ' - ' + match.outTeamName;
          returnVal.push(string);
        });
        data[0].knockoutRounds.forEach(round => returnVal.push(round.name));
        return returnVal
      }),
      tap(_ => console.log(_))
    );

  }

}
