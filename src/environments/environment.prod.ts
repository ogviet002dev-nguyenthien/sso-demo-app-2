export const environment = {
  production: true,
  apiUrl: 'https://sandbox-app2-be.sakuramobile.jp',
  cognitoUserPoolId: 'ap-northeast-1_XBz0pkKY2',
  cognitoAppClientId: '5fab9a43joj1sl9m9lvbugblme',

  sso_client_id: '4lutbcibf2go2s27tr82ssvdgd', // App clientID of Demo App2
  sso_client_secret_pw: '1q329ognqh9idohd1074ujcn8tiefn0dmnvusj7v19ahbe1suv3d', // Demo App2 clientSecret

  loginURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/login?client_id=4lutbcibf2go2s27tr82ssvdgd&response_type=code&scope=openid+profile&redirect_uri=https%3A%2F%2Fsandbox-app2-fe.sakuramobile.jp%2Fdashboard',

  redirectURL: 'https://sandbox-app2-fe.sakuramobile.jp/dashboard',

  cognitoTokenURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/token',
  userInfoURL:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/oauth2/userInfo',
  logout:
    'https://testing-login.auth.ap-northeast-1.amazoncognito.com/logout?' +
    'client_id=4lutbcibf2go2s27tr82ssvdgd&' +
    'logout_uri=https://sandbox-app2-fe.sakuramobile.jp/home',
};
