import { RecipeState, initialRecipeState } from './recipe.state';
import { RecipesActions, RecipeActionTypes } from './recipe.actions';

export function recipeReducer(
  state: RecipeState = initialRecipeState,
  action: RecipesActions
) {
  switch (action.type) {
    case RecipeActionTypes.setRecipes:
      return {
        ...state,
        recipes: [...action.payload]
      };
    default:
      return state;
  }
}
