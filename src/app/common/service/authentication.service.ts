import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminConfiguration, AdminLoginControllerService, UserDetails } from '../client/admin';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {
  public user: Observable<User>;

  private userSubject: BehaviorSubject<User>;

  constructor(
      private router: Router,
      private adminConfiguration: AdminConfiguration,
      private adminLoginService: AdminLoginControllerService,
  ) {
    this.userSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserDetails {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    this.adminConfiguration.credentials['basicAuth'] = window.btoa(`${username}:${password}`);

    return this.adminLoginService.login()
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        catchError(error => {
          return undefined;
          this.adminConfiguration.credentials['basicAuth'] = undefined;
        })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
