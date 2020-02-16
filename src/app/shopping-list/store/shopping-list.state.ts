import { Ingredient } from 'app/shared/ingredient.model';

export interface ShoppingListState {
  ingredients: Array<Ingredient>;
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export const initialShoppingListState: ShoppingListState = {
  ingredients: [
    new Ingredient({ name: 'Apples', amount: 5 }),
    new Ingredient({ name: 'Tomatoes', amount: 10 })
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};
