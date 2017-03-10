import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private email;
  private password;

  private loading = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

}
