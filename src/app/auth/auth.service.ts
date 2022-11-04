import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, filter } from 'rxjs/operators';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${environment.apiUrl}/auth`;

  constructor(private storeService: StoreService, private http: HttpClient) {}

  isLoggedInOnServer(): Observable<boolean> {
    return this.storeService.email$.pipe(
      // filter((email) => email !== ''),
      switchMap((data) => {
        return this.http
          .post<{ success: boolean; login: boolean }>(this.url, {
            email: data,
          })
          .pipe(
            map((result) => result.login),
            tap((data) =>
              console.log('status of user logged on server:::', data)
            ),
            catchError((error) => {
              console.log('error of user logged on server:::', error.message);
              return of(false);
            })
          );
      })
    );
  }

  isLoggedInOnCognito(): Observable<boolean> {
    var isAuth = false;

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId,
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    console.log('userPool', userPool);
    console.log('cognitoUser', cognitoUser);

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        console.log('session', session.isValid());
        isAuth = session.isValid();
      });
    }
    return of(isAuth);
  }
}
