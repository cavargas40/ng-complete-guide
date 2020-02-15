import { Action } from '@ngrx/store';
import { Ingredient } from 'app/shared/ingredient.model';

export enum ShoppingListActionTypes {
  AddIngredient = '[SHOPPING-LIST] ADD_INGREDIENT',
  AddIngredients = '[SHOPPING-LIST] ADD_INGREDIENTS'
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActionTypes.AddIngredient;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActionTypes.AddIngredients;

  constructor(public payload: Array<Ingredient>) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients;
