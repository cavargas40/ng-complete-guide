import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeId: number;
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    //const id = this.activatedRouter.snapshot.params['id'];
    this.activatedRouter.params
      .subscribe((params: Params) => {
        this.recipeId = +params['id']
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
