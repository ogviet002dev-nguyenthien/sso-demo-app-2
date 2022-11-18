import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreData } from '../model/store_data';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  public storeTokenData(data: StoreData): void {
    this.http
      .post(`${environment.apiUrl}/store`, data)
      .subscribe((result) =>
        console.log('Store token on server successfull:::', result)
      );
  }

  public signOut(data: {
    email: string;
    access_token: string;
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/sign_out`, data);
  }
}
