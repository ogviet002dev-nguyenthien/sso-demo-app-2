import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLogin!: boolean;
  detroy$ = new Subject<void>();
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authServices
      .isLoggedInOnServer()
      .pipe(takeUntil(this.detroy$))
      .subscribe((result) => {
        this.isLogin = result;
        if (!result) {
          window.location.assign(environment.loginURL);
        }
      });
  }
  navigateToDashboard() {
    this.router.navigate(['dashboard']);
  }
  navigateToLogin() {
    window.location.assign(environment.loginURL);
  }
  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
// this.access_token$ = this.activeRoute.queryParams.pipe(
//   map((param) => param?.code),
//   switchMap((code) => this.awsServices.getTokenDetailFromCognito(code)),
//   map((result) => result?.access_token),
//   tap((token) => (this.awsServices.setToken = token))
// );
// this.userInfor$ = this.awsServices.accessToken$.pipe(
//   switchMap((token) => this.awsServices.getUserInfoFromCognito(token))
// );
