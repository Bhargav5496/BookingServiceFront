import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) { }

  getAllAds(): Observable<any> {
    return this.http.get(BASE_URL + `api/client/ads`, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  searchAllAdsByServiceName(name: string): Observable<any> {
    console.log(name);
    return this.http.get(BASE_URL + `api/client/search/${name}`, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.userStorageService.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
    return new HttpHeaders();
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
