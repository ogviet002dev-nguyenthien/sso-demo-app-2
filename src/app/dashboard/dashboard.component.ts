import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, Observable, pipe, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AwsCognitoService } from '../auth/services/aws-cognito.service';
import { StoreService } from '../auth/store.service';
import { StoreData } from '../model/store_data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  email!: string;
  accessToken!: string;
  refreshToken!: string;
  idToken!: string;
  expire_time!: number;
  token$: Observable<string> = this.awsServices.accessToken$;
  email$: Observable<string> = this.awsServices.email$;
  detroy$ = new Subject<void>();
  constructor(
    private storeService: StoreService,
    private activeRoute: ActivatedRoute,
    private awsServices: AwsCognitoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token')!;
    this.email = localStorage.getItem('email')!;

    this.activeRoute.queryParams
      .pipe(
        map((params: Params) => params?.code),
        filter((code) => code),
        switchMap((code: string) => {
          return this.awsServices.getTokenDetailFromCognito(code);
        }),
        takeUntil(this.detroy$)
      )
      .subscribe((response) => {
        console.log('Response tokens from Cognito: ', response);
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.idToken = response.id_token;
        this.expire_time = response.expires_in;
        this.awsServices.setToken(this.accessToken);
        // store token to local
        localStorage.setItem('access_token', this.accessToken);

        if (this.accessToken) {
          this.awsServices
            .getUserInfoFromCognito(this.accessToken)
            .pipe(takeUntil(this.detroy$))
            .subscribe((response) => {
              console.log('User informations from Cognito:::', response);
              this.email = response.email;
              this.awsServices.setEmail(this.email);
              // store email to local
              localStorage.setItem('email', this.email);
              const tokens: StoreData = {
                email: this.email,
                access_token: this.accessToken,
                expire_time: this.expire_time,
                refresh_token: this.refreshToken,
                id_token: this.idToken,
                subscriber: response.sub,
              };
              this.storeService.storeTokenData(tokens);
            });
        }
      });
  }
  goHome() {
    this.router.navigate(['home']);
  }
  onLogout(): void {
    if (this.accessToken && this.email) {
      this.storeService
        .signOut({ email: this.email, access_token: this.accessToken })
        .pipe(takeUntil(this.detroy$))
        .subscribe(
          (result) => {
            console.log('logout response::', result);
            if (result.success) {
              localStorage.clear();
              window.location.assign(environment.logout); // logout on cognito
            }
          },
          (error) => {
            console.log(error);

            if (error.error.message === 'Access Token has been revoked') {
              window.location.assign(environment.loginURL);
            }
          }
        );
    } else {
      combineLatest([this.awsServices.email$, this.awsServices.accessToken$])
        .pipe(
          map(([email, access_token]) => ({
            email,
            access_token,
          })),
          switchMap((data) => {
            return this.storeService.signOut(data); // logout on server first
          }),
          takeUntil(this.detroy$)
        )
        .subscribe(
          (result) => {
            console.log('logout response::', result);
            if (result.success) {
              localStorage.clear();
              window.location.assign(environment.logout); // logout on cognito
            }
          },
          (error) => {
            console.log(error);

            if (error.error.message === 'Access Token has been revoked') {
              window.location.assign(environment.loginURL);
            }
          }
        );
    }
  }
  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
