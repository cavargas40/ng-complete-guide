import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Array<Recipe> = [
    new Recipe({
      name: 'Tasty Schnitzel',
      description: 'A super-tasty Schnitzel - just awesome!',
      imagePath: 'https://img.taste.com.au/hNadnLUF/taste/2016/11/chicken-schnitzel-77551-1.jpeg',
      ingredients: [
        new Ingredient({ name: 'Chicken', amount: 1 }),
        new Ingredient({ name: 'French Fries', amount: 20 })
      ]
    }),
    new Recipe({
      name: 'Big Fat Burguer',
      description: 'What else you need to say?',
      imagePath: 'https://bk-emea-prd.s3.amazonaws.com/sites/burgerking.co.uk/files/Product_BB_SteakhouseAngus-UK-2_500x540px.png',
      ingredients: [
        new Ingredient({ name: 'Buns', amount: 2 }),
        new Ingredient({ name: 'Meat', amount: 1 })
      ]
    }),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>){
    this.shoppingListService.addIngredients(ingredients);
  }
}
