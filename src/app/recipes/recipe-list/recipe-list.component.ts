import { Component, OnInit } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  public recipes: Array<Recipe> = [
    new Recipe({
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/16:9/w_1000,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'
    }),
  ];

  constructor() { }

  ngOnInit() {
  }

}
