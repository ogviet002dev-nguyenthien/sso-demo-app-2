// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://sandbox-app2-be.sakuramobile.jp',

  sso_client_id: '4lutbcibf2go2s27tr82ssvdgd', // App clientID of Demo App2
  sso_client_secret_pw: '1q329ognqh9idohd1074ujcn8tiefn0dmnvusj7v19ahbe1suv3d', // Demo App2 clientSecret

  loginURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=4lutbcibf2go2s27tr82ssvdgd&response_type=code&scope=aws.cognito.signin.user.admin+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A4300%2Fdashboard',

  redirectURL: 'http://localhost:4300/dashboard',

  cognitoTokenURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/token',

  userInfoURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/userInfo',

  logout:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/logout?' +
    'client_id=4lutbcibf2go2s27tr82ssvdgd&' +
    'logout_uri=http://localhost:4300/home',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
