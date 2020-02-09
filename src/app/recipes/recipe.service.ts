import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Array<Recipe> = [
    new Recipe({
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/16:9/w_1000,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'
    }),
    new Recipe({
      name: 'Another Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/16:9/w_1000,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'
    }),
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
