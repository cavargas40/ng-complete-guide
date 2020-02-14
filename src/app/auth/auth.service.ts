import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private authUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private apiKey: string = "AIzaSyDxrXSQQYVLIO29y0OBM80AvFolibE5ZzQ";

  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(`${this.authUrl}?key=${this.apiKey}`, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(errorRes => {
          let errorMessage = "An unknown error ocurred!";
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists";
              break;
          }
          return throwError(errorMessage);
        })
      );
  }
}
