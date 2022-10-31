import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { StoreService } from '../auth/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  email: string = '';
  accessToken: string = '';
  constructor(
    @Inject('windowObject') private window: Window,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeService.email$.subscribe((data) => (this.email = data));
    this.storeService.accessToken$.subscribe(
      (data) => (this.accessToken = data)
    );
  }
  openApp2() {
    this.window.open(`http://localhost:4300?token=${this.email}`);
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId,
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    console.log('Cognito user:::::>', cognitoUser);
    // sign out on Amazon Cognito
    cognitoUser?.signOut();
    // sign out on server
    this.storeService.deleteStoreToken({
      email: this.email,
      access_token: this.accessToken,
    });
    this.router.navigate(['signin']);
  }
}
