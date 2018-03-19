import {Component, OnInit, Output} from '@angular/core';
import {UserService} from "../services/user.service";
import {Subject} from "rxjs/Subject";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() private toggleSideNav: Subject<string> = new Subject<string>();

  constructor(private userService :  UserService) {}

  ngOnInit() {
  }

  logout(){
    this.userService.logout();
  }

  toggleSideNavPressed(){
    this.toggleSideNav.next("toggle");
  }
}
