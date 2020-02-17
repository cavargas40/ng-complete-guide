import { ActionReducerMap } from '@ngrx/store';

import { AuthState } from 'app/auth/store/auth.state';
import { authReducer } from 'app/auth/store/auth.reducer';
import { ShoppingListState } from 'app/shopping-list/store/shopping-list.state';
import { shoppingListReducer } from 'app/shopping-list/store/shopping-list.reducer';
import { RecipeState } from 'app/recipes/store/recipe.state';
import { recipeReducer } from 'app/recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipes: RecipeState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipeReducer
};
