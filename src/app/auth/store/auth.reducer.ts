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
        user
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
