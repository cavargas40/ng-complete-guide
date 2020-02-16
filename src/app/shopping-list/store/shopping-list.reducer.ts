import { Ingredient } from 'app/shared/ingredient.model';
import {
  ShoppingListActions,
  ShoppingListActionTypes
} from './shopping-list.actions';

export interface State {
  ingredients: Array<Ingredient>;
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState = {
  ingredients: [
    new Ingredient({ name: 'Apples', amount: 5 }),
    new Ingredient({ name: 'Tomatoes', amount: 10 })
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
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
    case ShoppingListActionTypes.UpdateIngredient:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredient[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActionTypes.DeleteIngredient:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex != state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActionTypes.StartEdit:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case ShoppingListActionTypes.StopEdit:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
