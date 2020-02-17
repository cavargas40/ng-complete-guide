import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { AppState } from 'app/store/app.reducer';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public id: number;
  public editMode: boolean = false;
  public recipeForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initForm() {
    let myRecipe = new Recipe({
      name: '',
      imagePath: '',
      description: '',
      ingredients: []
    });
    let ingredients = new FormArray([]);

    if (this.editMode) {
      this.subscription = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(recipe => {
          myRecipe.name = recipe.name;
          myRecipe.description = recipe.description;
          myRecipe.imagePath = recipe.imagePath;
          if (recipe.ingredients) {
            for (let ingredient of recipe.ingredients) {
              ingredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(myRecipe.name, Validators.required),
      imagePath: new FormControl(myRecipe.imagePath, Validators.required),
      description: new FormControl(myRecipe.description, Validators.required),
      ingredients: ingredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value })
      );
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    //(<FormArray>this.recipeForm.get('ingredients')).clear(); // if you want to remove all the item (only works in Angular 8+)
  }
}
