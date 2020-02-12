import { Injectable } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public ingredientsChange = new Subject<Array<Ingredient>>();
  public startedEditing = new Subject<number>();

  private ingredients: Array<Ingredient> = [
    new Ingredient({ name: 'Apples', amount: 5 }),
    new Ingredient({ name: 'Tomatoes', amount: 10 })
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.refreshIngredients();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.refreshIngredients();
  }
  
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.refreshIngredients();
  }
  
  addIngredients(ingredients: Array<Ingredient>) {
    this.ingredients.push(...ingredients);
    this.refreshIngredients();
  }

  private refreshIngredients() {
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
