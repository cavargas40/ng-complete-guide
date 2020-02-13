import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  public id: number;
  public editMode: boolean = false;
  public recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  private initForm() {
    let myRecipe = new Recipe({ name: '', imagePath: '', description: '', ingredients: [] });
    let ingredients = new FormArray([]);

    if (this.editMode) {
      myRecipe = this.recipeService.getRecipe(this.id);
      if (myRecipe.ingredients) {
        for (let ingredient of myRecipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            }),
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(myRecipe.name, Validators.required),
      'imagePath': new FormControl(myRecipe.imagePath, Validators.required),
      'description': new FormControl(myRecipe.description, Validators.required),
      'ingredients': ingredients,
    })

  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

}
