import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipe.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  private url: string =
    "https://ng-recipe-book-d3ca1.firebaseio.com/recipes.json";

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(this.url, recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    this.httpClient
      .get<Array<Recipe>>(this.url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      )
      .subscribe(recipes => this.recipeService.setRecipes(recipes));
  }
}
