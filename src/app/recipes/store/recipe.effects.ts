import { Actions, Effect, ofType } from '@ngrx/effects';
import { RecipeActionTypes, SetRecipes } from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  private url: string =
    'https://ng-recipe-book-d3ca1.firebaseio.com/recipes.json';

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActionTypes.fetchRecipes),
    switchMap(() => {
      return this.httpClient.get<Array<Recipe>>(this.url);
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new SetRecipes(recipes);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
