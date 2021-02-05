import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable()
export class AuthenticationService {
  public user: Observable<User>;
  
  private userSubject: BehaviorSubject<User>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const authdata = window.btoa(`${username}:${password}`);

    return this.http.get<any>(`${environment.apiUrl}/admin/login`, {
      headers: {
        "Authorization": `Basic ${authdata}`
      }
    }).pipe(map(user => {
      user.authdata = authdata;
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
  
}
