import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AwsCognitoService {
  constructor(private http: HttpClient) {}

  private accessTokenSubject = new BehaviorSubject<string>('');
  public accessToken$ = this.accessTokenSubject.asObservable();

  private emailSubject = new BehaviorSubject<string>('');
  public email$ = this.emailSubject.asObservable();

  public getTokenDetailFromCognito(code: string): Observable<any> {
    console.log(environment.sso_client_id, environment.sso_client_secret_pw);

    const params_in_body = {
      grant_type: 'authorization_code',
      code: code,
      scope: 'aws.cognito.signin.user.admin+openid+profile',
      redirect_uri: environment.redirectURL,
    };
    const body = Object.keys(params_in_body)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            (params_in_body as any)[key]
          )}`
      )
      .join('&');
    return this.http.post<any>(environment.cognitoTokenURL, body, {
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          btoa(
            `${environment.sso_client_id}:${environment.sso_client_secret_pw}`
          ),
      }),
    });
  }
  public getUserInfoFromCognito(access_token: string): Observable<any> {
    return this.http.get<any>(environment.userInfoURL, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${access_token}`,
      }),
    });
  }
  public logoutUserFromCognito(): Observable<any> {
    return this.http.get<any>(environment.logout);
  }

  setToken(token: string) {
    this.accessTokenSubject.next(token);
  }
  setEmail(email: string) {
    this.emailSubject.next(email);
  }
}
