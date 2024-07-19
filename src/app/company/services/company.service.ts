import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private userStorageService: UserStorageService) { }

  postAd(adDto: any): Observable<any> {
    const userId = this.userStorageService.getUserId();
    return this.http.post(BASE_URL + `api/company/ad/${userId}`, adDto, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  updateAd(adId:any, adDto: any): Observable<any> {
    return this.http.put(BASE_URL + `api/company/ad/${adId}`, adDto, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteAd(adId:any): Observable<any> {
    return this.http.delete(BASE_URL + `api/company/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllAdsByUserId(): Observable<any> {
    const userId = this.userStorageService.getUserId();
    return this.http.get(BASE_URL + `api/company/ads/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  getAdById(adId: any): Observable<any> {
    return this.http.get(BASE_URL + `api/company/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllAdBookings(): Observable<any> {
    const companyId = this.userStorageService.getUserId();
    return this.http.get(BASE_URL + `api/company/bookings/${companyId}`, {
      headers: this.createAuthorizationHeader()
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + `api/company/booking/${bookingId}/${status}`, {
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
