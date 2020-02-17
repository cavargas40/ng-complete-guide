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
    case RecipeActionTypes.addRecipe:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActionTypes.updateRecipe:
      const updateRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };

      const updateRecipes = [...state.recipes];
      updateRecipes[action.payload.index] = updateRecipe;

      return {
        ...state,
        recipes: updateRecipes
      };
    case RecipeActionTypes.deleteRecipe:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
