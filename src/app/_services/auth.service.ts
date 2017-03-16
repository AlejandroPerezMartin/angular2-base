import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient } from './http-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private loggedIn = false;
  private user: any;

  public headers: Headers = new Headers();
  public params: URLSearchParams = new URLSearchParams();
  public options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http, private httpClient: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  /**
   * Logs a user in to the system
   * @param {Object} data - Object containing user data
   * @param {string} data.email - User email
   * @param {string} data.password - User password
   */
  login(data: any): Observable<any> {
    const observer = new Observable(obs => {
      this.httpClient.post('login/do', data)
        .subscribe(res => {
          const response = res.json();
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('profile', JSON.stringify(response.user));

          this.user = response.user;
          this.loggedIn = true;
          obs.next(response.user);
        }, err => {
          console.log('error on login');
        });
    });
    return observer;
  }

  /**
   * Fetch user's Google profile information
   * @param token Google OAuth2 token
   */
  getGoogleUserInfo(token: string): Observable<any> {
    return this.http.get(`${environment.googleAuth.userInfoUrl}?alt=json&access_token=${token}`)
    .map(this.httpClient.handleData)
    .catch(this.httpClient.handleError);
  }

  /**
   * Logs a user out of the system
   */
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  /**
   * Returns whether user is logged in or not
   */
  isUserLoggedIn() {
    return !!localStorage.getItem('auth_token');
  }

}
