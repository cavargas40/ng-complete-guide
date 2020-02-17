import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import {
  AuthActionTypes,
  LoginStart,
  AuthenticateSuccess,
  AuthenticateFail,
  SignupStart
} from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActionTypes.SignUpStart),
    switchMap((signupAction: SignupStart) => {
      return this.httpClient
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData =>
            handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            )
          ),
          catchError(errorRes => handleError(errorRes))
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActionTypes.LoginStart),
    switchMap((authData: LoginStart) => {
      return this.httpClient
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData =>
            handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            )
          ),
          catchError(errorRes => handleError(errorRes))
        );
    })
  );

  @Effect({
    dispatch: false
  })
  authRedirect = this.actions$.pipe(
    ofType(AuthActionTypes.AuthenticateSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActionTypes.AutoLogin),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpiration).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);

        return new AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }

      return { type: 'DUMMY' };
    })
  );

  @Effect({
    dispatch: false
  })
  authLogout = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error ocurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exists';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
      break;
  }

  return of(new AuthenticateFail(errorMessage));
};
