import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminConfiguration, AdminUserControllerService, ChangePasswordDto, UserDetails } from '../client/admin';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;

  constructor(
      private router: Router,
      private adminConfiguration: AdminConfiguration,
      private adminUserService: AdminUserControllerService,
  ) {
    const user = JSON.parse(localStorage.getItem('user'));

    this.userSubject = new BehaviorSubject<User>(user);

    this.userSubject.subscribe(userValue => {
      if (userValue) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }

      this.adminConfiguration.credentials.basicAuth = userValue?.authdata;
    });
  }

  public get user(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const authdata = window.btoa(`${username}:${password}`);

    this.adminConfiguration.credentials.basicAuth = authdata;
    return this.adminUserService.login()
      .pipe(
        map(userDetails => {
          this.userSubject.next({...userDetails, ...{ authdata }});
          return this.userSubject.value;
        }),
        catchError(_ => {
          this.clearUserData();
          return undefined;
        })
    );
  }

  changePassword(changePassword: ChangePasswordDto) {
    return this.adminUserService.changePassword(changePassword).pipe(
      map(_ => {
        return this.login(this.user.username, changePassword.newPassword);
      }),
      catchError(_ => {
        return undefined;
      })
    );
  }

  logout() {
    this.clearUserData();
    this.router.navigate(['/']);
  }

  private clearUserData() {
    this.userSubject.next(null);
  }
}
