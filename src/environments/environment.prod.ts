export const environment = {
  production: true,
  apiUrl: 'https://sandbox-app1-be.sakuramobile.jp',
  cognitoUserPoolId: 'ap-northeast-1_XBz0pkKY2',
  cognitoAppClientId: '5fab9a43joj1sl9m9lvbugblme',
  ///
  sso_client_id: '33add8eps5jiu29cu764dae0bs', // App clientID of Demo App1
  sso_client_secret_pw: 'ei0iqbl1e2gqacs6ujhqh9s4u708uinfq2agphlp9mbtp5n016u', // Demo App1 clientSecret

  loginURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?client_id=33add8eps5jiu29cu764dae0bs&response_type=code&scope=openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdashboard',

  redirectURL: 'http://localhost:4200/dashboard',

  cognitoTokenURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/token',

  userInfoURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/userInfo',

  logout:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/logout?' +
    'client_id=33add8eps5jiu29cu764dae0bs&' +
    'logout_uri=http://localhost:4200/home',
};
