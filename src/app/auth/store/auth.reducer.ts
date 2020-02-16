import { initialAuthState, AuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.action';
import { User } from '../user.model';

export function authReducer(
  state: AuthState = initialAuthState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionTypes.Login:
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
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActionTypes.LoginFail:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
