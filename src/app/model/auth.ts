export interface Auth {
  success: boolean;
  login: boolean;
  expire_time: string;
  user_info: {
    sub: string;
    email_verified: boolean;
    phone_number_verified: boolean;
    phone_number: string;
    email: string;
  };
}
