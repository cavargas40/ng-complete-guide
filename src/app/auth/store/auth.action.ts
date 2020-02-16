import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[AUTH] LOGIN',
  Logout = '[AUTH] LOGOUT'
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

export type AuthActions = Login | Logout;
