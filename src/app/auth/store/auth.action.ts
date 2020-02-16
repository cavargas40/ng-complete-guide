import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[AUTH] LOGIN',
  Logout = '[AUTH] LOGOUT',
  LoginStart = '[AUTH] LOGIN_START',
  LoginFail = '[AUTH] LOGIN_FAIL'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LoginStart implements Action {
  readonly type = AuthActionTypes.LoginStart;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;

  constructor(public payload: string) {}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
