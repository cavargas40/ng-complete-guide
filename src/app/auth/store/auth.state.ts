import { User } from '../user.model';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};
