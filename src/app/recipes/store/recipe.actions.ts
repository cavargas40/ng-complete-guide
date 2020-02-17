import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  setRecipes = '[RECIPES] SET_RECIPES',
  fetchRecipes = '[RECIPES] FETCH_RECIPES',
  addRecipe = '[RECIPES] ADD_RECIPE',
  updateRecipe = '[RECIPES] UPDATE_RECIPE',
  deleteRecipe = '[RECIPES] DELETE_RECIPE',
  storeRecipes = '[RECIPES] STORE_RECIPES'
}

export class SetRecipes implements Action {
  readonly type = RecipeActionTypes.setRecipes;

  constructor(public payload: Array<Recipe>) {}
}

export class FetchRecipes implements Action {
  readonly type = RecipeActionTypes.fetchRecipes;
}

export class AddRecipe implements Action {
  readonly type = RecipeActionTypes.addRecipe;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeActionTypes.updateRecipe;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeActionTypes.deleteRecipe;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = RecipeActionTypes.storeRecipes;
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
