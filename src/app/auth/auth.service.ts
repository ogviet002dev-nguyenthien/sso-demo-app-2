import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap, filter } from 'rxjs/operators';
import { AwsCognitoService } from './services/aws-cognito.service';
import { Auth } from '../model/auth';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${environment.apiUrl}/auth`;

  constructor(
    private awsService: AwsCognitoService,
    private http: HttpClient
  ) {}
  isLoggedInOnServer(): Observable<boolean> {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      return this.http.post<Auth>(this.url, { access_token }).pipe(
        tap((data) => console.log('status of user logged on server:::', data)),
        map((result) => result.login),
        catchError((error) => {
          console.log('error of user logged on server:::', error.message);
          return of(false);
        })
      );
    } else {
      return this.awsService.accessToken$.pipe(
        switchMap((data) => {
          const tokenObj = {
            access_token: data,
          };
          return this.http.post<Auth>(this.url, tokenObj).pipe(
            tap((data) =>
              console.log('status of user logged on server:::', data)
            ),
            map((result) => result.login),
            catchError((error) => {
              console.log('error of user logged on server:::', error.message);
              return of(false);
            })
          );
        })
      );
    }
  }
  // isLoggedInOnServer(): Observable<boolean> {
  //   return this.awsService.accessToken$.pipe(
  //     switchMap((data) => {
  //       const tokenObj = {
  //         access_token: data,
  //       };

  //       return this.http.post<Auth>(this.url, tokenObj).pipe(
  //         tap((data) =>
  //           console.log('status of user logged on server:::', data)
  //         ),
  //         map((result) => result.login),
  //         catchError((error) => {
  //           console.log('error of user logged on server:::', error.message);
  //           return of(false);
  //         })
  //       );
  //     })
  //   );
  // }

  // isLoggedInOnCognito(): Observable<boolean> {
  //   var isAuth = false;

  //   let poolData = {
  //     UserPoolId: environment.cognitoUserPoolId,
  //     ClientId: environment.cognitoAppClientId,
  //   };

  //   var userPool = new CognitoUserPool(poolData);
  //   var cognitoUser = userPool.getCurrentUser();

  //   console.log('userPool', userPool);
  //   console.log('cognitoUser', cognitoUser);

  //   if (cognitoUser != null) {
  //     cognitoUser.getSession((err: any, session: any) => {
  //       if (err) {
  //         alert(err.message || JSON.stringify(err));
  //       }
  //       console.log('session', session.isValid());
  //       isAuth = session.isValid();
  //     });
  //   }
  //   return of(isAuth);
  // }
}
