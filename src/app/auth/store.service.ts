import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreData } from '../model/store_data';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private emailSubject = new BehaviorSubject('');
  public email$ = this.emailSubject.asObservable();

  private accessTokenSubject = new BehaviorSubject('');
  public accessToken$ = this.accessTokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  set storeEmail(email: string) {
    console.log('email was setted::', email);

    this.emailSubject.next(email);
  }
  set storeAccessToken(token: string) {
    console.log('token was setted', token);

    this.accessTokenSubject.next(token);
  }

  public storeTokenData(data: StoreData): void {
    this.http
      .post(`${environment.apiUrl}/store`, data)
      .subscribe((result) => console.log('store token successfull:::', result));
  }

  public deleteStoreToken(data: { email: string; access_token: string }) {
    this.http
      .post(`${environment.apiUrl}/sign_out`, data)
      .subscribe((result) =>
        console.log('delete store token successfull:::', result)
      );
  }
}
