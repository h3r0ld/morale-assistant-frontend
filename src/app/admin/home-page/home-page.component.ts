import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/common/model/user';
import { AuthenticationService } from 'src/app/common/service/authentication.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.user;
  }

  changePassword() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '25em'
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
