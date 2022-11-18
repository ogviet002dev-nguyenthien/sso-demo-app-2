import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CookieStorage,
} from 'amazon-cognito-identity-js';
import { StoreData } from 'src/app/model/store_data';
import { environment } from 'src/environments/environment';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = '';
  password: string = '';

  constructor(private router: Router, private storeService: StoreService) {}

  ngOnInit(): void {}

  // onSignIn(form: NgForm) {
  //   if (form.valid) {
  //     this.isLoading = true;
  //     let authenticationDetails = new AuthenticationDetails({
  //       Username: this.email_address,
  //       Password: this.password,
  //     });

  //     let poolData = {
  //       UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
  //       ClientId: environment.cognitoAppClientId, // Your client id here
  //     };

  //     let userPool = new CognitoUserPool(poolData);
  //     let userData = {
  //       Username: this.email_address,
  //       Pool: userPool,
  //     };
  //     var cognitoUser = new CognitoUser(userData);
  //     cognitoUser.authenticateUser(authenticationDetails, {
  //       onSuccess: (result) => {
  //         console.log('result of login', result);
  // store email address
  // this.storeService.storeEmail = this.email_address;
  // store user informations
  // const accessToken = result.getAccessToken().getJwtToken();
  // const idToken = result.getIdToken().getJwtToken();
  // const refreshToken = result.getRefreshToken().getToken();
  // console.log('access token ====>', accessToken);
  // console.log('id token ====>', idToken);
  // console.log('refresh token ====>', refreshToken);
  // store access token behavior
  // this.storeService.storeAccessToken = accessToken;
  // const tokens: StoreData = {
  //   email: this.email_address,
  //   access_token: accessToken,
  //   expire_time: 86400,
  //   refresh_token: refreshToken,
  //   id_token: idToken,
  // };
  // this.storeService.storeTokenData(tokens);
  // localStorage.setItem('email', this.email_address);
  //         this.router.navigate(['dashboard']);
  //       },

  //       onFailure: (err) => {
  //         alert(err.message || JSON.stringify(err));
  //         this.isLoading = false;
  //       },
  //     });
  //   } else {
  //     console.log('invalid');
  //   }
  // }
}
