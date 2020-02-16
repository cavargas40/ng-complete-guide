import { ActionReducerMap } from '@ngrx/store';

import { AuthState } from 'app/auth/store/auth.state';
import { ShoppingListState } from 'app/shopping-list/store/shopping-list.state';
import { shoppingListReducer } from 'app/shopping-list/store/shopping-list.reducer';
import { authReducer } from 'app/auth/store/auth.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
