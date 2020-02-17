import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from '../recipe.service';
import { AppState } from 'app/store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Array<Recipe> = [];
  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    //this.subscription = this.recipeService.recipesChanged.subscribe(
    this.subscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Array<Recipe>) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
