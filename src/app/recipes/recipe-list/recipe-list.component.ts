import { Component, OnInit } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Array<Recipe> = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe((recipes: Array<Recipe>) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

}
