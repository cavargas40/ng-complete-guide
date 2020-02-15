import { Ingredient } from 'app/shared/ingredient.model';
import {
  ShoppingListActions,
  ShoppingListActionTypes
} from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient({ name: 'Apples', amount: 5 }),
    new Ingredient({ name: 'Tomatoes', amount: 10 })
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActionTypes.AddIngredient:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActionTypes.AddIngredients:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}
