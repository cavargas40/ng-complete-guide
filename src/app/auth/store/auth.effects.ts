import { Actions, ofType, Effect, EffectsModule } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthActionTypes, LoginStart, Login, LoginFail } from './auth.action';

@Injectable()
export class AuthEffects {
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
          map(resData => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );

            return new Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate
            });
          }),
          catchError(errorRes => {
            let errorMessage = 'An unknown error ocurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new LoginFail(errorMessage));
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

            return of(new LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({
    dispatch: false
  })
  authSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
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
