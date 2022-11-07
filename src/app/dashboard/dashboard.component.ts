import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AwsCognitoService } from '../auth/services/aws-cognito.service';
import { StoreService } from '../auth/store.service';
import { StoreData } from '../model/store_data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  email: string = '';
  accessToken: string = '';
  refreshToken: string = '';
  idToken: string = '';
  token$!: Observable<any>;
  userInfor$!: Observable<any>;
  constructor(
    private storeService: StoreService,
    private activeRoute: ActivatedRoute,
    private awsServices: AwsCognitoService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        map((params: Params) => params?.code),
        switchMap((code: string) => {
          return this.awsServices.getTokenDetailFromCognito(code);
        })
      )
      .subscribe((response) => {
        console.log('Response tokens from Cognito: ', response);
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.idToken = response.id_token;
        if (this.accessToken) {
          this.awsServices
            .getUserInfoFromCognito(this.accessToken)
            .subscribe((response) => {
              console.log('User informations from Cognito:::', response);
              this.email = response.email;
              const tokens: StoreData = {
                email: this.email,
                access_token: this.accessToken,
                expires_in: 86400,
                refresh_token: this.refreshToken,
                id_token: this.idToken,
              };
              this.storeService.storeTokenData(tokens);
            });
        }
      });
  }
  onLogout(): void {
    window.location.assign(environment.logout);
  }
}
