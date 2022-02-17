import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminConfiguration, AdminUserControllerService, ChangePasswordDto, UserDetails } from '../client/admin';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {
  public user: Observable<User>;

  private userSubject: BehaviorSubject<User>;

  constructor(
      private router: Router,
      private adminConfiguration: AdminConfiguration,
      private adminUserService: AdminUserControllerService,
  ) {
    this.userSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserDetails {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    this.adminConfiguration.credentials.basicAuth = window.btoa(`${username}:${password}`);

    return this.adminUserService.login()
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        catchError(_ => {
          this.adminConfiguration.credentials.basicAuth = undefined;
          return undefined;
        })
    );
  }

  changePassword(changePassword: ChangePasswordDto) {
    return this.adminUserService.changePassword(changePassword).pipe(
      map(_ => {
        return this.login(this.userValue.username, changePassword.newPassword);
      }),
      catchError(_ => {
        return undefined;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.adminConfiguration.credentials.basicAuth = undefined;
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
