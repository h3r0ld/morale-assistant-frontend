import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/model/user';
import { AuthenticationService } from 'src/app/common/service/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.userValue;
  }

  logout() {
    this.authenticationService.logout();
  }
}
