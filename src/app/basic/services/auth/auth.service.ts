import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASE_URL = 'http://localhost:8080/';
const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userStorageService: UserStorageService) { }

  registerClient(signupRequestDto: any): Observable<any> {
    return this.http.post(BASE_URL + "client/sign-up", signupRequestDto)
      .pipe(
        catchError(this.handleError)
      );
  }

  registerCompany(signupRequestDto: any): Observable<any> {
    return this.http.post(BASE_URL + "company/sign-up", signupRequestDto)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(BASE_URL + "authenticate", { username, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          this.userStorageService.saveUser(res.body);
          const token = res.headers.get(AUTH_HEADER);
          if (token) {
            const bearerToken = token.startsWith('Bearer ') ? token.substring(7) : token;
            this.userStorageService.saveToken(bearerToken);
          }
          return res;
        }),
        catchError(this.handleError)
      );
  }

  

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
