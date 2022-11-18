import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AwsCognitoService } from '../services/aws-cognito.service';

@Injectable({
  providedIn: 'root',
})
export class TokenResolver implements Resolve<any> {
  code?: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private awsServices: AwsCognitoService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.activeRoute.queryParams
      .pipe(map((params) => params?.code))
      .subscribe((code) => (this.code = code));

    if (!this.code) {
      return of(null);
    }
    return this.awsServices.getTokenDetailFromCognito(this.code).pipe(
      switchMap((response: any) => {
        console.log('Response tokens from Cognito: ', response);

        localStorage.setItem('token', response.access_token);

        if (response) {
          this.router.navigate(['dashboard']);
        }

        return of(response);
      }),
      catchError((error) => {
        return error;
      })
    );
  }
}
