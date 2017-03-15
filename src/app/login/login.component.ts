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

  private googleLoginUrl: string = encodeURI(`${this.googleAuth.url}?scope=${this.googleAuth.scope}&redirect_uri=${this.googleAuth.callbackUrl}&response_type=token&client_id=${this.googleAuth.clientId}`)

  private loading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  onSubmit() {
    this.loading = true;

    this.authService.adminLogin(this.formData)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      }, err => this.loading = false);
  }

}
