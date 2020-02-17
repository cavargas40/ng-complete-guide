import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  setRecipes = '[RECIPES] SET RECIPES'
}

export class SetRecipes implements Action {
  readonly type = RecipeActionTypes.setRecipes;

  constructor(public payload: Array<Recipe>) {}
}

export type RecipesActions = SetRecipes;
