/**
 * HTTP Client Service to handle requests. Is a wrapper of Angular's core http
 * native http module
 */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
@Injectable()
export class HttpClient {

  private API_URL: string = environment.apiUrl;
  public headers: Headers = new Headers();
  public params: URLSearchParams = new URLSearchParams();
  public options: RequestOptions = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http, private translateService: TranslateService) { }

  /**
   * Performs a HTTP GET request to the provided endpoint
   * @param url Endpoint URL whitout base url
   * @param [options] Request options to be included in the request (overrides default options)
   */
  get(url: string, options?: RequestOptions): Observable<any> {
    return this.http.get(`${this.API_URL}/${url}`, this.getHeaders(options))
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
    return this.http.put(`${this.API_URL}/${url}`, body, options || this.getHeaders())
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
   *
   * @param options
   */
  public getHeaders(options?: RequestOptions): RequestOptions {
    if (options || options === null) {
      return options;
    }
    return new RequestOptions({
      search: this.params,
      headers: new Headers({}),
      withCredentials: true
    });
  }

  /**
   * Default response handler for http requests
   * @param response Server response data
   */
  private handleData(response: Response) {
    const body = response.json();
    return body.data || {};
  }

  /**
   * Default error handler for http requests
   * @param error Error returned by the server
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
