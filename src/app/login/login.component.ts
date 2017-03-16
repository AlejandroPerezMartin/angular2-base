import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private formData: any = {};
  private googleAuth = environment.googleAuth;
  private googleLoginUrl = encodeURI(`${this.googleAuth.url}?scope=${this.googleAuth.scope}&redirect_uri=${this.googleAuth.callbackUrl}&response_type=token&client_id=${this.googleAuth.clientId}`);
  private loading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const googleAuthToken = this.decodeGoogleAuthResponse().access_token || null;
    if (googleAuthToken) {
      this.authService.getGoogleUserInfo(googleAuthToken).subscribe(res => console.log(res));
    }
  }

  /**
   * Parse the query string to extract access token and other parameters
   * https://developers.google.com/identity/protocols/OAuth2UserAgent
   */
  private decodeGoogleAuthResponse(): any {
    const queryString = location.hash.substring(1);
    const params = {};
    let regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  }

  /**
   * Event triggered on login
   */
  onSubmit() {
    this.loading = true;

    this.authService.login(this.formData)
      .subscribe(
      res => {
        this.router.navigate(['/dashboard']);
      }, err => this.loading = false);
  }

}
