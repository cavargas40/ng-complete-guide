import { Action } from '@ngrx/store';
import { Ingredient } from 'app/shared/ingredient.model';

export enum ShoppingListActionTypes {
  AddIngredient = '[SHOPPING-LIST] ADD_INGREDIENT',
  AddIngredients = '[SHOPPING-LIST] ADD_INGREDIENTS',
  UpdateIngredient = '[SHOPPING-LIST] UPDATE_INGREDIENT',
  DeleteIngredient = '[SHOPPING-LIST] DELETE_INGREDIENT',
  StartEdit = '[SHOPPING-LIST] START_EDIT',
  StopEdit = '[SHOPPING-LIST] STOP_EDIT'
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActionTypes.AddIngredient;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActionTypes.AddIngredients;

  constructor(public payload: Array<Ingredient>) {}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListActionTypes.UpdateIngredient;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListActionTypes.DeleteIngredient;
}

export class StartEdit implements Action {
  readonly type = ShoppingListActionTypes.StartEdit;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = ShoppingListActionTypes.StopEdit;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
