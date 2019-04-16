import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { JsonWebToken } from '../models/jwt.model';
import * as jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  titleDashboard: BehaviorSubject<string> = new BehaviorSubject('');
  userRole: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.getUserRole();
  }

  changeTitleDashboard(title: string) {
    this.titleDashboard.next(title);
  }

  public get loggedIn(): boolean {
    let exp: number;
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      exp = decodedToken.exp;
    }
    return (sessionStorage.getItem(environment.accessToken) !== null) && (+new Date().getTime().toString().slice(0, 10) < exp);
  }

  signIn(user: User) {
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'user/sign-in', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);
        this.getUserRole();
        this.router.navigate(['']);
      },
      error => {
        // pop-up echec
        this.snackBar.open('Erreur de login', 'ECHEC', {
          duration: environment.durationSnackBar
        });
      });
  }

  signOut() {
    if (sessionStorage.getItem(environment.accessToken)) {
      sessionStorage.removeItem(environment.accessToken);
    }
    this.router.navigate(['/login']);
    this.userRole.next('');
    this.titleDashboard.next('');
  }

  private getUserRole() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      const authority: string = decodedToken.auth;
      this.userRole.next(authority);
      console.log(decodedToken);
    }
  }
}
