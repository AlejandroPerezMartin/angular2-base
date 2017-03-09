import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  constructor(private http: Http) { }

}
