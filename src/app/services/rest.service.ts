import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private baseUrl: string;
  private corsHeaders: HttpHeaders;

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();


  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.baseUrl = environment.baseUrl;
    this.corsHeaders = new HttpHeaders({
      'Access-Control-Allow-Request-Method': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json',
      'Allow': 'GET, POST, PUT, DELETE, OPTIONS',
    });
  }

  get<T>(url: string, params: any = {}, token: boolean = true, showError: boolean = true): Observable<T> {
    this.loadingSubject.next(true);
    let headers = this.corsHeaders;
    if (token) {
      headers = headers.append('Authorization', '');
    }
    const paramValues = Object.values(params);
    const urlWithParams = this.isSingleParamObject(params) ?
      this.baseUrl + url + '/' + this.encodeParamValue(paramValues[0]) :
      this.appendParamsToUrl(this.baseUrl + url, paramValues);
    return this.http.get<T>(urlWithParams, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(showError){
            this.errorHandler(error);
          }
          return of(null);
        }),
        tap((result: T) => {
          this.loadingSubject.next(false);
          return of(result);
        }),
      );
  }

  post<T>(url: string, data: any, token: boolean = true, showError: boolean = true): Observable<T> {
    this.loadingSubject.next(true);
    let headers = this.corsHeaders;
    if (token) {
      headers = headers.append('Authorization', '');
    }
    return this.http.post<T>(this.baseUrl + url, data, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(showError){
            this.errorHandler(error);
          }
          return of(null);
        }),
        tap((result: T) => {
          this.loadingSubject.next(false);
          return of(result);
        }),
      );
  }

  put<T>(url: string, data: any, token: boolean = true, showError: boolean = true): Observable<T> {
    this.loadingSubject.next(true);
    let headers = this.corsHeaders;
    if (token) {
      headers = headers.append('Authorization', '');
    }
    return this.http.put<T>(this.baseUrl + url, data, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(showError){
            this.errorHandler(error);
          }
          return of(null);
        }),
        tap((result: T) => {
          this.loadingSubject.next(false);
          return of(result);
        }),
      );
  }

  delete<T>(url: string, params: any = null, token: boolean = true, showError: boolean = true): Observable<T> {
    this.loadingSubject.next(true);
    let headers = this.corsHeaders;
    if (token) {
      headers = headers.append('Authorization', '');
    }
    const paramValues = Object.values(params);
    const urlWithParams = this.baseUrl + url + '/' + this.encodeParamValue(paramValues[0])
    return this.http.delete<T>(urlWithParams, { headers: headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (showError) {
            this.errorHandler(error);
          }
          return of(null);
        }),
        tap((result: T) => {
          this.loadingSubject.next(false);
          return of(result);
        }),
      );
  }

  private errorHandler(error: any): void {
    this.loadingSubject.next(false);
    let message: string;
    switch (error.status) {
      case 0:
        message = 'Se ha presentado una excepción no controlada, por favor contacte a soporte técnico.';
        break;
      case 204:
        message = `No se encontraron datos.`;
        break;
      case 400:
        const errorMessages = Object.entries(error.error.errors)
          .map(([field, messages]: [string, string[]]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        message = `${error.error.title}\nErrors:\n${errorMessages}`;
        break;
      case 401:
        message = `El recurso solicitado requiere iniciar sesion.`;
        break;
      case 403:
        message = `No tiene permisos para acceder a este recurso.`;
        break;
      case 404:
        message = error.error.detail;
        break;
      case 500:
        message = error.error.title;
        break;
      default:
        message = 'Se ha presentado una excepción no controlada, por favor contacte a soporte técnico.';
        break;
    }

    this.notificationService.Error(message);
  }
  
  private isSingleParamObject(obj: any): boolean {
    return Object.keys(obj).length === 1;
  }

  private appendParamsToUrl(url: string, params: any[]): string {
    const segments = params.map(param => this.encodeParamValue(param)).join('/');
    return url + '/' + segments;
  }

  private encodeParamValue(param: any): string {
    return encodeURIComponent(param);
  }

}