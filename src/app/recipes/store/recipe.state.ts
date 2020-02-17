import { Recipe } from '../recipe.model';

export interface RecipeState {
  recipes: Array<Recipe>;
}

export const initialRecipeState: RecipeState = {
  recipes: []
};
