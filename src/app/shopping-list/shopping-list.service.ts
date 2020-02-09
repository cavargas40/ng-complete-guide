import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public ingredientsChange = new EventEmitter<Array<Ingredient>>();

  private ingredients: Array<Ingredient> = [
    new Ingredient({ name: 'Apples', amount: 5 }),
    new Ingredient({ name: 'Tomatoes', amount: 10 })
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Array<Ingredient>) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.emit(this.ingredients.slice());
  }
}
