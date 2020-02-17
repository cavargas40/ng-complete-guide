import { initialAuthState, AuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '../user.model';

export function authReducer(
  state: AuthState = initialAuthState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionTypes.AuthenticateSuccess:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        user: null
      };
    case AuthActionTypes.LoginStart:
    case AuthActionTypes.SignUpStart:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActionTypes.AuthenticateFail:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActionTypes.ClearError:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
