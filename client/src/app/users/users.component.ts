import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../api/src/shared/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
  }

}
