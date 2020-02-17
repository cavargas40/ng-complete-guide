import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AuthenticateSuccess = '[AUTH] AUTHENTICATE_SUCCESS',
  Logout = '[AUTH] LOGOUT',
  LoginStart = '[AUTH] LOGIN_START',
  AuthenticateFail = '[AUTH] AUTHENTICATE_FAIL',
  SignUpStart = '[AUTH] SIGNUP_START',
  ClearError = '[AUTH] CLEAR_ERROR',
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AuthenticateSuccess;

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

export class AuthenticateFail implements Action {
  readonly type = AuthActionTypes.AuthenticateFail;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = AuthActionTypes.SignUpStart;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = AuthActionTypes.ClearError;
}


export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError;
