import {
  HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams,
  HttpResponse
} from "@angular/common/http";
import {TeardownLogic, throwError} from 'rxjs';
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {}

  private handleError(error: HttpErrorResponse) {
    let error_description = '';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      error_description = 'Internet is not connected';
    } else {
      error_description = error.error.error_msg;
    }
    return throwError(error_description); 
  }

  getRequest(url: string,
             customHeaders?: HttpHeaders,
             customParams?: HttpParams,
             respType?: 'json'): Observable<HttpResponse<any>> {
      return this.http.get(url, {
        headers: customHeaders,
        params: customParams,
        responseType: respType,
        observe: 'response'
      }).pipe(
        catchError((error) => this.handleError(error))
      );
  }

  postRequest(url: string,
               data: any,
               customHeaders?: HttpHeaders,
               customParams?: HttpParams,
               respType?: 'json'): Observable<HttpResponse<any>> {
    return this.http.post(url, data, {
      headers: customHeaders,
      params: customParams,
      responseType: respType,
      observe: 'response'
    }).pipe(
        catchError((error) => this.handleError(error))
    );
  }

  putRequest(url: string,
              data: any,
              customHeaders?: HttpHeaders,
              customParams?: HttpParams,
              respType?: 'json'): Observable<HttpResponse<any>> {
    return this.http.put(url, data, {
      headers: customHeaders,
      params: customParams,
      responseType: respType,
      observe: 'response'
    }).pipe(
        catchError((error) => this.handleError(error))
    );
  }

  deleteRequest(url: string,
             customHeaders?: HttpHeaders,
             customParams?: HttpParams,
             respType?: 'json'): Observable<HttpResponse<any>> {
    return this.http.delete(url, {
      headers: customHeaders,
      params: customParams,
      responseType: respType,
      observe: 'response'
    }).pipe(
        catchError((error) => this.handleError(error))
    );
  }

}
