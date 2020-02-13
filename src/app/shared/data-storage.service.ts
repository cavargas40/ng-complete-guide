import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipe.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  private url: string = "https://ng-recipe-book-d3ca1.firebaseio.com";

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(`${this.url}/recipes.json`, recipes)
      .subscribe(response => console.log(response));
  }
}
