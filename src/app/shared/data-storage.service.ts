import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';
import { AppState } from 'app/store/app.reducer';
import { SetRecipes } from 'app/recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private url: string =
    'https://ng-recipe-book-d3ca1.firebaseio.com/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(this.url, recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this.httpClient.get<Array<Recipe>>(this.url).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        //this.recipeService.setRecipes(recipes);
        this.store.dispatch(new SetRecipes(recipes));
      })
    );
  }
}
