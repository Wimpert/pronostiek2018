import { ScoreViewModel } from './../../../../api/src/shared/models/score.model';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  scores$: Observable<ScoreViewModel[]>;

  constructor(private userService: UserService) {

   }

  ngOnInit() {
    this.scores$ =  this.userService.getScores();
  }

}
