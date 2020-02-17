import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { AppState } from 'app/store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { DeleteRecipe } from '../store/recipe.actions';
import { AddIngredients } from 'app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.activatedRouter.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.recipeId = id;
          return this.store.select('recipes');
        }),
        map(recipesState =>
          recipesState.recipes.find((recipe, index) => index === this.recipeId)
        )
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients))
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes']);
  }
}
