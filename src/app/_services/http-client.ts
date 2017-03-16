import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * HTTP Client Service to handle requests. Is a wrapper of Angular's core http
 * native http module
 */
@Injectable()
export class HttpClient {

  private API_URL: string = environment.apiUrl;
  private token: string;
  public headers: Headers = new Headers();
  public params: URLSearchParams = new URLSearchParams();
  public options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: false });

  constructor(private http: Http, private translateService: TranslateService) {
    this.token = localStorage.getItem('auth_token') as string;
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Performs a HTTP GET request to the provided endpoint
   * @param url Endpoint URL whitout base url
   * @param [options] Request options to be included in the request (overrides default options)
   */
  get(url: string, options?: RequestOptions): Observable<any> {
    return this.http.get(`${this.API_URL}/${url}`, this.getHeaders())
      .map(this.handleData)
      .catch(this.handleError);
  }

  /**
   * Performs a HTTP POST request to the provided endpoint
   * @param url Endpoint URL whitout base url
   * @param data Data to be sent in the request body
   * @param [options] Request options to be included in the request (overrides default options)
   */
  post(url: string, body: any, options?: RequestOptions): Observable<any> {
    return this.http.post(`${this.API_URL}/${url}`, body, options || this.getHeaders())
      .map(this.handleData)
      .catch(this.handleError);
  }

  /**
   * Performs a HTTP PUT request to the provided endpoint
   * @param url Endpoint URL whitout base url
   * @param data Data to be sent in the request body
   * @param [options] Request options to be included in the request (overrides default options)
   */
  put(url: string, body: any, options?: RequestOptions): Observable<any> {
    return this.http.put(`${this.API_URL}/${url}`, body, this.getHeaders())
      .map(this.handleData)
      .catch(this.handleError);
  }

  /**
   * Performs a HTTP PATCH request to the provided endpoint
   * @param url Endpoint URL whitout base url
   * @param data Data to be sent in the request body
   * @param [options] Request options to be included in the request (overrides default options)
   */
  patch(url: string, body: any, options?: RequestOptions): Observable<any> {
    return this.http.patch(`${this.API_URL}/${url}`, body, options || this.getHeaders())
      .map(this.handleData)
      .catch(this.handleError);
  }

  /**
   * Performs a HTTP DELETE request to the provided endpoint
   * @param url Endpoint URL whitout base url
   * @param [options] Request options to be included in the request (overrides default options)
   */
  delete(url: string, options?: RequestOptions): Observable<any> {
    return this.http.delete(`${this.API_URL}/${url}`, options || this.getHeaders())
      .map(this.handleData)
      .catch(this.handleError);
  }

  /**
   * Return default headers or provided ones
   * @param options Custom request options object
   */
  public getHeaders(options?: RequestOptions): RequestOptions {
    if (options || options === null) {
      return options;
    }
    const token = this.getToken();
    if (token) {
      return new RequestOptions({
        search: this.params,
        headers: new Headers({'Authorization': token}),
        withCredentials: true
      });
    }
    return this.options;
  }

  /**
   * Default response handler for http requests
   * @param response Server response data
   */
  public handleData(response: Response) {
    const body = response.json();
    return body || {};
  }

  /**
   * Default error handler for http requests
   * @param error Error returned by the server
   */
  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = error.json();
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  /**
   * Returns token to be added in every server request
   */
  private getToken() {
    return localStorage.getItem('auth_token') || null;
  }

}
